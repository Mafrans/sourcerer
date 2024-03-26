import fs, { mkdirSync } from "fs";
import {
  TAbstractFile,
  TFile,
  Vault,
  parseYaml,
  stringifyYaml,
} from "obsidian";
import { Person } from "./Person";
import { getAbsolutePath } from "./utils";
import { join } from "path";

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
