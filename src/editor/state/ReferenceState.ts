import { syntaxTree } from "@codemirror/language";
import { Extension, RangeSetBuilder, StateField } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";
import { ReferenceWidget } from "../widgets/ReferenceWidget";
import { Sourcerer } from "../../Sourcerer";
import { Source } from "../../types/Source";
import { BibliographyWidget } from "../widgets/BibliographyWidget";
import { CiteStyle, getCiteStyle } from "../../CiteStyle";
import { getSource, sources as sourceStore } from "../../store/sources";
import { get } from "svelte/store";
import { parseYaml } from "obsidian";

export function makeReferenceState(
  plugin: Sourcerer
): StateField<DecorationSet> {
  let unsubscribe = () => {};

  const state = StateField.define<DecorationSet>({
    create() {
      return Decoration.none;
    },

    update(value, tr) {
      const activeFile = plugin.app.workspace.getActiveFile();
      if (activeFile == null) return value;

      const builder = new RangeSetBuilder<Decoration>();
      const selection = tr.state.selection?.main;
      const doc = tr.state.doc;
      const frontmatter =
        plugin.app.metadataCache.getFileCache(activeFile)?.frontmatter;

      const citeStyle = getCiteStyle(frontmatter?.["cite-style"] ?? "");
      if (citeStyle == null) return value;

      let citations: Source[] = [];
      syntaxTree(tr.state).iterate({
        enter(node) {
          const content = tr.state.sliceDoc(node.from, node.to);

          if (node.type.name === "hmd-internal-link") {
            const source = getSource(content);
            if (source == null) return;

            if (!citations.includes(source)) {
              citations.push(source);
            }

            const from = node.from - 2; // account for the opening brackets
            const to = node.to + 2; // account for the closing brackets

            if (selection.from >= from && selection.to <= to) return;

            builder.add(
              from,
              to,
              Decoration.replace({
                widget: new ReferenceWidget(
                  citations.indexOf(source),
                  source,
                  citeStyle!
                ),
              })
            );
          }
        },
      });

      for (const line of tr.state.doc.iterLines()) {
        if (line.trim() === "%bibliography%") {
          const from = tr.state.doc.toString().indexOf("%bibliography%");
          const to = from + "%bibliography%".length;

          let decoration;
          if (selection.from >= from && selection.to <= to) {
            decoration = Decoration.mark({ class: "cm-inline-code" });
          } else {
            decoration = Decoration.replace({
              widget: new BibliographyWidget(citations, citeStyle),
              block: true,
            });
          }

          builder.add(from, to, decoration);
        }
      }

      return builder.finish();
    },
    provide(field: StateField<DecorationSet>): Extension {
      return EditorView.decorations.from(field);
    },
  });

  return state;
}
