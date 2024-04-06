<script lang="ts">
  import { moment } from "obsidian";
  import { Source } from "../../types/Source";
  import { formatName, nameToString, parseName } from "../../names";
  import AuthorInputList from "./authors/AuthorInputList.svelte";
  import ArticleFields from "./publication-fields/ArticleFields.svelte";
  import {
    PublicationType,
    publicationTypes,
  } from "../../types/PublicationType";
  import { SvelteComponent } from "svelte";
  import { formatPageRange, parsePageRange } from "../../pages";
  import Input from "./input/Input.svelte";
  import Dropdown from "./input/Dropdown.svelte";
  import InputPanel from "./input/InputPanel.svelte";

  export let source: Source;
  export let onCancel: () => void;
  export let onSubmit: (source: Source) => void;

  const fields = source.fields;

  let title = fields.title || "";
  let publicationType = fields.howpublished || "article";
  let journal = fields.journal ?? "";
  let volume = fields.volume ?? 0;
  let chapter = fields.chapter ?? 0;
  let pages = fields.pages?.map(parsePageRange) ?? [];
  let authors = fields.authors.map(parseName);
  let date = fields.date;

  const publicationFields: Record<PublicationType, any> = {
    article: ArticleFields,
    book: null,
    inbook: null,
    incollection: null,
    inproceedings: null,
    manual: null,
    mastersthesis: null,
    phdthesis: null,
    proceedings: null,
    techreport: null,
    unpublished: null,
    misc: null,
  };

  $: publicationComponent = publicationFields[publicationType];

  function handleSubmit() {
    const sortedPages = pages.sort(([a], [b]) => a - b);

    source.fields = {
      ...source.fields,
      title,
      howpublished: publicationType,
      journal,
      volume,
      chapter,
      pages: sortedPages.map(formatPageRange),
      authors: authors.map(nameToString),
      date,
    };

    onSubmit(source);
  }
</script>

<div class="edit-source-form">
  <Input label="Title" type="text" required bind:value={title} />
  <Input label="Publication date" type="date" required bind:value={date} />
  <Dropdown
    label="Publication type"
    options={publicationTypes}
    bind:value={publicationType}
  />

  {#if publicationComponent}
    <InputPanel
      hasPadding={false}
      title={`${publicationTypes[publicationType]} fields`}
    >
      <svelte:component
        this={publicationComponent}
        bind:journal
        bind:volume
        bind:chapter
        bind:pages
      />
    </InputPanel>
  {/if}

  <div>
    <AuthorInputList bind:authors />
  </div>

  <div class="buttons">
    <button on:click={onCancel} class="cancel">Cancel</button>
    <button on:click={handleSubmit} class="submit preferred">Submit</button>
  </div>
</div>

<style>
  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: var(--size-4-2);
    margin-top: var(--size-4-2);
  }
</style>
