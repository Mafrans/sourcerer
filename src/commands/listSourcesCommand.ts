import { Command } from "obsidian";
import { Sourcerer } from "../Sourcerer";

export const makeListSourcesCommand = (plugin: Sourcerer): Command => ({
  id: "sourcerer-list-sources",
  name: "List sources",
  icon: "list",
  callback: () => {
    plugin.sourceListModal.open();
  },
});
