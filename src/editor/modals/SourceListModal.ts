import { Modal } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { AddSourceModal } from "./AddSourceModal";
import { Person } from "../../Person";
import { TemplateResult, html, render } from "lit";

export class SourceListModal extends Modal {
  private plugin: Sourcerer;
  private addSourceModal: AddSourceModal;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.addSourceModal = new AddSourceModal(plugin);
    this.setTitle("Sources");
  }

  onOpen() {
    render(
      html` <x-source-list
        .sources=${this.plugin.sourceManager.sources}
        @add-source=${() => this.addSourceModal.open()}
      ></x-source-list>`,
      this.contentEl
    );
  }
}
