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
  import BookFields from "./publication-fields/BookFields.svelte";
  import InBookFields from "./publication-fields/InBookFields.svelte";
  import InCollectionFields from "./publication-fields/InCollectionFields.svelte";
  import InProceedingsFields from "./publication-fields/InProceedingsFields.svelte";
  import ManualFields from "./publication-fields/ManualFields.svelte";
  import MastersThesisFields from "./publication-fields/MastersThesisFields.svelte";
  import PhdThesisFields from "./publication-fields/PhdThesisFields.svelte";
  import ProceedingsFields from "./publication-fields/ProceedingsFields.svelte";
  import TechreportFields from "./publication-fields/TechreportFields.svelte";
  import AllFields from "./publication-fields/AllFields.svelte";

  export let source: Source;
  export let onCancel: () => void;
  export let onSubmit: (source: Source) => void;

  const fields = source.fields;

  let title = fields.title || "";
  let booktitle = fields.booktitle;
  let publicationType = fields.howpublished || "article";
  let publisher = fields.publisher;
  let address = fields.address;
  let institution = fields.institution;
  let organization = fields.organization;
  let school = fields.school;
  let journal = fields.journal;
  let volume = fields.volume;
  let number = fields.number;
  let edition = fields.edition;
  let series = fields.series;
  let chapter = fields.chapter;
  let pages = fields.pages?.map(parsePageRange) ?? [];
  let authors = fields.authors.map(parseName);
  let date = fields.date;
  let email = fields.email;

  const publicationFields: Record<PublicationType, any> = {
    article: ArticleFields,
    book: BookFields,
    inbook: InBookFields,
    incollection: InCollectionFields,
    conference: InCollectionFields,
    inproceedings: InProceedingsFields,
    manual: ManualFields,
    mastersthesis: MastersThesisFields,
    phdthesis: PhdThesisFields,
    proceedings: ProceedingsFields,
    techreport: TechreportFields,
    misc: AllFields,
    unpublished: null,
  };

  $: publicationComponent = publicationFields[publicationType];

  function handleSubmit() {
    const sortedPages = pages.sort(([a], [b]) => a - b);

    source.fields = {
      ...source.fields,
      title,
      booktitle,
      howpublished: publicationType,
      publisher,
      address,
      institution,
      organization,
      school,
      journal,
      volume,
      number,
      edition,
      series,
      chapter,
      pages: sortedPages.map(formatPageRange),
      authors: authors.map(nameToString),
      date,
      email,
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

  <AuthorInputList bind:authors />

  {#if publicationComponent}
    <InputPanel
      hasPadding={false}
      title={`${publicationTypes[publicationType]} details`}
    >
      <svelte:component
        this={publicationComponent}
        bind:booktitle
        bind:publisher
        bind:address
        bind:institution
        bind:organization
        bind:school
        bind:journal
        bind:volume
        bind:number
        bind:edition
        bind:series
        bind:chapter
        bind:email
        bind:pages
      />
    </InputPanel>
  {/if}

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
