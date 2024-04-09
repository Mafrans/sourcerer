import { Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { importCrossRef } from "../../importers/importCrossRef";
import { saveSource } from "../../types/Source";
import { sources } from "../../store/sources";
import ImportBibTexForm from "../components/ImportBibTexForm.svelte";
import { importBibTex } from "../../importers/importBibTex";

export class ImportBibTexModal extends Modal {
  private plugin: Sourcerer;
  private component?: ImportBibTexForm;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.modalEl.style.maxWidth = "30em";
    this.setTitle("Import BibTex citation");
  }

  onOpen() {
    this.component?.$destroy();
    this.component = new ImportBibTexForm({
      target: this.contentEl,
      props: {
        onImport: (bibtex: string) => this.handleImport(bibtex),
        onClose: () => this.close(),
      },
    });
  }

  onClose(): void {
    this.component?.$destroy();
  }

  async handleImport(bibtex: string) {
    const newSources = importBibTex(bibtex);
    if (newSources == null) {
      new Notice("Failed to import source");
      return;
    }

    sources.update((sources) => [...sources, ...newSources]);
    for (const source of newSources) {
      saveSource(this.plugin.app, this.plugin.settings, source);
    }
    this.close();
  }
}
