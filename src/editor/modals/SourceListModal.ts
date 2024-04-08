import { Modal } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { EditSourceModal } from "./EditSourceModal";
import SourceList from "../components/SourceList.svelte";
import { Source } from "../../types/Source";
import { DeleteSourceModal } from "./DeleteSourceModal";
import { ImportDOIModal } from "./ImportDOIModal";

export class SourceListModal extends Modal {
  private plugin: Sourcerer;
  private editSourceModal: EditSourceModal;
  private importDOIModal: ImportDOIModal;
  private deleteSourceModal: DeleteSourceModal;
  private component?: SourceList;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.editSourceModal = new EditSourceModal(plugin);
    this.importDOIModal = new ImportDOIModal(plugin);
    this.deleteSourceModal = new DeleteSourceModal(plugin);
    this.setTitle("Sources");
  }

  onOpen() {
    this.component?.$destroy();
    this.component = new SourceList({
      target: this.contentEl,
      props: {
        onAddSource: () => this.editSourceModal.open(),
        onImportSource: () => this.importDOIModal.open(),
        onEditSource: (source: Source) => this.editSourceModal.open(source),
        onDeleteSource: (source: Source) => this.deleteSourceModal.open(source),
      },
    });
  }

  onClose(): void {
    this.component?.$destroy();
  }
}
