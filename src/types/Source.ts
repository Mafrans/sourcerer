import { App, TFile, TFolder, Vault, parseYaml, stringifyYaml } from "obsidian";
import {
  Name,
  formatCSLJSONName,
  formatName,
  formatShortName,
  nameToString,
  parseName,
} from "../names";
import { formatFileName, getVaultRootPath, uid } from "../utils";
import { basename, join } from "path";
import { Settings } from "../Settings";
import assert from "assert";
import { SourceFields } from "./SourceFields";
import moment from "moment";
import { addSource, fileIsSource, sources } from "../store/sources";
import { CSLJSON } from "citeproc";

export type Source = {
  name: string;
  abstract: string;
  fields: SourceFields;
};

/**
 * Create a new empty source.
 * Empty sources are not valid and should not be saved.
 */
export function emptySource(): Source {
  return {
    name: "",
    abstract: "",
    fields: { id: uid(), type: "article", title: "", authors: [] },
  };
}

export function newSource(fields: SourceFields, abstract = ""): Source {
  assert(fields.title, "Source must have a title");
  assert(fields.authors.length > 0, "Source must have at least one author");

  return {
    name: makeSourceName(fields.title, fields.authors, fields.date),
    abstract,
    fields,
  };
}

function makeSourceName(
  title: string,
  authors: string[],
  date?: string
): string {
  let name = formatShortName(parseName(authors[0]));
  let year = moment(date).year();
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

  const sourceDir = await makeSourceFolder(vault, settings);
  const content = stringifyYaml(source.fields);
  let file = getSourceFile(vault, settings, source);
  if (file == null) {
    file = await vault.create(join(sourceDir.path, source.name) + ".md", "");
  }

  await vault.modify(file, "---\n" + content + "\n---\n" + source.abstract);

  if (settings.autoRename) {
    const newName = makeSourceName(
      source.fields.title,
      source.fields.authors,
      source.fields.date
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
  const [_, front, abstract] = content.split("---");

  if (front == null) {
    return null;
  }

  const fields = parseYaml(front) as SourceFields;
  const name = basename(file.name, ".md");

  return { name, fields, abstract: abstract?.trim() ?? "" };
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
  return { fields, name: "", abstract: "" };
}

export async function makeSourceFolder(vault: Vault, settings: Settings) {
  let sourceDir = vault.getFolderByPath(settings.sourceDir);
  if (sourceDir == null) {
    sourceDir = await vault.createFolder(settings.sourceDir);
  }
  return sourceDir;
}

export async function reloadSources(vault: Vault, settings: Settings) {
  sources.set([]);
  const files = vault.getFiles();
  for (const file of files) {
    if (fileIsSource(vault, settings, file)) {
      const source = await loadSource(vault, file as TFile);
      if (source != null) {
        addSource(source);
      }
    }
  }
}

export function sourceToCSLJSON(source: Source): CSLJSON {
  const f = source.fields;
  return {
    id: f.id,
    type: f.type as CSLJSON["type"],
    author: f.authors.map(parseName).map(formatCSLJSONName),
    "container-title": f.journal,
    title: f.title,
    DOI: f.doi,
  };
}
