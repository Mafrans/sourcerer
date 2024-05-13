import { MarkdownPostProcessor } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { getSource, hasSource } from "../../store/sources";
import { CSLManager } from "../../CSLManager";

export function makeReferenceProcessor(
  plugin: Sourcerer
): MarkdownPostProcessor {
  return (element, context) => {
    // const citeEngine = new CSLManager(
    //   plugin.app,
    //   context.frontmatter?.["cite-style"] ?? ""
    // );
    // if (citeEngine == null) return;
    // const references = Array.from(
    //   element.querySelectorAll<HTMLAnchorElement>("a.internal-link")
    // ).filter((a) => hasSource(a.dataset.href!));
    // let index = 0;
    // for (const reference of references) {
    //   const source = getSource(reference.dataset.href!);
    //   if (source == null) continue;
    //   const widget = citeEngine.cite(source);
    //   reference.replaceWith(widget);
    //   index++;
    // }
  };
}
