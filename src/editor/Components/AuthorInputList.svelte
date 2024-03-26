<script lang="ts">
  import { Person } from "../../Person";
  import AuthorInputListItem from "./AuthorInputListItem.svelte";

  export let authors: Person[] = [];

  function handleAddAuthor() {
    authors = [...authors, new Person()];
  }

  function handleRemoveAuthor(index: number) {
    authors = authors.filter((_, i) => i !== index);
  }
</script>

<div class="authors">
  <div class="title">Authors</div>
  <ul>
    {#each authors as author, i}
      <AuthorInputListItem {author} onRemove={() => handleRemoveAuthor(i)} />
    {/each}
  </ul>
  <button on:click={handleAddAuthor}>Add author</button>
</div>

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: var(--size-4-2);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .title {
    font-weight: bold;
    margin-bottom: var(--size-4-2);
    font-size: var(--font-ui-medium);
  }

  button {
    display: flex;
    justify-content: flex-end;
    gap: var(--size-4-2);
    margin-top: var(--size-4-2);
  }
</style>
