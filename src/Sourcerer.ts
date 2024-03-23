import { Notice, Plugin, TFile } from "obsidian";
import { SourceListModal } from "./editor/modals/SourceListModal";
import { DEFAULT_SETTINGS, Settings } from "./Settings";
import { SettingsTab } from "./SettingsTab";
import { SourceManager } from "./SourceManager";
import { makeReferenceState } from "./editor/state/ReferenceState";
import { makeBibliographyProcessor } from "./editor/postprocessor/BibliographyProcessor";
import { makeReferenceProcessor } from "./editor/postprocessor/ReferenceProcessor";
import { basename } from "path";
import { EditSourceForm } from "./editor/Components/EditSourceForm.lit";
import { AuthorInputList } from "./editor/Components/AuthorInputList.lit";
import { AuthorInputListEntry } from "./editor/Components/AuthorInputListEntry.lit";
import { MiniButton } from "./editor/Components/MiniButton.lit";
import { SourceList } from "./editor/Components/SourceList.lit";
import { SourceListEntry } from "./editor/Components/SourceListEntry.lit";

export const APP_NAME = "Sourcerer";

export class Sourcerer extends Plugin {
  settingsTab!: SettingsTab;
  sourceManager!: SourceManager;
  sourceListModal!: SourceListModal;
  settings!: Settings;

  async onload(): Promise<void> {
    this.sourceManager = new SourceManager(this);
    this.settingsTab = new SettingsTab(this);
    this.sourceListModal = new SourceListModal(this);

    this.app.vault.on("create", (file) => {
      if (this.sourceManager.fileIsSource(file)) {
        this.sourceManager.loadSource(file as TFile);
      }
    });

    this.app.vault.on("rename", (file, oldPath) => {
      if (this.sourceManager.fileIsSource(file)) {
        this.sourceManager.removeSource(basename(oldPath, ".md"));
        this.sourceManager.loadSource(file as TFile);
      }
    });

    this.app.vault.on("delete", (file) => {
      if (this.sourceManager.fileIsSource(file)) {
        this.sourceManager.removeSource(basename(file.name, ".md"));
      }
    });

    // Register components
    this.registerComponent("x-edit-source-form", EditSourceForm);
    this.registerComponent("x-author-input-list", AuthorInputList);
    this.registerComponent("x-author-input-list-entry", AuthorInputListEntry);
    this.registerComponent("x-mini-button", MiniButton);
    this.registerComponent("x-source-list", SourceList);
    this.registerComponent("x-source-list-entry", SourceListEntry);

    await this.loadSettings();
    this.addSettingTab(this.settingsTab);
    this.registerEditorExtension([makeReferenceState(this)]);
    this.registerMarkdownPostProcessor(makeBibliographyProcessor(this));
    this.registerMarkdownPostProcessor(makeReferenceProcessor(this));

    this.addRibbonIcon("book-marked", "Source library", async () => {
      this.sourceListModal.open();
    });
  }

  onunload(): void {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  registerComponent(name: string, component: CustomElementConstructor) {
    if (!customElements.get(name)) {
      customElements.define(name, component);
    }
  }
}
