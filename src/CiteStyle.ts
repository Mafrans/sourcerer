import { Source } from "./Source";
import { APAStyle } from "./citestyles/APAStyle";
import { IEEEStyle } from "./citestyles/IEEEStyle";

export interface CiteStyle {
  cite(source: Source, index: number): HTMLElement;
  bibliography(sources: Source[]): HTMLElement;
}

export function getCiteStyle(name: string): CiteStyle | undefined {
  switch (name.toLowerCase()) {
    case "apa":
      return new APAStyle();
    case "ieee":
      return new IEEEStyle();
  }
}
