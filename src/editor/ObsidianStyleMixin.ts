import { LitElement } from "lit";

type Constructor<T = {}> = new (...args: any[]) => T;

export const ObsidianStyleMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class ObsidianStyleMixinClass extends superClass {
    connectedCallback() {
      super.connectedCallback();
      this.addObsidianStyles();
      this.setHostIsBlock();
    }

    private setHostIsBlock() {
      const style = new CSSStyleSheet();
      style.replaceSync(`:host { display: block; }`);
      this.shadowRoot?.adoptedStyleSheets.unshift(style);
    }

    private async addObsidianStyles() {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "app://obsidian.md/app.css";

      this.shadowRoot?.appendChild(link);
    }
  }

  return ObsidianStyleMixinClass as T;
};
