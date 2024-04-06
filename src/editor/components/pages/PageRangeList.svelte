<script lang="ts">
  import { LucideBookOpenText, LucideX } from "lucide-svelte";
  import MiniButton from "../MiniButton.svelte";
  import { PageRange } from "../../../pages";
  import InputPanel from "../input/InputPanel.svelte";

  export let pages: PageRange[] = [];

  function handleAddPage() {
    pages = [...pages, [0, undefined]];
  }

  function handleAddRange() {
    pages = [...pages, [0, 0]];
  }

  function handleRemovePage(index: number) {
    pages = pages.filter((_, i) => i !== index);
  }
</script>

<InputPanel title="Pages">
  <ul>
    {#each pages as [start, end], i}
      <li>
        <div class="range">
          {#if end != null}
            <span class="prefix">Between</span>
            <input type="number" bind:value={start} />
            <span>and</span>
            <input type="number" bind:value={end} />
          {:else}
            <span class="prefix">Page</span>
            <input type="number" bind:value={start} />
          {/if}
        </div>
        <MiniButton on:click={() => handleRemovePage(i)} icon={LucideX} />
      </li>
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

  li {
    display: flex;
    align-items: center;
    gap: var(--size-4-2);
  }

  .list-empty {
    font-size: var(--font-ui-small);
  }

  button {
    gap: var(--size-4-2);
    margin-top: var(--size-4-3);
  }

  .prefix {
    min-width: 5em;
  }

  span {
    font-size: var(--font-ui-small);
  }

  .range {
    display: flex;
    align-items: center;
    flex: 1;
    gap: var(--size-4-2);
  }

  input {
    width: 5em;
  }
</style>
