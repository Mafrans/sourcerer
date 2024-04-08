<script lang="ts">
  import Input from "../input/Input.svelte";

  export let address: string | undefined;
</script>

<Input label="Publisher address" type="text" bind:value={address} />
