import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { Source } from "../../Source";
import EditSourceForm from "../Components/EditSourceForm.svelte";

export class EditSourceModal extends Modal {
  private plugin: Sourcerer;
  private source?: Source;
  private component?: EditSourceForm;
  private closeCallback?: () => void;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.setTitle("Edit source");
  }

  open(source?: Source, closeCallback?: () => void): void {
    this.source = source ?? new Source();
    this.closeCallback = closeCallback;
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
    await this.plugin.sourceManager.saveSource(source);
    this.close();
  }

  onClose(): void {
    this.component?.$destroy();

    this.closeCallback?.();
  }
}
