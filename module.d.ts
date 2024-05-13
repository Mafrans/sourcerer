declare module "citeproc" {
  export type Sys = {
    retrieveLocale: (name: string) => Promise<string>;
    retrieveItem: (id: string) => any;
  };

  export type Citation = {
    citationID?: string | number;
    citationItems: CitationItem[];
    sortedItems?: CitationItem[];
    properties: { noteIndex: number };
  };

  export type CitationItem = {
    id: string | number;
    locator?: string | number;
    label?: string;
    "suppress-author"?: boolean;
    "author-only"?: boolean;
    prefix?: string;
    suffix?: string;
    position?: string;
    "near-note"?: boolean;
  };

  export type BibliographyProps = {
    maxoffset: number;
    entryspacing: number;
    linespacing: number;
    hangingindent: boolean;
    "second-field-align": boolean;
    bibstart: string;
    bibend: string;
    bibliography_errors: string[];
    entry_ids: string[];
  };

  export class Engine {
    constructor(
      sys: Sys,
      style: string,
      lang?: string,
      forceLang?: boolean
    ): Engine;

    style: string;

    updateItems(ids: string[]): void;
    updateUncitedItems(ids: string[]): void;
    processCitationCluster(
      citation: Citation,
      citationsPre: (string | number)[],
      citationsPost: (string | number)[],
      format: "html" | "text" | "rtf"
    ): [object, [number, string][]];
    previewCitationCluster(
      citation: Citation,
      citationsPre: (string | number)[],
      citationsPost: (string | number)[],
      format: "html" | "text" | "rtf"
    ): string;
    makeCitationCluster(ids: string[]): string;
    makeBibliography(filter?: string): [BibliographyProps, string[]];
  }

  export type NameVariable = {
    family?: string;
    given?: string;
    "dropping-particle"?: string;
    "non-dropping-particle"?: string;
    suffix?: string;
    "comma-suffix"?: string | number | boolean;
    "static-ordering"?: string | number | boolean;
    literal?: string;
    "parse-names"?: string | number | boolean;
  };
  /**
   * The CSL input model supports two different date representations: an EDTF string (preferred), and a more structured alternative.
   */
  export type DateContentModel = {
    "date-parts"?:
      | [
          | [string | number]
          | [string | number, string | number]
          | [string | number, string | number, string | number]
        ]
      | [
          (
            | [string | number]
            | [string | number, string | number]
            | [string | number, string | number, string | number]
          ),
          (
            | [string | number]
            | [string | number, string | number]
            | [string | number, string | number, string | number]
          )
        ];
    season?: string | number;
    circa?: string | number | boolean;
    literal?: string;
    raw?: string;
  };

  export type CSLSourceType =
    | "article"
    | "article-journal"
    | "article-magazine"
    | "article-newspaper"
    | "bill"
    | "book"
    | "broadcast"
    | "chapter"
    | "classic"
    | "collection"
    | "dataset"
    | "document"
    | "entry"
    | "entry-dictionary"
    | "entry-encyclopedia"
    | "event"
    | "figure"
    | "graphic"
    | "hearing"
    | "interview"
    | "legal_case"
    | "legislation"
    | "manuscript"
    | "map"
    | "motion_picture"
    | "musical_score"
    | "pamphlet"
    | "paper-conference"
    | "patent"
    | "performance"
    | "periodical"
    | "personal_communication"
    | "post"
    | "post-weblog"
    | "regulation"
    | "report"
    | "review"
    | "review-book"
    | "software"
    | "song"
    | "speech"
    | "standard"
    | "thesis"
    | "treaty"
    | "webpage";

  /**
   * JSON schema for CSL input data
   */
  export type CSLJSON = {
    type: CSLSourceType;
    id: string | number;
    "citation-key"?: string;
    categories?: string[];
    language?: string;
    journalAbbreviation?: string;
    shortTitle?: string;
    author?: NameVariable[];
    chair?: NameVariable[];
    "collection-editor"?: NameVariable[];
    compiler?: NameVariable[];
    composer?: NameVariable[];
    "container-author"?: NameVariable[];
    contributor?: NameVariable[];
    curator?: NameVariable[];
    director?: NameVariable[];
    editor?: NameVariable[];
    "editorial-director"?: NameVariable[];
    "executive-producer"?: NameVariable[];
    guest?: NameVariable[];
    host?: NameVariable[];
    interviewer?: NameVariable[];
    illustrator?: NameVariable[];
    narrator?: NameVariable[];
    organizer?: NameVariable[];
    "original-author"?: NameVariable[];
    performer?: NameVariable[];
    producer?: NameVariable[];
    recipient?: NameVariable[];
    "reviewed-author"?: NameVariable[];
    "script-writer"?: NameVariable[];
    "series-creator"?: NameVariable[];
    translator?: NameVariable[];
    accessed?: DateContentModel;
    "available-date"?: DateContentModel;
    "event-date"?: DateContentModel;
    issued?: DateContentModel;
    "original-date"?: DateContentModel;
    submitted?: DateContentModel;
    abstract?: string;
    annote?: string;
    archive?: string;
    archive_collection?: string;
    archive_location?: string;
    "archive-place"?: string;
    authority?: string;
    "call-number"?: string;
    "chapter-number"?: string | number;
    "citation-number"?: string | number;
    "citation-label"?: string;
    "collection-number"?: string | number;
    "collection-title"?: string;
    "container-title"?: string;
    "container-title-short"?: string;
    dimensions?: string;
    division?: string;
    DOI?: string;
    edition?: string | number;
    /**
     * [Deprecated - use 'event-title' instead. Will be removed in 1.1]
     */
    event?: string;
    "event-title"?: string;
    "event-place"?: string;
    "first-reference-note-number"?: string | number;
    genre?: string;
    ISBN?: string;
    ISSN?: string;
    issue?: string | number;
    jurisdiction?: string;
    keyword?: string;
    locator?: string | number;
    medium?: string;
    note?: string;
    number?: string | number;
    "number-of-pages"?: string | number;
    "number-of-volumes"?: string | number;
    "original-publisher"?: string;
    "original-publisher-place"?: string;
    "original-title"?: string;
    page?: string | number;
    "page-first"?: string | number;
    part?: string | number;
    "part-title"?: string;
    PMCID?: string;
    PMID?: string;
    printing?: string | number;
    publisher?: string;
    "publisher-place"?: string;
    references?: string;
    "reviewed-genre"?: string;
    "reviewed-title"?: string;
    scale?: string;
    section?: string;
    source?: string;
    status?: string;
    supplement?: string | number;
    title?: string;
    "title-short"?: string;
    URL?: string;
    version?: string;
    volume?: string | number;
    "volume-title"?: string;
    "volume-title-short"?: string;
    "year-suffix"?: string;
    custom?: CustomKeyValuePairs;
  };

  /**
   * Used to store additional information that does not have a designated CSL JSON field. The custom field is preferred over the note field for storing custom data, particularly for storing key-value pairs, as the note field is used for user annotations in annotated bibliography styles.
   */
  export interface CustomKeyValuePairs {
    [k: string]: unknown;
  }
}
