import { MarkdownPostProcessor } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { getCiteStyle } from "../../CiteStyle";
import { getSource, hasSource } from "../../store/sources";

export function makeReferenceProcessor(
  plugin: Sourcerer
): MarkdownPostProcessor {
  return (element, context) => {
    const citeStyle = getCiteStyle(context.frontmatter?.["cite-style"] ?? "");
    if (citeStyle == null) return;

    const references = Array.from(
      element.querySelectorAll<HTMLAnchorElement>("a.internal-link")
    ).filter((a) => hasSource(a.dataset.href!));

    let index = 0;
    for (const reference of references) {
      const source = getSource(reference.dataset.href!);
      if (source == null) continue;

      const widget = citeStyle.cite(source, index);
      reference.replaceWith(widget);
      index++;
    }
  };
}
