import { Decoration, EditorView, WidgetType } from "@codemirror/view";
import { Source } from "../../Source";
import { parseFrontMatter } from "../../utils";
import { getCiteStyle } from "../../CiteStyle";

export class ReferenceWidget extends WidgetType {
  private source: Source;
  private index: number;

  constructor(index: number, source: Source) {
    super();
    this.index = index;
    this.source = source;
  }

  toDOM(view: EditorView): HTMLElement {
    const element = document.createElement("span");
    element.className = "reference-widget";

    const frontmatter = parseFrontMatter(view.state.doc.toString());
    const citeStyle = getCiteStyle(frontmatter["cite-style"]);

    if (citeStyle != null) {
      element.appendChild(citeStyle.cite(this.source, this.index));
    }

    return element;
  }
}
