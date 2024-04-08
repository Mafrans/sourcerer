<script lang="ts">
  import { LucideChevronDown, LucideChevronRight } from "lucide-svelte";

  export let title: string;
  export let hasPadding: boolean = true;
  export let icon: any = null;
</script>

<details class="container">
  <summary>
    {#if icon}
      <svelte:component this={icon} size={16} />
    {:else}
      <div class="icon-open">
        <LucideChevronDown size={16} />
      </div>
      <div class="icon-closed">
        <LucideChevronRight size={16} />
      </div>
    {/if}
    <svelte:component this={icon} size={16} />
    {title}
  </summary>

  <div class="panel" class:hasPadding>
    <slot />
  </div>
</details>

<style>
  .container {
    padding: var(--size-4-4) 0;
    border-bottom: var(--border-width) solid var(--color-base-30);
  }

  .container:last-child {
    border-bottom: none;
  }

  summary {
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    height: 30px;
    gap: var(--size-4-2);
    font-size: var(--font-ui-medium);
  }

  summary:focus-visible {
    border-radius: var(--radius-s);
    box-shadow: 0 0 0 1.5px var(--background-modifier-border-focus);
  }

  .container[open] > summary {
    margin-bottom: var(--size-4-3);
  }

  .icon-open {
    display: none;
  }

  .icon-closed {
    display: inline-flex;
  }

  .container[open] > summary > .icon-closed {
    display: none;
  }

  .container[open] > summary > .icon-open {
    display: inline-flex;
  }

  .panel {
    padding: 0 var(--size-4-3);
    border: var(--border-width) solid var(--color-base-30);
    border-radius: var(--radius-s);
  }

  .panel.hasPadding {
    padding: var(--size-4-4) var(--size-4-3);
  }
</style>
