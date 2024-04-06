import { CiteStyle } from "../CiteStyle";
import { Source, renderSource } from "../types/Source";

export class APAStyle implements CiteStyle {
  cite(source: Source, index: number): HTMLElement {
    const { pages, authors, year } = source.fields;
    const element = document.createElement("span");
    const lastNames = authors.map((it) => it[1]);

    if (lastNames && year && pages) {
      element.textContent = `(${lastNames.join(
        " & "
      )}, ${year}, p. ${pages.join("-")})`;
    } else if (lastNames && year) {
      element.textContent = `${lastNames.join(" and ")} (${year})`;
    } else if (lastNames) {
      element.textContent = `${lastNames.join(" and ")}`;
    } else {
      element.textContent = `No author`;
    }

    return element;
  }

  bibliography(sources: Source[]): HTMLElement {
    const table = document.createElement("table");
    table.classList.add("bibliography");

    for (const source of sources) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");

      cell.appendChild(renderSource(source));

      row.appendChild(cell);
      table.appendChild(row);
    }

    return table;
  }
}
