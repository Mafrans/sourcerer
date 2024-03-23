import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit-html/directives/map.js";
import { Person } from "../../Person";
import { ObsidianStyleMixin } from "../ObsidianStyleMixin";
import { Source } from "../../Source";

@customElement("x-edit-source-form")
export class EditSourceForm extends ObsidianStyleMixin(LitElement) {
  @property({ type: Object })
  defaultSource: Source | undefined;

  public static styles = css`
    .edit-source-form > * {
      padding: var(--size-4-4) 0;
      border-bottom: var(--border-width) solid var(--color-base-30);
    }

    .edit-source-form > *:last-child {
      border-bottom: none;
    }

    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--size-4-3);
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: var(--size-4-2);
      margin-top: var(--size-4-2);
    }

    button.submit {
      background-color: var(--color-accent);
      color: var(--text-on-accent);
    }
  `;

  render() {
    const title = this.defaultSource?.fields.title ?? "";
    let authors = this.defaultSource?.fields.author ?? [new Person()];

    const cancelEvent = new CustomEvent("cancel", {
      bubbles: true,
      composed: true,
    });

    return html`
      <form @submit=${this.onSubmit} method="dialog" class="edit-source-form">
        <label>
          <span>Title</span>
          <input
            type="text"
            placeholder="Title"
            .defaultValue=${title}
            name="title"
          />
        </label>

        <x-author-input-list .authors=${authors}></x-author-input-list>

        <div class="buttons">
          <button
            type="button"
            @click=${() => this.dispatchEvent(cancelEvent)}
            class="cancel"
          >
            Cancel
          </button>
          <button type="submit" class="submit preferred">Submit</button>
        </div>
      </form>
    `;
  }

  onSubmit(event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement);
    console.log(data);
    const title = data.get("title") as string;
    const authorFirstNames = data.getAll("author-firstName") as string[];
    const authorLastNames = data.getAll("author-lastName") as string[];
    const author: Person[] = authorFirstNames.map(
      (_, index) => new Person(authorFirstNames[index], authorLastNames[index])
    );

    const source = new Source({ title, author });
    this.dispatchEvent(
      new CustomEvent("add-source", {
        detail: source,
        bubbles: true,
        composed: true,
      })
    );
  }
}
