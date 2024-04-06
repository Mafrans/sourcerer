export const publicationTypes = {
  article: "Article",
  book: "Book",
  inbook: "In book",
  incollection: "In collection",
  inproceedings: "In proceedings",
  manual: "Manual",
  mastersthesis: "Master thesis",
  misc: "Misc",
  phdthesis: "Phd thesis",
  proceedings: "Proceedings",
  techreport: "Tech report",
  unpublished: "Unpublished",
};

export type PublicationType = keyof typeof publicationTypes;
