import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { Source } from "../../Source";
import Dialog from "../Components/Dialog.svelte";

export class DeleteSourceModal extends Modal {
  private plugin: Sourcerer;
  private source?: Source;
  private closeCallback?: () => void;
  private component?: Dialog;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.setTitle("Delete source");
  }

  open(source?: Source, closeCallback?: () => void): void {
    this.source = source ?? new Source();
    this.closeCallback = closeCallback;
    super.open();
  }

  onOpen() {
    this.component = new Dialog({
      target: this.contentEl,
      props: {
        message: `Are you sure you want to delete the source "${this.source?.name}"?`,
        confirm: "Delete",
        deny: "Cancel",
        preferred: "deny",
        onConfirm: () => this.deleteSource(this.source!),
        onDeny: () => this.close(),
      },
    });
  }

  deleteSource(source: Source) {
    this.plugin.sourceManager.deleteSourceFile(source.name);
    this.close();
  }

  onClose(): void {
    this.contentEl.empty();
    this.source = undefined;

    this.closeCallback?.();
  }
}
