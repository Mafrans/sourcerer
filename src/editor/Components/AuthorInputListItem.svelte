<script lang="ts">
  import { LucideX } from "lucide-svelte";
  import { Person } from "../../Person";
  import MiniButton from "./MiniButton.svelte";

  export let author: Person;
  export let onRemove: () => void;
</script>

<li>
  <input type="text" bind:value={author.firstName} placeholder="First name" />
  <input type="text" bind:value={author.lastName} placeholder="Last name" />
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
