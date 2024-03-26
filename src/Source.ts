import fs, { mkdirSync } from "fs";
import {
  TAbstractFile,
  TFile,
  Vault,
  parseYaml,
  stringifyYaml,
} from "obsidian";
import { Person } from "./Person";
import { getAbsolutePath, getVaultRootPath } from "./utils";
import { basename, join } from "path";
import { Settings } from "./Settings";

export type SourceFields = {
  title?: string;
  booktitle?: string;
  annote?: string;
  note?: string;
  howpublished?: string;

  journal?: string;
  edition?: string;
  volume?: number;
  chapter?: number;
  series?: string;
  pages?: number[];
  doi?: URL;

  address?: string;
  authors?: Person[];
  editor?: Person[];
  institution?: string;
  organization?: string;
  school?: string;
  publisher?: string;
  email?: string;

  month?: number;
  number?: number;
  year?: number;
};

export class Source {
  public name: string;
  public readonly fields: SourceFields;

  constructor(fields: SourceFields = {}, name?: string) {
    this.fields = fields;
    this.name = name ?? this.generateName();
  }

  public regenerateName() {
    this.name = this.name || this.generateName();
  }

  private getFilePath(vault: Vault, settings: Settings): string {
    return join(
      getVaultRootPath(vault) ?? "",
      settings.sourceDir,
      `${this.name}.md`
    );
  }

  public getFile(vault: Vault, settings: Settings): TFile | null {
    return vault.getFileByPath(this.getFilePath(vault, settings));
  }

  public async save(vault: Vault, settings: Settings): Promise<void> {
    const path = this.getFilePath(vault, settings);
    const content = stringifyYaml(this.fields);

    const sourceDir = vault.getFolderByPath(settings.sourceDir);
    if (sourceDir == null) {
      await vault.createFolder(settings.sourceDir);
    }

    let file = vault.getFileByPath(path);
    if (file == null) {
      file = await vault.create(path, "");
    }

    await vault.modify(file, "---\n" + content + "\n---");
  }

  public static async load(vault: Vault, file: TFile): Promise<Source | null> {
    const content = await vault.read(file);
    const front = content.split("---")?.[1];

    if (front == null) {
      return null;
    }

    const fields = parseYaml(front) as SourceFields;
    const name = basename(file.name, ".md");

    return new Source(fields, name);
  }

  isValid() {
    return this.name != null && this.name.length >= 1;
  }

  private generateName(): string {
    const { title, authors: author, year } = this.fields;
    let name = "";

    if (author != null && author.length >= 1) {
      name += author[0].firstName.toLowerCase();
    }

    if (year != null) {
      name += year;
    }

    if (title != null) {
      name += title.split(" ")[0].toLowerCase();
    }

    return name;
  }

  public render(): HTMLDivElement {
    const container = document.createElement("div");
    const authors = document.createElement("span");
    const title = document.createElement("i");

    authors.textContent =
      (
        this.fields.authors?.map((it) => `${it.lastName}, ${it.firstName}`) ??
        []
      ).join(" and ") + ", ";

    title.textContent = this.fields.title ?? "";

    container.appendChild(authors);
    container.appendChild(title);

    return container;
  }
}
