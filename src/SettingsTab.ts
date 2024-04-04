import { App, PluginSettingTab, Setting } from "obsidian";
import { Sourcerer } from "./Sourcerer";

export class SettingsTab extends PluginSettingTab {
  plugin: Sourcerer;

  constructor(plugin: Sourcerer) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();
    this.addSourceDirectory();
    this.addAutoRename();
  }

  addSourceDirectory(): void {
    new Setting(this.containerEl)
      .setName("Sources directory")
      .setDesc("The directory in which to save and load sources")
      .addText((text) =>
        text
          .setPlaceholder("sources/")
          .setValue(this.plugin.settings.sourceDir)
          .onChange(async (value) => {
            this.plugin.settings.sourceDir = value;
            await this.plugin.saveSettings();
          })
      );
  }

  addAutoRename(): void {
    new Setting(this.containerEl)
      .setName("Auto-rename sources")
      .setDesc("Automatically rename sources when their title is changed")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.autoRename)
          .onChange(async (value) => {
            this.plugin.settings.autoRename = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
