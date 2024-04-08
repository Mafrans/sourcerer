<script lang="ts">
  import { LucideX } from "lucide-svelte";
  import { Name } from "../../../names";
  import MiniButton from "../MiniButton.svelte";
  import { onMount } from "svelte";

  export let author: Name;
  export let onRemove: () => void;

  let firstNameInput: HTMLInputElement;

  onMount(() => {
    firstNameInput.focus();
  });
</script>

<li>
  <input
    bind:this={firstNameInput}
    type="text"
    bind:value={author[0]}
    placeholder="First name"
  />
  <input type="text" bind:value={author[1]} placeholder="Last name" />
  <MiniButton on:click={onRemove} icon={LucideX} />
</li>

<style>
  li {
    display: flex;
    align-items: center;
    gap: var(--size-4-2);
  }

  input {
    flex: 1;
  }
</style>
