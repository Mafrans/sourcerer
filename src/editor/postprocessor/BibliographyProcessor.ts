import { MarkdownPostProcessor } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { getCiteStyle } from "../../CiteStyle";
import { get } from "svelte/store";
import { sources as sourceStore } from "../../store/sources";

export function makeBibliographyProcessor(
  plugin: Sourcerer
): MarkdownPostProcessor {
  return (element, context) => {
    const sources = get(sourceStore);
    const citeStyle = getCiteStyle(context.frontmatter?.["cite-style"] ?? "");
    if (citeStyle == null) return;

    const bibliographies = Array.from(element.querySelectorAll("p")).filter(
      (p) => p.textContent?.trim() === "%bibliography%"
    );

    for (const bibliography of bibliographies) {
      bibliography.replaceWith(citeStyle.bibliography(sources));
    }
  };
}
