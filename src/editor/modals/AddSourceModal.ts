import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { Person } from "../../Person";
import { Source } from "../../Source";

export class AddSourceModal extends Modal {
  public onAddSource?: (source: Source) => void;
  private plugin: Sourcerer;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.setTitle("Add source");
    this.plugin = plugin;
  }

  onOpen() {
    const form = document.createElement("x-edit-source-form");
    form.addEventListener("submit", (event: SubmitEvent) => this.submit(event));
    form.addEventListener("cancel", () => this.close());
    this.contentEl.appendChild(form);
  }

  submit(event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement);
    const title = data.get("title") as string;
    const authorFirstNames = data.getAll("author-firstName") as string[];
    const authorLastNames = data.getAll("author-lastName") as string[];
    const author: Person[] = authorFirstNames.map(
      (_, index) => new Person(authorFirstNames[index], authorLastNames[index])
    );

    const source = new Source({ title, author });
    this.plugin.sourceManager.addSource(source);

    this.close();
    this.onAddSource?.(source);
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
