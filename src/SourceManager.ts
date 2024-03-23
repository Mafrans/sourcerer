import { basename, join } from "path";
import { Source } from "./Source";
import { Sourcerer } from "./Sourcerer";
import { TAbstractFile, TFile } from "obsidian";

export class SourceManager {
  private plugin: Sourcerer;
  public sources: Source[];

  constructor(plugin: Sourcerer) {
    this.plugin = plugin;
    this.sources = [];
  }

  public addSource(source: Source): void {
    this.saveSource(source);
    this.sources.push(source);
  }

  public removeSource(name: string): void {
    const index = this.sources.findIndex((source) => source.name === name);
    if (index !== -1) {
      this.sources.splice(index, 1);
    }
  }

  public async saveSource(source: Source): Promise<void> {
    const {
      app: { vault, fileManager },
      settings: { sourceDir },
    } = this.plugin;

    const path = join(sourceDir, `${source.name}.md`);
    let file = vault.getFileByPath(path);

    await vault.createFolder(sourceDir).catch(() => /* Do nothing */ {});
    if (file == null) {
      file = await vault.create(path, "");
    }

    fileManager.processFrontMatter(file, (fm) =>
      Object.assign(fm, source.fields)
    );
  }

  public async loadSource(file: TFile): Promise<void> {
    const fileManager = this.plugin.app.fileManager;
    const name = basename(file.name, ".md");
    if (!this.hasSource(name)) {
      let fields;
      await fileManager.processFrontMatter(file, (fm) => (fields = fm));
      this.sources.push(new Source(fields, name));
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
