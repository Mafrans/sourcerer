<script lang="ts">
  import { LucidePencil, LucideTrash } from "lucide-svelte";
  import { Source } from "../../Source";
  import MiniButton from "./MiniButton.svelte";
  import { Person } from "../../Person";

  export let source: Source;
  export let onEdit: (source: Source) => void;
  export let onDelete: (source: Source) => void;

  function handleEdit() {
    onEdit(source);
  }

  function handleDelete() {
    onDelete(source);
  }

  let title = source.fields.title || "No title";
  let authors = source.fields.authors ?? [];
  let authorsString = authors?.map(Person.fromObject).join(", ");
  if (authors.length > 1) {
    authorsString =
      authors.slice(0, -1).join(", ") + " and " + authors.slice(-1);
  }
</script>

<li class="source">
  <div class="content">
    <div class="title">{title}</div>
    <div class="authors">{authorsString}</div>
  </div>

  <div>
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
</style>
