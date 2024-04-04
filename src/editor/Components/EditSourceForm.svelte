<script lang="ts">
  import { Source } from "../../Source";
  import { formatName, nameToString, parseName } from "../../names";
  import AuthorInputList from "./AuthorInputList.svelte";

  export let source: Source;
  export let onCancel: () => void;
  export let onSubmit: (source: Source) => void;

  let title = source.fields.title || "";
  let authors = source.fields.authors.map(parseName);

  function handleSubmit() {
    source.fields.title = title;
    source.fields.authors = authors.map(nameToString);
    onSubmit(source);
  }
</script>

<div class="edit-source-form">
  <label>
    Title
    <input required type="text" bind:value={title} />
  </label>

  <div>
    <AuthorInputList bind:authors />
  </div>

  <div class="buttons">
    <button on:click={onCancel} class="cancel">Cancel</button>
    <button on:click={handleSubmit} class="submit preferred">Submit</button>
  </div>
</div>

<style>
  .edit-source-form > * {
    padding: var(--size-4-4) 0;
    border-bottom: var(--border-width) solid var(--color-base-30);
  }

  .edit-source-form > *:last-child {
    border-bottom: none;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--size-4-4);
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: var(--size-4-2);
    margin-top: var(--size-4-2);
  }
</style>
