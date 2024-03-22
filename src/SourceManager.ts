import { join, resolve } from "path";
import toml from "toml";
import { Source } from "./Source";
import { Sourcerer } from "./Sourcerer";
import { Notice, TAbstractFile, TFile } from "obsidian";
import { getVaultRootPath } from "./utils";

export class SourceManager {
  private plugin: Sourcerer;
  public sources: Source[];

  constructor(plugin: Sourcerer) {
    this.plugin = plugin;
    this.sources = [];
  }

  public async addSource(file: TAbstractFile): Promise<void> {
    const source = await Source.load(file);
    this.sources.push(source);
  }

  public fileIsSource(file: TAbstractFile): boolean {
    const { sourceDir } = this.plugin.settings;
    const { path, name } = file;

    return name.endsWith(".md") && path.startsWith(`${sourceDir}/`);
  }

  public getSource(name: string): Source | undefined {
    for (const source of this.sources) {
      if (source.name === name) return source;
    }
  }

  public hasSource(name: string): boolean {
    return this.getSource(name) != null;
  }
}
