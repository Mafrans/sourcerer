declare module "citeproc-js" {
  export type Sys = {
    retrieveLocale: (name: string) => Promise<string>,
    retrieveItem: (id: string) => any
  }

  export class Engine {
    constructor (sys: Sys, style: string): Engine
    makeBibliography(): string
  }
}