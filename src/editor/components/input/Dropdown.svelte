<script lang="ts">
  import { uid } from "../../../utils";

  export let label = "";
  export let value: string | number | undefined;
  export let options: Record<string, string> = {};
  const id = uid();
</script>

<div class="input-group">
  <label for={id}>{label}</label>

  <select {id} bind:value {...$$restProps}>
    {#each Object.entries(options) as [key, name]}
      <option value={key}>{name}</option>
    {/each}
  </select>
</div>

<style>
  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--size-4-4);
    padding: var(--size-4-4) 0;
    border-bottom: var(--border-width) solid var(--color-base-30);
  }

  .input-group:last-child {
    border-bottom: none;
  }
</style>
