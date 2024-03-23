import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("x-mini-button")
export class MiniButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      cursor: var(--cursor);
      font-size: 24px;
      line-height: 20px;
      height: 24px;
      width: 24px;
      padding: 0 var(--size-2-2);
      border-radius: var(--radius-s);
      color: var(--text-muted);
    }

    :host:hover {
      background-color: var(--background-modifier-hover);
      color: var(--text-normal);
    }

    :host > * {
      font-family: Inter, sans-serif;
      font-weight: 300;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
