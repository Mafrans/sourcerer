import bibtexParser, { Creator } from "@retorquere/bibtex-parser";
import { PublicationType } from "../types/PublicationType";
import { Source, emptySource } from "../types/Source";
import { Name, nameToString } from "../names";
import moment from "moment";

export function importBibTex(content: string): Source[] | null {
  let { entries } = bibtexParser.parse(content);
  if (entries.length === 0) {
    return null;
  }

  let sources: Source[] = [];
  for (const e of entries) {
    const source = emptySource();
    source.fields.howpublished = e.type as PublicationType;
    const bibtex = e.fields as Record<string, string> & typeof e.fields;

    if (bibtex.author) {
      source.fields.authors = bibtex.author.map((a) =>
        nameToString([a.firstName, a.lastName] as Name)
      );
      delete bibtex.author;
    }

    if (bibtex.year) {
      source.fields.date = moment([
        bibtex.year,
        -1 + (bibtex.month ?? 1),
        bibtex.day ?? 1,
      ]).format("YYYY-MM-DD");
      delete bibtex.year;
      delete bibtex.month;
      delete bibtex.day;
    }

    if (bibtex.pages) {
      source.fields.pages = bibtex.pages
        .replace("\u2013", "-")
        .split(",")
        .map((s: string) => s.trim());
      delete bibtex.pages;
    }

    for (const [key, value] of Object.entries(bibtex)) {
      Object.assign(source.fields, { [key]: value });
    }

    sources.push(source);
  }
  return sources;
}
