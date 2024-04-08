<script lang="ts">
  import { onMount } from "svelte";
  import MiniButton from "../MiniButton.svelte";
  import { LucideX } from "lucide-svelte";

  export let start: number = 0;
  export let end: number | null = null;
  export let onRemove: () => void;

  let startInput: HTMLInputElement;

  onMount(() => {
    startInput.focus();
  });
</script>

<li>
  <div class="range">
    {#if end != null}
      <span class="prefix">Between</span>
      <input bind:this={startInput} type="number" bind:value={start} />
      <span>and</span>
      <input type="number" bind:value={end} />
    {:else}
      <span class="prefix">Page</span>
      <input bind:this={startInput} type="number" bind:value={start} />
    {/if}
  </div>
  <MiniButton on:click={onRemove} icon={LucideX} />
</li>

<style>
  li {
    display: flex;
    align-items: center;
    gap: var(--size-4-2);
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
