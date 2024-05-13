import { PublicationType } from "./PublicationType";

export type SourceFields = {
  id: string;

  type: PublicationType;
  title: string;
  booktitle?: string;
  annote?: string;
  note?: string;

  journal?: string;
  edition?: number;
  volume?: number;
  number?: number;
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
