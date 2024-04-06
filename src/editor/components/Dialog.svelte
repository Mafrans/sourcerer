<script lang="ts">
  export let message: string;
  export let confirm: string;
  export let deny: string;
  export let onConfirm: () => void;
  export let onDeny: () => void;
  export let preferred: "confirm" | "deny" | undefined;
</script>

<div class="dialog">
  <div>{message}</div>
  <div class="buttons">
    <button class:mod-cta={preferred === "deny"} on:click={onDeny}>
      {deny}
    </button>
    <button class:mod-cta={preferred === "confirm"} on:click={onConfirm}>
      {confirm}
    </button>
  </div>
</div>

<style>
  .dialog > *:not(:last-child) {
    margin-bottom: var(--size-4-4);
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: var(--size-4-3);
  }
</style>
