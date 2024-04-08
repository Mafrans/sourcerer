<script lang="ts">
  import { PageRange } from "../../../pages";
  import InputPanel from "../input/InputPanel.svelte";
  import PageRangeListItem from "./PageRangeListItem.svelte";

  export let pages: PageRange[] = [];

  function handleAddPage() {
    pages = [...pages, [0, undefined]];
  }

  function handleAddRange() {
    pages = [...pages, [0, 0]];
  }

  function handleRemove(index: number) {
    pages = pages.filter((_, i) => i !== index);
  }
</script>

<InputPanel title="Pages">
  <ul>
    {#each pages as [start, end], i}
      <PageRangeListItem {start} {end} onRemove={() => handleRemove(i)} />
    {/each}
    {#if pages.length === 0}
      <li class="list-empty">No pages</li>
    {/if}
  </ul>

  <button on:click={handleAddPage}>Add page</button>
  <button on:click={handleAddRange}>Add range</button>
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
