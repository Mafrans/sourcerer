import { Notice, Plugin } from "obsidian";
import { SourceListModal } from "./editor/modals/SourceListModal";
import { DEFAULT_SETTINGS, Settings } from "./Settings";
import { SettingsTab } from "./SettingsTab";
import { SourceManager } from "./SourceManager";
import { makeReferenceState } from "./editor/state/ReferenceState";

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
        this.sourceManager.loadSource(file);
      }
    });

    await this.loadSettings();
    this.addSettingTab(this.settingsTab);
    this.registerEditorExtension([makeReferenceState(this)]);

    this.addRibbonIcon("dice", "Greet", async () => {
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
}
