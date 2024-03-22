import { EditorView, WidgetType } from "@codemirror/view";
import { Source } from "../../Source";
import { CiteStyle } from "../../CiteStyle";

export class BibliographyWidget extends WidgetType {
  private sources: Source[];
  private citeStyle: CiteStyle;

  constructor(sources: Source[], citeStyle: CiteStyle) {
    super();
    this.sources = sources;
    this.citeStyle = citeStyle;
  }

  toDOM(view: EditorView): HTMLElement {
    const element = document.createElement("div");
    element.className = "bibliography-widget";

    if (this.citeStyle != null) {
      element.appendChild(this.citeStyle.bibliography(this.sources));
    }

    return element;
  }
}
