import { PublicationType } from "./PublicationType";

export type SourceFields = {
  title: string;
  booktitle?: string;
  annote?: string;
  note?: string;
  howpublished?: PublicationType;

  journal?: string;
  edition?: string;
  volume?: number;
  chapter?: number;
  series?: string;
  pages?: string[];
  doi?: string;
  issn?: string;
  url?: string;

  address?: string;
  authors: string[];
  editor?: string[];
  institution?: string;
  organization?: string;
  school?: string;
  publisher?: string;
  email?: string;

  date?: string;
};
