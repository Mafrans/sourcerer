<script lang="ts">
  import { LucideAmpersand } from "lucide-svelte";

  // TODO: better type for icon
  export let icon: any = LucideAmpersand;
</script>

<button on:click type="button" class="mini-button">
  <svelte:component this={icon} size={16} />
</button>

<style>
  .mini-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    box-shadow: none;
    cursor: var(--cursor);
    height: 24px;
    width: 24px;
    padding: 0 var(--size-2-2);
    border-radius: var(--radius-s);
    color: var(--text-muted);
  }

  .mini-button:hover {
    background-color: var(--background-modifier-hover);
    color: var(--text-normal);
  }
</style>
