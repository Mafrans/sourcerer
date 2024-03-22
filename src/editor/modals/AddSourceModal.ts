import { App, Modal, Notice } from "obsidian";
import { Sourcerer } from "../../Sourcerer";
import { Person } from "../../Person";
import { Source } from "../../Source";

export class AddSourceModal extends Modal {
  public onAddSource?: (source: Source) => void;
  private plugin: Sourcerer;

  constructor(plugin: Sourcerer) {
    super(plugin.app);
    this.plugin = plugin;
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.addClass("add-source-modal");
    contentEl.innerHTML = `
      <h3>Add source</h3>
      <form method="dialog">
        <label>
          <span>Title</span>
          <input type="text" placeholder="Title" name="title">
        </label>
        <div class="authors">
          <label>Authors</label>
          <ul></ul>
          <button class="author-add">Add author</button>
        </div>
        
        <div class="buttons">
          <button class="cancel">Cancel</button>
          <button class="submit preferred">Submit</button>
        </div>
      </form>
    `;

    const form = contentEl.querySelector("form")!;
    const authorList = form.querySelector<HTMLUListElement>(".authors ul")!;
    const addAuthorButton =
      form.querySelector<HTMLButtonElement>("button.author-add")!;
    const cancelButton =
      form.querySelector<HTMLButtonElement>("button.cancel")!;
    const submitButton =
      form.querySelector<HTMLButtonElement>("button.submit")!;

    cancelButton.addEventListener("click", () => this.close());
    submitButton.addEventListener("click", () => this.submit(form));
    addAuthorButton.addEventListener("click", () =>
      this.addAuthorItem(authorList)
    );
  }

  addAuthorItem(list: HTMLUListElement) {
    const item = list.createEl("li", "author");
    item.innerHTML = `
        <div class="author-content">
          <input autofocus type="text" placeholder="First name" name="author-firstName">
          <input type="text" placeholder="Last name" name="author-lastName">
        </div>
        <div class="author-delete"></div>
      `;

    const deleteButton = item.querySelector<HTMLDivElement>(".author-delete")!;
    deleteButton.addEventListener("click", () => {
      item.remove();
    });
  }

  submit(form: HTMLFormElement) {
    const data = new FormData(form);
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
