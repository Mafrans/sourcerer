import { basename, join } from "path";
import { Source } from "../Source";
import { Sourcerer } from "../Sourcerer";
import { TAbstractFile, TFile, Vault } from "obsidian";
import { Unsubscriber, Writable, get, writable } from "svelte/store";
import { Settings } from "../Settings";

export const sources = writable<Source[]>([]);

export function getSource(name: string) {
  return get(sources).find((source) => source.name === name);
}

export function addSource(source: Source) {
  sources.update((sources) => [...sources, source]);
}

export function removeSource(name: string) {
  sources.update((sources) => sources.filter((source) => source.name !== name));
}

export function updateSource(source: Source) {
  sources.update((sources) => [
    source,
    ...sources.filter((s) => s.name !== source.name),
  ]);
}

export function hasSource(name: string) {
  return get(sources).some((source) => source.name === name);
}

export function fileIsSource(
  vault: Vault,
  settings: Settings,
  file: TAbstractFile
): boolean {
  const { path, name } = file;
  return name.endsWith(".md") && path.startsWith(`${settings.sourceDir}/`);
}
