<script lang="ts">
  export let onSelectDOI: () => void;
  export let onSelectBibTex: () => void;
</script>

<div class="import-select">
  <button on:click={onSelectDOI}>Import from DOI number</button>
  <button on:click={onSelectBibTex}>Import BibTex citation</button>
</div>

<style>
  .import-select {
    display: flex;
    flex-direction: column;
    gap: var(--size-4-2);
  }

  button {
    width: 100%;
    text-align: center;
  }
</style>
