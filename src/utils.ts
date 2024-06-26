import { readFile } from "fs/promises";
import {
  App,
  FileSystemAdapter,
  TAbstractFile,
  TFile,
  Vault,
  parseYaml,
} from "obsidian";
import { join } from "path";

export function getVaultRootPath(vault: Vault): string | undefined {
  if (vault.adapter instanceof FileSystemAdapter) {
    return vault.adapter.getBasePath();
  } else return undefined;
}

export function getAbsolutePath(file: TAbstractFile) {
  return join(getVaultRootPath(file.vault) ?? "", file.path);
}

const FRONT_MATTER_REGEX = /^\n*---[^\n]*\n+(?<fm>.+?)\n+---.*/s;
export function parseFrontMatter(content: String) {
  const match = content.match(FRONT_MATTER_REGEX);

  if (match == null) {
    return {};
  }

  return parseYaml(match.groups?.fm ?? "");
}

export function formatFileName(name: string) {
  return name.replace(/[<>:"/\|?*\x00-\x1F]/g, "-");
}

export function uid(): string {
  return Math.random().toString(36).substring(2, 8);
}

export function processCache<T extends object>(app: App, key: string, fn: (data: T) => Promise<T> | T) {
  const data = JSON.parse(app.loadLocalStorage(key)) as T;

  let mutated = fn(data ?? {});
  if (mutated instanceof Promise) {
    mutated.then((data) => mutated = data);
  }

  app.saveLocalStorage(key, mutated);
}