import { Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import ImportDoiForm from "../components/ImportDoiForm.svelte";
import { importCrossRef } from "../../importers/importCrossRef";
import { saveSource } from "../../types/Source";
import { sources } from "../../store/sources";

export class ImportDOIModal extends Modal {
  private plugin: Sourcerer;
  private component?: ImportDoiForm;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.modalEl.style.maxWidth = "20em";
    this.setTitle("Import from DOI");
  }

  onOpen() {
    this.component?.$destroy();
    this.component = new ImportDoiForm({
      target: this.contentEl,
      props: {
        onImport: (doi: string) => this.handleImport(doi),
        onClose: () => this.close(),
      },
    });
  }

  onClose(): void {
    this.component?.$destroy();
  }

  async handleImport(doi: string) {
    const source = await importCrossRef(doi);
    if (source == null) {
      new Notice("Failed to import source");
      return;
    }

    sources.update((sources) => [...sources, source]);
    saveSource(this.plugin.app, this.plugin.settings, source);
    this.close();
  }
}
