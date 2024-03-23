import { LitElement, css, html } from "lit";
import { ObsidianStyleMixin } from "../ObsidianStyleMixin";
import { customElement, property } from "lit/decorators.js";
import { Source } from "../../Source";

@customElement("x-source-list")
export class SourceList extends ObsidianStyleMixin(LitElement) {
  @property({ type: Array })
  public sources: Source[] = [];

  public static styles = css`
    ul {
      display: flex;
      flex-direction: column;
      gap: var(--size-4-2);
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li:not(:last-child) {
      border-bottom: var(--border-width) solid var(--color-base-30);
    }
  `;

  render() {
    const addSourceEvent = new CustomEvent("add-source", {
      bubbles: true,
      composed: true,
    });

    return html`
      <div>
        <ul>
          ${this.sources.map(
            (source) => html`
              <li>
                <x-source-list-entry .source=${source}></x-source-list-entry>
              </li>
            `
          )}
        </ul>

        <div class="buttons">
          <button
            @click=${() => this.dispatchEvent(addSourceEvent)}
            class="source-add"
          >
            Add source
          </button>
        </div>
      </div>
    `;
  }
}
