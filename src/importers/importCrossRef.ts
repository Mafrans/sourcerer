import moment from "moment";
import { Name, nameToString } from "../names";
import { Source, emptySource } from "../types/Source";
import { PublicationType } from "../types/PublicationType";

const BASE_URL = "http://api.crossref.org";

const crossRefTypeMap: Record<string, PublicationType> = {
  "book-section": "inbook",
  "book-chapter": "inbook",
  "book-part": "inbook",
  report: "techreport",
  book: "book",
  "journal-article": "article",
  proceedings: "proceedings",
  "proceedings-article": "inproceedings",
};

type ImportCrossRefResponse = {
  message: {
    DOI: string;
    ISSN: string[];
    URL: string;
    abstract: string;
    archive: string[];
    assertion: unknown[];
    author: {
      family: string;
      given: string;
      suffix: string;
      sequence: "first" | "additional";
    }[];
    title: string[];
    type: string;
    "container-title": string[];
    published: {
      "date-parts": [number, number, number][];
    };
    volume: string;
    issue: string;
    page: string;
  };
};

export async function importCrossRef(doi: string): Promise<Source | null> {
  const res = await fetch(`${BASE_URL}/works/${doi}`);
  if (!res.ok) {
    return null;
  }

  const { message } = (await res.json()) as ImportCrossRefResponse;

  console.log(message);

  const source = emptySource();
  source.abstract = message.abstract;
  if (message.abstract.startsWith("<jats:p>")) {
    source.abstract = message.abstract.replace(/<\/?jats:p>/g, "");
  }

  source.fields.doi = message.DOI;
  source.fields.issn = message.ISSN?.[0];
  source.fields.url = message.URL;
  source.fields.title = message.title?.[0];
  source.fields.howpublished = crossRefTypeMap[message.type] ?? "misc";
  source.fields.journal = message["container-title"]?.[0];
  source.fields.volume = parseInt(message.volume);
  source.fields.number = parseInt(message.issue);
  source.fields.pages = [message.page];
  source.fields.authors = message.author
    .map(({ given, family }) => [given, family] as Name)
    .map(nameToString);

  if (message.published["date-parts"]?.length > 0) {
    const [year, month, day] = message.published["date-parts"][0];
    source.fields.date = moment([year, month - 1, day]).format("YYYY-MM-DD");
  }

  return source;
}
