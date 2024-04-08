import { Command } from "obsidian";
import { Sourcerer } from "../Sourcerer";
import { EditSourceModal } from "../editor/modals/EditSourceModal";

export const makeNewSourceCommand = (plugin: Sourcerer): Command => ({
  id: "sourcerer-new-source",
  name: "New source",
  icon: "plus",
  callback: () => {
    const editor = new EditSourceModal(plugin);
    editor.open();
  },
});
