import { Source, sourceToCSLJSON } from "./types/Source";
import CSL from "citeproc";
import { Sourcerer } from "./Sourcerer";
import { loadCache, processCache, saveCache } from "./utils";
import { App, Vault } from "obsidian";
import { join } from "path";
import { sources } from "./store/sources";
import { get } from "svelte/store";

export class CSLManager {
  private sourcerer: Sourcerer;
  private vault: Vault;

  constructor(sourcerer: Sourcerer) {
    this.sourcerer = sourcerer;
    this.vault = sourcerer.app.vault;
  }

  async fetchLocale(name: string) {
    let cached = await loadCache<string>(this.vault, `locales-${name}`);
    if (cached) return cached;

    const res = await fetch(
      `https://raw.githubusercontent.com/Juris-M/citeproc-js-docs/master/_static/data/locales/locales-${name}.xml`
    );
    cached = await res.text();

    if (!cached) throw new Error(`Failed to fetch locale ${name}`);
    await saveCache(this.vault, `locales-${name}`, cached);

    return cached;
  }

  async fetchStyle(name: string) {
    let cached = await loadCache<string>(this.vault, `styles-${name}`);
    if (cached) return cached;

    const res = await fetch(
      `https://raw.githubusercontent.com/citation-style-language/styles/master/${name.toLowerCase()}.csl`
    );
    cached = await res.text();

    if (!cached) throw new Error(`Failed to fetch style ${name}`);
    await saveCache(this.vault, `styles-${name}`, cached);

    return cached;
  }

  async makeEngine(style: string) {
    const styleXML = await this.fetchStyle(style);

    const sys: CSL.Sys = {
      retrieveLocale: async (name) => {
        return await this.fetchLocale(name);
      },
      retrieveItem: async (id) => {
        const source = get(sources).find((source) => source.fields.id === id);
        if (source == null) return null;
        return sourceToCSLJSON(source);
      },
    };

    return new CSL.Engine(sys, styleXML);
  }
}
