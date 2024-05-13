import { EditorView, WidgetType } from "@codemirror/view";
import { Engine } from "citeproc";
import { Reference } from "../../types/Reference";
import { Source, sourceToCSLJSON } from "../../types/Source";

export class ReferenceWidget extends WidgetType {
  private csl: Engine;
  private source: Source;
  private index: number;
  // private before: Reference[];
  // private after: Reference[];

  constructor(
    citeEngine: Engine,
    source: Source,
    index: number
    // before: Reference[],
    // after: Reference[]
  ) {
    super();
    this.csl = citeEngine;
    this.source = source;
    this.index = index;
    // this.before = before;
    // this.after = after;
  }

  toDOM(view: EditorView): HTMLElement {
    const element = document.createElement("span");
    element.className = "reference-widget";

    const [, [citation]] = this.csl.processCitationCluster(
      {
        citationItems: [{ id: this.source.fields.id }],
        properties: { noteIndex: this.index },
      },
      [],
      [],
      "html"
    );

    console.log(citation);

    // TODO: this is dangerous, we should sanitize the citation
    element.innerHTML = citation[1];
    return element;
  }
}
