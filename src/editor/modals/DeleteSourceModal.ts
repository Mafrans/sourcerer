import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { Source, getSourceFile, newSource } from "../../types/Source";
import Dialog from "../components/Dialog.svelte";
import assert from "assert";

export class DeleteSourceModal extends Modal {
  private plugin: Sourcerer;
  private source?: Source;
  private component?: Dialog;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.modalEl.style.maxWidth = "30em";
    this.setTitle("Delete source");
  }

  open(source?: Source): void {
    assert(source != null, "Source must be provided");

    this.source = source;
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
    const {
      app: { vault },
      settings,
    } = this.plugin;

    const file = getSourceFile(vault, settings, source);
    if (file != null) {
      vault.delete(file);
    }
    this.close();
  }

  onClose(): void {
    this.contentEl.empty();
    this.source = undefined;
  }
}
