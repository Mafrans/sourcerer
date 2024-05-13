import { EditorView, WidgetType } from "@codemirror/view";
import { Source } from "../../types/Source";
import { Engine } from "citeproc";

export class BibliographyWidget extends WidgetType {
  private csl: Engine;

  constructor(csl: Engine) {
    super();
    this.csl = csl;
  }

  toDOM(view: EditorView): HTMLElement {
    const element = document.createElement("div");
    element.className = "bibliography-widget";

    const bibliography = this.csl.makeBibliography();
    console.log(bibliography);
    element.innerHTML = bibliography?.[1]?.join("");

    return element;
  }
}
