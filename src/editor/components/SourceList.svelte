<script lang="ts">
  import { Source } from "../../types/Source";
  import { sources } from "../../store/sources";
  import SourceListItem from "./SourceListItem.svelte";

  export let onAddSource: () => void;
  export let onEditSource: (source: Source) => void;
  export let onDeleteSource: (source: Source) => void;
</script>

<div class="sources">
  <ul>
    {#each $sources as source}
      <SourceListItem
        {source}
        onEdit={onEditSource}
        onDelete={onDeleteSource}
      />
    {/each}
  </ul>

  <div class="buttons">
    <button on:click={onAddSource} class="source-add">Add source</button>
  </div>
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

  .buttons {
    margin-top: var(--size-4-4);
  }
</style>
