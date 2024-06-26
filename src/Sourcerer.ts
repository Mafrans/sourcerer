import { Notice, Plugin, TFile } from "obsidian";
import { SourceListModal } from "./editor/modals/SourceListModal";
import { DEFAULT_SETTINGS, Settings } from "./Settings";
import { SettingsTab } from "./SettingsTab";
import {
  fileIsSource,
  updateSource,
  sources,
  addSource,
  removeSource,
} from "./store/sources";
import { makeReferenceState } from "./editor/state/ReferenceState";
import { makeBibliographyProcessor } from "./editor/postprocessor/BibliographyProcessor";
import { makeReferenceProcessor } from "./editor/postprocessor/ReferenceProcessor";
import { basename } from "path";
import { Source, loadSource } from "./types/Source";
import { makeListSourcesCommand } from "./commands/listSourcesCommand";
import { makeReloadSourcesCommand } from "./commands/reloadSourcesCommand";
import { makeNewSourceCommand } from "./commands/newSourceCommand";
import { importCrossRef } from "./importers/importCrossRef";

export const APP_NAME = "Sourcerer";

export class Sourcerer extends Plugin {
  settingsTab!: SettingsTab;
  sourceListModal!: SourceListModal;
  settings!: Settings;

  async onload(): Promise<void> {
    this.settingsTab = new SettingsTab(this);
    this.sourceListModal = new SourceListModal(this);
    (window as any).importCrossRef = importCrossRef;

    await this.loadSettings();
    this.addSettingTab(this.settingsTab);

    this.addCommand(makeListSourcesCommand(this));
    this.addCommand(makeReloadSourcesCommand(this));
    this.addCommand(makeNewSourceCommand(this));

    this.registerEditorExtension([makeReferenceState(this)]);
    this.registerMarkdownPostProcessor(makeBibliographyProcessor(this));
    this.registerMarkdownPostProcessor(makeReferenceProcessor(this));

    this.addRibbonIcon("book-marked", "Source library", async () => {
      this.sourceListModal.open();
    });

    this.registerFrontmatterProperties();
    this.createFileListeners();
  }

  onunload(): void {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  registerFrontmatterProperties() {
    const properties: Record<string, "text"> = {
      "cite-style": "text",
    };

    const typeManager = this.app.metadataTypeManager;
    for (const [name, type] of Object.entries(properties)) {
      if (!typeManager.getPropertyInfo(name)) {
        typeManager.setType(name, type);
      }
    }
  }

  async createFileListeners() {
    const vault = this.app.vault;

    vault.on("create", async (file) => {
      if (!fileIsSource(vault, this.settings, file)) return;
      const source = await loadSource(vault, file as TFile);
      if (source != null) {
        addSource(source);
      }
    });

    vault.on("modify", async (file) => {
      if (!fileIsSource(vault, this.settings, file)) return;
      const source = await loadSource(vault, file as TFile);
      if (source != null) {
        updateSource(source);
      }
    });

    vault.on("rename", async (file, oldPath) => {
      if (!fileIsSource(vault, this.settings, file)) return;
      const source = await loadSource(vault, file as TFile);
      if (source != null) {
        removeSource(basename(oldPath, ".md"));
        addSource(source);
      }
    });

    vault.on("delete", (file) => {
      if (!fileIsSource(vault, this.settings, file)) return;
      removeSource(basename(file.path, ".md"));
    });
  }
}
