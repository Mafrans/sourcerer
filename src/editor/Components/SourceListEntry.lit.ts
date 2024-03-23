import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Source } from "../../Source";

@customElement("x-source-list-entry")
export class SourceListEntry extends LitElement {
  @property({ type: Object })
  source: Source | undefined;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: var(--size-4-2) 0;
      gap: var(--size-2-2);
    }

    .title {
      font-size: var(--font-ui-medium);
      font-weight: bold;
    }

    .authors {
      font-size: var(--font-ui-smaller);
      color: var(--color-base-50);
    }
  `;

  render() {
    const title = this.source?.fields.title || "No title";
    const authors = this.source?.fields.author;
    return html`
      <div class="title">${title}</div>
      <div class="authors">${authors?.join(", ") || "No author"}</div>
    `;
  }
}
