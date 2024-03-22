import { readFile } from "fs/promises";
import {
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
