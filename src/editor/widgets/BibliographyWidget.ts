import { Decoration, EditorView, WidgetType } from "@codemirror/view";
import { Source } from "../../Source";
import { text } from "stream/consumers";
import { parseFrontMatter } from "../../utils";
import { getCiteStyle } from "../../CiteStyle";

export class BibliographyWidget extends WidgetType {
  private sources: Source[];

  constructor(sources: Source[]) {
    super();
    this.sources = sources;
  }

  toDOM(view: EditorView): HTMLElement {
    const element = document.createElement("div");
    element.className = "bibliography-widget";

    const frontmatter = parseFrontMatter(view.state.doc.toString());
    const citeStyle = getCiteStyle(frontmatter["cite-style"]);

    if (citeStyle != null) {
      element.appendChild(citeStyle.bibliography(this.sources));
    }

    return element;
  }
}
