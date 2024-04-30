<script lang="ts">
  export let onImport: (bibtex: string) => void;
  export let onClose: () => void;

  let content: string;

  function handleImport() {
    onImport(content);
  }

  function handleResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
</script>

<div class="import-bibtex">
  <textarea on:input={handleResize} bind:value={content} required></textarea>

  <div class="buttons">
    <button class="mod-cta" on:click={handleImport}>Import</button>
    <button on:click={onClose}>Close</button>
  </div>
</div>

<style>
  .import-bibtex {
    display: flex;
    flex-direction: column;
    gap: var(--size-4-3);
  }

  textarea {
    width: 100%;
    height: 100%;
    min-height: 100px;
    resize: vertical;
    font-family: var(--font-monospace);
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: var(--size-4-2);
  }
</style>
