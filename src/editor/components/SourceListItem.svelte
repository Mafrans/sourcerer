<script lang="ts">
  import { LucidePencil, LucideTrash } from "lucide-svelte";
  import { Source } from "../../types/Source";
  import MiniButton from "./MiniButton.svelte";
  import { formatName, nameToString, parseName } from "../../names";

  export let source: Source;
  export let onEdit: (source: Source) => void;
  export let onDelete: (source: Source) => void;

  function handleEdit() {
    onEdit(source);
  }

  function handleDelete() {
    onDelete(source);
  }

  $: title = source.fields.title || "No title";
  $: authors = source.fields.authors.map(parseName);
</script>

<li class="source">
  <div class="content">
    <div class="title">{title}</div>
    <div class="authors">{authors.map(formatName).join(" & ")}</div>
  </div>

  <div class="buttons">
    <MiniButton on:click={handleEdit} icon={LucidePencil} />
    <MiniButton on:click={handleDelete} icon={LucideTrash} />
  </div>
</li>

<style>
  .source {
    display: flex;
    justify-content: space-between;
    padding: var(--size-4-2) 0;
    gap: var(--size-2-2);
  }

  .source:not(:last-child) {
    border-bottom: var(--border-width) solid var(--color-base-30);
  }

  .title {
    font-weight: bold;
    font-size: var(--font-ui-medium);
  }

  .authors {
    font-size: var(--font-ui-small);
    color: var(--text-muted);
  }

  .buttons {
    display: flex;
    gap: var(--size-4-1);
  }
</style>
