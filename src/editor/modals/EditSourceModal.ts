import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { Source, emptySource, newSource, saveSource } from "../../types/Source";
import EditSourceForm from "../components/EditSourceForm.svelte";
import assert from "assert";

export class EditSourceModal extends Modal {
  private plugin: Sourcerer;
  private source?: Source;
  private component?: EditSourceForm;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.setTitle("Edit source");
  }

  open(source?: Source): void {
    this.source = source ?? emptySource();
    super.open();
  }

  onOpen() {
    this.component = new EditSourceForm({
      target: this.contentEl,
      props: {
        source: this.source!,
        onSubmit: (source: Source) => this.saveSource(source),
        onCancel: () => this.close(),
      },
    });
  }

  async saveSource(source: Source) {
    const { app, settings } = this.plugin;

    saveSource(app, settings, source);
    this.close();
  }

  onClose(): void {
    this.component?.$destroy();
  }
}
