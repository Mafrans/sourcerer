import { CiteStyle } from "../CiteStyle";
import { Source, renderSource } from "../Source";

export class IEEEStyle implements CiteStyle {
  cite(source: Source, index: number): HTMLElement {
    const element = document.createElement("span");
    element.textContent = `[${index + 1}]`;
    return element;
  }

  bibliography(sources: Source[]): HTMLElement {
    const table = document.createElement("table");
    table.classList.add("bibliography");

    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      const row = document.createElement("tr");
      const indexCell = document.createElement("td");
      const sourceCell = document.createElement("td");

      indexCell.textContent = `[${i + 1}]`;
      sourceCell.appendChild(renderSource(source));

      row.appendChild(indexCell);
      row.appendChild(sourceCell);
      table.appendChild(row);
    }

    return table;
  }
}
