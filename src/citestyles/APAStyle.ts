import { CiteStyle } from "../CiteStyle";
import { Source } from "../Source";

export class APAStyle implements CiteStyle {
  cite(source: Source, index: number): HTMLElement {
    const { pages, author, year } = source.fields;
    const element = document.createElement("span");

    const authors = author?.map((it) => it.lastName);

    if (author && year && pages) {
      element.textContent = `(${authors?.join(" & ")}, ${year}, p. ${pages.join(
        "-"
      )})`;
    } else if (author && year) {
      element.textContent = `${authors?.join(" and ")} (${year})`;
    } else if (author) {
      element.textContent = `${authors?.join(" and ")}`;
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

      cell.appendChild(source.render());

      row.appendChild(cell);
      table.appendChild(row);
    }

    return table;
  }
}
