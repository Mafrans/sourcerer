<script lang="ts">
  import Input from "../input/Input.svelte";

  export let publisher: string | undefined;
  export let address: string | undefined;
</script>

<Input label="Publisher" type="text" bind:value={publisher} />
<Input label="Publisher address" type="text" bind:value={address} />
