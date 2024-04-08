<script lang="ts">
  import Input from "../input/Input.svelte";

  export let organization: string | undefined;
  export let address: string | undefined;
  export let edition: string | undefined;
</script>

<Input label="Organization" type="text" bind:value={organization} />
<Input label="Publisher address" type="text" bind:value={address} />
<Input label="Edition" type="text" bind:value={edition} />
