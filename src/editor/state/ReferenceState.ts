import { syntaxTree } from "@codemirror/language";
import { Extension, RangeSetBuilder, StateField } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";
import { Notice, iterateRefs } from "obsidian";
import { ReferenceWidget } from "../widgets/ReferenceWidget";
import { Sourcerer } from "../../Sourcerer";
import { Source } from "../../Source";
import { BibliographyWidget } from "../widgets/BibliographyWidget";

export function makeReferenceState(
  plugin: Sourcerer
): StateField<DecorationSet> {
  const state = StateField.define<DecorationSet>({
    create() {
      return Decoration.none;
    },
    update(value, tr) {
      const builder = new RangeSetBuilder<Decoration>();
      const selection = tr.state.selection?.main;

      let sources: Source[] = [];
      syntaxTree(tr.state).iterate({
        enter(node) {
          const content = tr.state.sliceDoc(node.from, node.to);

          if (node.type.name === "hmd-internal-link") {
            const linkFile = plugin.app.vault.getAbstractFileByPath(
              `${content}.md`
            );

            if (linkFile == null) return;
            if (!plugin.sourceManager.fileIsSource(linkFile)) return;

            const source = Source.load(linkFile);

            if (!sources.includes(source)) {
              sources.push(source);
            }

            const from = node.from - 2; // account for the opening brackets
            const to = node.to + 2; // account for the closing brackets

            if (selection.from >= from && selection.to <= to) return;

            builder.add(
              from,
              to,
              Decoration.replace({
                widget: new ReferenceWidget(sources.indexOf(source), source),
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
              widget: new BibliographyWidget(sources),
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