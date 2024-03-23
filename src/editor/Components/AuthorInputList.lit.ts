import { LitElement, html, css } from "lit-element";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../../Person";
import { ObsidianStyleMixin } from "../ObsidianStyleMixin";
import { map } from "lit/directives/map.js";

@customElement("x-author-input-list")
export class AuthorInputList extends ObsidianStyleMixin(LitElement) {
  @property({ type: Array })
  defaultAuthors: Person[] = [];

  static styles = css`
    ul {
      display: flex;
      flex-direction: column;
      gap: var(--size-4-2);
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .title {
      font-weight: bold;
      margin-bottom: var(--size-4-2);
      font-size: var(--font-ui-medium);
    }

    button {
      display: flex;
      justify-content: flex-end;
      gap: var(--size-4-2);
      margin-top: var(--size-4-2);
    }
  `;

  render() {
    return html`
      <div class="authors">
        <div class="title">Authors</div>
        <ul>
          ${map(
            this.defaultAuthors,
            (author, i) =>
              html`<x-author-input-list-entry
                .defaultAuthor=${author}
                @delete=${() => this.deleteAuthor(i)}
              ></x-author-input-list-entry>`
          )}
        </ul>
        <button @click=${() => this.addAuthor()} class="author-add">
          Add author
        </button>
      </div>
    `;
  }

  addAuthor() {
    this.defaultAuthors = [...this.defaultAuthors, new Person()];
  }

  deleteAuthor(index: number) {
    this.defaultAuthors = this.defaultAuthors.filter((_, i) => i !== index);
  }
}
