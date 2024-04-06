<script lang="ts">
  import { LucideUser } from "lucide-svelte";
  import { Name, emptyName } from "../../../names";
  import InputPanel from "../input/InputPanel.svelte";
  import AuthorInputListItem from "./AuthorInputListItem.svelte";

  export let authors: Name[] = [];

  function handleAddAuthor() {
    authors = [...authors, emptyName()];
  }

  function handleRemoveAuthor(index: number) {
    authors = authors.filter((_, i) => i !== index);
  }
</script>

<InputPanel title="Authors">
  <ul>
    {#each authors as author, i}
      <AuthorInputListItem {author} onRemove={() => handleRemoveAuthor(i)} />
    {/each}
    {#if authors.length === 0}
      <li class="list-empty">No authors</li>
    {/if}
  </ul>
  <button on:click={handleAddAuthor}>Add author</button>
</InputPanel>

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: var(--size-4-2);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-empty {
    font-size: var(--font-ui-small);
  }

  button {
    gap: var(--size-4-2);
    margin-top: var(--size-4-3);
  }
</style>
