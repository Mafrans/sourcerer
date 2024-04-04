import { App, TFile, TFolder, Vault, parseYaml, stringifyYaml } from "obsidian";
import {
  Name,
  formatName,
  formatShortName,
  nameToString,
  parseName,
} from "./names";
import { formatFileName, getVaultRootPath } from "./utils";
import { basename, join } from "path";
import { Settings } from "./Settings";
import assert from "assert";

export type SourceFields = {
  title: string;
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
  authors: string[];
  editor?: string[];
  institution?: string;
  organization?: string;
  school?: string;
  publisher?: string;
  email?: string;

  month?: number;
  number?: number;
  year?: number;
};

export type Source = {
  name: string;
  fields: SourceFields;
};

/**
 * Create a new empty source.
 * Empty sources are not valid and should not be saved.
 */
export function emptySource(): Source {
  return { name: "", fields: { title: "", authors: [] } };
}

export function newSource(fields: SourceFields): Source {
  assert(fields.title, "Source must have a title");
  assert(fields.authors.length > 0, "Source must have at least one author");

  return {
    name: makeSourceName(fields.title, fields.authors, fields.year),
    fields,
  };
}

function makeSourceName(
  title: string,
  authors: string[],
  year?: number
): string {
  let name = formatShortName(parseName(authors[0]));
  if (authors.length > 1) {
    name += " et al.";
  }
  if (year) {
    name += ` ${year}`;
  }
  name += `, ${title}`;

  return formatFileName(name);
}

function getSourceFilePath(settings: Settings, source: Source): string {
  assert(settings.sourceDir, "Source directory is not set");
  return join(settings.sourceDir, `${source.name}.md`);
}

export function getSourceFile(
  vault: Vault,
  settings: Settings,
  source: Source
): TFile | null {
  const path = getSourceFilePath(settings, source);
  const file = vault.getAbstractFileByPath(path);

  console.log({ file, path });

  assert(!(file instanceof TFolder), `Source cannot be a folder: ${path}`);
  return file as TFile | null;
}

export async function saveSource(
  app: App,
  settings: Settings,
  source: Source
): Promise<void> {
  const { vault, fileManager } = app;
  if (source.name == "") {
    source.name = makeSourceName(source.fields.title, source.fields.authors);
  }

  let sourceDir = vault.getFolderByPath(settings.sourceDir);
  if (sourceDir == null) {
    sourceDir = await vault.createFolder(settings.sourceDir);
  }

  console.log(getSourceFilePath(settings, source));
  const content = stringifyYaml(source.fields);
  let file = getSourceFile(vault, settings, source);
  if (file == null) {
    file = await vault.create(join(sourceDir.path, source.name) + ".md", "");
  }

  await vault.modify(file, "---\n" + content + "\n---");

  if (settings.autoRename) {
    const newName = makeSourceName(
      source.fields.title,
      source.fields.authors,
      source.fields.year
    );

    if (newName !== source.name) {
      fileManager.renameFile(file, join(sourceDir.path, newName) + ".md");
    }
  }
}

export async function loadSource(
  vault: Vault,
  file: TFile
): Promise<Source | null> {
  const content = await vault.read(file);
  const front = content.split("---")?.[1];

  if (front == null) {
    return null;
  }

  const fields = parseYaml(front) as SourceFields;
  const name = basename(file.name, ".md");

  return { name, fields };
}

export function renderSource(source: Source): HTMLDivElement {
  const { title, authors } = source.fields;

  const containerEl = document.createElement("div");
  const authorsEl = document.createElement("span");
  const titleEl = document.createElement("i");

  authorsEl.textContent =
    authors.map(parseName).map(formatName).join(" and ") + ", ";
  titleEl.textContent = title;

  containerEl.appendChild(authorsEl);
  containerEl.appendChild(titleEl);

  return containerEl;
}

export function parseSource(yaml: string): Source {
  const fields = parseYaml(yaml);
  fields.authors = fields.authors.map(parseName);
  return { name: "", fields };
}
