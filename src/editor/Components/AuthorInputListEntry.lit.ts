import { LitElement, html, css } from "lit-element";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../../Person";
import { ObsidianStyleMixin } from "../ObsidianStyleMixin";

@customElement("x-author-input-list-entry")
export class AuthorInputListEntry extends ObsidianStyleMixin(LitElement) {
  @property({ type: Object })
  defaultAuthor: Person = new Person();

  static styles = css`
    li {
      display: flex;
      justify-content: space-between;
    }

    .author-content {
      display: flex;
      gap: var(--size-4-3);
    }

    input {
      flex: 1;
    }
  `;

  render() {
    const deleteEvent = new CustomEvent("delete", {
      bubbles: true,
      composed: true,
    });

    return html`
      <li>
        <div class="author-content">
          <input
            autofocus
            type="text"
            placeholder="First name"
            name="author-firstName"
            .defaultValue=${this.defaultAuthor?.firstName ?? ""}
          />
          <input
            type="text"
            placeholder="Last name"
            name="author-lastName"
            .defaultValue=${this.defaultAuthor?.lastName ?? ""}
          />
        </div>
        <x-mini-button @click=${() => this.dispatchEvent(deleteEvent)}
          >&times;</x-mini-button
        >
      </li>
    `;
  }
}
