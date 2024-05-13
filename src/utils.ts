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

export async function getCacheDir(vault: Vault): Promise<string> {
  const cacheDir = join(vault.configDir, "sourcerer", "cache");
  const fs = vault.adapter.fs?.promises;
  if (!fs) return cacheDir;

  try {
    await fs.access(cacheDir);
  } catch (e) {
    await fs.mkdir(cacheDir, { recursive: true });
  }
  return cacheDir;
}

export async function loadCache<T>(
  vault: Vault,
  name: string
): Promise<T | undefined> {
  const cacheDir = await getCacheDir(vault);
  const cachePath = join(cacheDir, `${name}.json`);
  const fs = vault.adapter.fs?.promises;
  if (!fs) return undefined;

  try {
    const data = await fs.readFile(cachePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return undefined;
  }
}

export async function saveCache<T>(
  vault: Vault,
  name: string,
  data: T
): Promise<void> {
  const cacheDir = await getCacheDir(vault);
  const cachePath = join(cacheDir, `${name}.json`);
  const fs = vault.adapter.fs?.promises;
  if (!fs) return;

  await fs.writeFile(cachePath, JSON.stringify(data));
}

export async function processCache<T>(
  vault: Vault,
  name: string,
  process: (data: T | undefined) => Promise<T>
): Promise<T> {
  let data = await loadCache<T>(vault, name);
  data = await process(data);
  await saveCache(vault, name, data);
  return data;
}
