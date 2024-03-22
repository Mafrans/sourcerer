import fs from "fs";
import toml from "toml";
import { Notice, TAbstractFile, TFile } from "obsidian";
import { Person } from "./Person";
import { getAbsolutePath } from "./utils";

type SourceFields = {
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
  author?: Person[];
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
  public readonly name: string;
  public readonly fields: SourceFields;

  constructor(fields: SourceFields, name?: string) {
    this.fields = fields;
    this.name = name ?? this.generateName();
  }

  private generateName(): string {
    const { title, author, year } = this.fields;
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

  public static load(file: TAbstractFile): Source {
    const { path, name } = file;
    const absolutePath = getAbsolutePath(file);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File does not exist: ${absolutePath}`);
    }

    const content = fs.readFileSync(absolutePath, { encoding: "utf-8" });
    const fields = toml.parse(content) as SourceFields;

    return new Source(fields, name.slice(0, -".md".length));
  }

  public save(): void {
    // ...
  }

  public render(): HTMLDivElement {
    const container = document.createElement("div");
    const authors = document.createElement("span");
    const title = document.createElement("i");

    authors.textContent =
      (
        this.fields.author?.map((it) => `${it.lastName}, ${it.firstName}`) ?? []
      ).join(" and ") + ", ";

    title.textContent = this.fields.title ?? "";

    container.appendChild(authors);
    container.appendChild(title);

    return container;
  }
}
