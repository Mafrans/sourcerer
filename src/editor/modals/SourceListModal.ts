import { Modal } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { AddSourceModal } from "./AddSourceModal";
import { Person } from "../../Person";

export class SourceListModal extends Modal {
  private plugin: Sourcerer;
  private addSourceModal: AddSourceModal;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.addSourceModal = new AddSourceModal(plugin);
    this.addSourceModal.onAddSource = () => this.regenerateSourceList();
    this.setTitle("Sources");
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.innerHTML = `
      <ul class="source-list"></ul>
      <button>Add source</button>
    `;

    this.regenerateSourceList();

    const addSourceButton = contentEl.querySelector("button")!;
    addSourceButton.addEventListener("click", () => this.addSourceModal.open());
  }

  regenerateSourceList() {
    const sourceList = this.contentEl.querySelector(".source-list");
    if (!sourceList) return;

    sourceList.empty();
    for (const source of this.plugin.sourceManager.sources) {
      const { title, author } = source.fields;
      const sourceItem = sourceList.createEl("li");
      sourceItem.innerHTML = `
        <div class="source-title">${title}</div>
        <div class="source-author">${
          author?.map(Person.fromObject)?.join(", ") || "No authors"
        }</div>
      `;
    }
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
