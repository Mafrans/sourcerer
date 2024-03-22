import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "./Sourcerer";

export class SourceListModal extends Modal {
  private plugin: Sourcerer;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.setText("Sources");

    // List of sources
    const sources = this.plugin.sourceManager.sources;

    const sourceList = contentEl.createEl("ul");
    for (const source of sources) {
      const sourceItem = sourceList.createEl("li");
      sourceItem.textContent = `${source.name}: ${JSON.stringify(
        source.fields
      )}`;
    }

    // Add source button
    const addSourceButton = contentEl.createEl("button");
    addSourceButton.textContent = "Add source";
    addSourceButton.addEventListener("click", () => this.onAddSource());
  }

  onAddSource() {
    throw new Error("Not implemented");
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
