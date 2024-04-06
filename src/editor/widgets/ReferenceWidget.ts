import { EditorView, WidgetType } from "@codemirror/view";
import { Source } from "../../types/Source";
import { CiteStyle } from "../../CiteStyle";

export class ReferenceWidget extends WidgetType {
  private source: Source;
  private index: number;
  private citeStyle: CiteStyle;

  constructor(index: number, source: Source, citeStyle: CiteStyle) {
    super();
    this.index = index;
    this.source = source;
    this.citeStyle = citeStyle;
  }

  toDOM(view: EditorView): HTMLElement {
    const element = document.createElement("span");
    element.className = "reference-widget";

    element.appendChild(this.citeStyle.cite(this.source, this.index));

    return element;
  }
}
