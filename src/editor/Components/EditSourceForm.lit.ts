import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit-html/directives/map.js";
import { Person } from "../../Person";
import { ObsidianStyleMixin } from "../ObsidianStyleMixin";
import { Source } from "../../Source";

@customElement("x-edit-source-form")
export class EditSourceForm extends ObsidianStyleMixin(LitElement) {
  @property({ type: String })
  defaultTitle: string = "";

  @property({ type: Array })
  defaultAuthors: Person[] = [];

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
    const cancelEvent = new CustomEvent("cancel", {
      bubbles: true,
      composed: true,
    });

    return html`
      <form method="dialog" class="edit-source-form">
        <label>
          <span>Title</span>
          <input type="text" placeholder="Title" name="title" />
        </label>

        <x-author-input-list
          .defaultAuthors=${this.defaultAuthors}
        ></x-author-input-list>

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
}
