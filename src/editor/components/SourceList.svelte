<script lang="ts">
  import { Source } from "../../types/Source";
  import { sources } from "../../store/sources";
  import SourceListItem from "./SourceListItem.svelte";

  export let onAddSource: () => void;
  export let onImportSource: (type: "bibtex" | "doi") => void;
  export let onEditSource: (source: Source) => void;
  export let onDeleteSource: (source: Source) => void;

  let importType: "" | "bibtex" | "doi";

  $: if (importType) {
    onImportSource(importType);
    importType = "";
  }
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
    <button on:click={onAddSource}>Add source</button>
    <select bind:value={importType}>
      <option value="" hidden disabled selected>Import source</option>
      <option value="doi">From DOI</option>
      <option value="bibtex">From BibTex</option>
    </select>
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
    display: flex;
    height: 30px;
    overflow: visible;
    gap: var(--size-4-3);
  }

  select {
    padding-right: 0.8em;
  }
</style>
