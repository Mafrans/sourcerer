import { MarkdownPostProcessor } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { getCiteStyle } from "../../CiteStyle";

export function makeReferenceProcessor(
  plugin: Sourcerer
): MarkdownPostProcessor {
  return (element, context) => {
    const citeStyle = getCiteStyle(context.frontmatter?.["cite-style"] ?? "");
    if (citeStyle == null) return;

    const references = Array.from(
      element.querySelectorAll<HTMLAnchorElement>("a.internal-link")
    ).filter((a) => plugin.sourceManager.hasSource(a.dataset.href!));

    let index = 0;
    for (const reference of references) {
      const source = plugin.sourceManager.getSource(reference.dataset.href!);
      if (source == null) continue;

      const widget = citeStyle.cite(source, index);
      reference.replaceWith(widget);
      index++;
    }
  };
}
