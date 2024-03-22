import { join } from "path";
import { Source } from "./Source";
import { Sourcerer } from "./Sourcerer";
import { TAbstractFile } from "obsidian";
import { getVaultRootPath } from "./utils";

export class SourceManager {
  private plugin: Sourcerer;
  public sources: Source[];

  constructor(plugin: Sourcerer) {
    this.plugin = plugin;
    this.sources = [];
  }

  public addSource(source: Source): void {
    source.save(this.plugin.app.vault, this.plugin.settings.sourceDir);
    this.sources.push(source);
  }

  public loadSource(file: TAbstractFile): void {
    const source = Source.load(file);
    if (!this.hasSource(source.name)) {
      this.sources.push(source);
    }
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
