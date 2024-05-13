import { MarkdownPostProcessor } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { get } from "svelte/store";
import { sources as sourceStore } from "../../store/sources";
import { CSLManager } from "../../CSLManager";

export function makeBibliographyProcessor(
  plugin: Sourcerer
): MarkdownPostProcessor {
  return (element, context) => {
    // const sources = get(sourceStore);
    // const citeEngine = new CSLManager(
    //   plugin.app,
    //   context.frontmatter?.["cite-style"] ?? ""
    // );
    // if (citeEngine == null) return;
    // const bibliographies = Array.from(element.querySelectorAll("p")).filter(
    //   (p) => p.textContent?.trim() === "%bibliography%"
    // );
    // citeEngine.setSources(sources);
    // for (const bibliography of bibliographies) {
    //   bibliography.replaceWith(citeEngine.bibliography());
    // }
  };
}
