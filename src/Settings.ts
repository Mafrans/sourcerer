export interface Settings {
  sourceDir: string;
  autoRename: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  sourceDir: "sources",
  autoRename: true,
};
