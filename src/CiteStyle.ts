import { Source } from "./types/Source";
import CSL from "citeproc-js";
import { Sourcerer } from "./Sourcerer";
import { processCache } from "./utils";
import { App } from "obsidian";

export async function getCiteproc(app: App, sources: Source[], style: string) {
  const citeprocSys: CSL.Sys = {
    retrieveLocale: (loc) => retrieveCiteprocLocale(app, loc),
    retrieveItem: (id: string) => sources.find((it) => it.name === id)
  }

  const styleXml = await retrieveCiteprocStyle(app, style);
  return new CSL.Engine(citeprocSys, styleXml);
}

// TODO: citeproc-js

export async function retrieveCiteprocStyle(app: App, name: string) {
  let styles: Record<string, string> = {};
  processCache<typeof styles>(app, "sourcerer-citeproc-locales", async (data) => {
    if (!data?.[name]) {
      const res = await fetch(`https://raw.githubusercontent.com/citation-style-language/styles/master/${name}.csl`);
      if (!res.ok) return data;
      data[name] = await res.text();
    }
    return styles = data;
  });
  return styles[name];
}

export async function retrieveCiteprocLocale(app: App, name: string) {
  let locales: Record<string, string> = {};
  processCache<typeof locales>(app, "sourcerer-citeproc-locales", async (data) => {
    if (!data?.[name]) {
      const res = await fetch(`https://raw.githubusercontent.com/Juris-M/citeproc-js-docs/master/locales-${name}.xml`);
      if (!res.ok) return data;
      data[name] = await res.text();
    }
    return locales = data;
  });
  return locales[name];
}