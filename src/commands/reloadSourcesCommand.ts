import { Command } from "obsidian";
import { Sourcerer } from "../Sourcerer";
import { makeSourceFolder, reloadSources } from "../types/Source";

export const makeReloadSourcesCommand = (plugin: Sourcerer): Command => ({
  id: "sourcerer-reload-sources",
  name: "Reload sources",
  icon: "sync",
  callback: async () => {
    await makeSourceFolder(plugin.app.vault, plugin.settings);
    reloadSources(plugin.app.vault, plugin.settings);
  },
});
