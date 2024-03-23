import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { Person } from "../../Person";
import { Source } from "../../Source";
import { html, render } from "lit";

export class AddSourceModal extends Modal {
  private plugin: Sourcerer;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.setTitle("Add source");
    this.plugin = plugin;
  }

  onOpen() {
    render(
      html`
        <x-edit-source-form
          .defaultSource=${new Source()}
          @add-source=${(d: CustomEvent) => this.addSource(d.detail)}
          @cancel=${() => this.close()}
        ></x-edit-source-form>
      `,
      this.contentEl
    );
  }

  addSource(source: Source) {
    console.log(source);
    this.plugin.sourceManager.addSource(source);
    this.close();
  }
}
