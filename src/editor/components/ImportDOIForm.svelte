<script lang="ts">
  import { onMount } from "svelte";

  export let onImport: (doi: string) => void;
  export let onClose: () => void;

  let doi: string = "";
  let input: HTMLInputElement;

  onMount(() => {
    input.focus();
  });
</script>

<div class="import-doi-form">
  <input
    bind:this={input}
    placeholder="DOI number"
    type="text"
    required
    bind:value={doi}
  />

  <div class="buttons">
    <button class="mod-cta" on:click={() => onImport(doi)}>Import</button>
    <button on:click={onClose}>Cancel</button>
  </div>
</div>

<style>
  .import-doi-form {
    display: flex;
    flex-direction: column;
    gap: var(--size-4-4);
  }

  input {
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: var(--size-4-3);
  }
</style>
