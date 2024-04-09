import { Modal } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import ImportSelectDialog from "../components/ImportSelectDialog.svelte";
import { ImportDOIModal } from "./ImportDOIModal";
import { ImportBibTexModal } from "./ImportBibTexModal";

export class ImportSourceModal extends Modal {
  private plugin: Sourcerer;
  private component?: ImportSelectDialog;
  private importDOIModal: ImportDOIModal;
  private importBibTexModal: ImportBibTexModal;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
    this.modalEl.style.maxWidth = "15em";
    this.setTitle("Import source");

    this.importDOIModal = new ImportDOIModal(plugin);
    this.importBibTexModal = new ImportBibTexModal(plugin);
  }

  onOpen() {
    this.component?.$destroy();
    this.component = new ImportSelectDialog({
      target: this.contentEl,
      props: {
        onSelectDOI: () => this.importDOIModal.open(),
        onSelectBibTex: () => this.importBibTexModal.open(),
      },
    });
  }

  onClose(): void {
    this.component?.$destroy();
  }
}
