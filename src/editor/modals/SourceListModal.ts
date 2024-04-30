import { Modal } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { EditSourceModal } from "./EditSourceModal";
import SourceList from "../components/SourceList.svelte";
import { Source } from "../../types/Source";
import { DeleteSourceModal } from "./DeleteSourceModal";
import { ImportDOIModal } from "./ImportDOIModal";
import { ImportBibTexModal } from "./ImportBibTexModal";

export class SourceListModal extends Modal {
  private plugin: Sourcerer;
  private editSourceModal: EditSourceModal;
  private importDOIModal: ImportDOIModal;
  private importBibTexModal: ImportBibTexModal;
  private deleteSourceModal: DeleteSourceModal;
  private component?: SourceList;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.editSourceModal = new EditSourceModal(plugin);
    this.importDOIModal = new ImportDOIModal(plugin);
    this.importBibTexModal = new ImportBibTexModal(plugin);
    this.deleteSourceModal = new DeleteSourceModal(plugin);
    this.setTitle("Sources");
  }

  onOpen() {
    this.component?.$destroy();
    this.component = new SourceList({
      target: this.contentEl,
      props: {
        onAddSource: () => this.editSourceModal.open(),
        onImportSource: (type) => {
          switch (type) {
            case "bibtex":
              this.importBibTexModal.open();
              break;
            case "doi":
              this.importDOIModal.open();
              break;
          }
        },
        onEditSource: (source: Source) => this.editSourceModal.open(source),
        onDeleteSource: (source: Source) => this.deleteSourceModal.open(source),
      },
    });
  }

  onClose(): void {
    this.component?.$destroy();
  }
}
