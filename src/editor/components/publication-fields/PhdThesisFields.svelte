<script lang="ts">
  import Input from "../input/Input.svelte";

  export let school: string;
  export let address: string | undefined;
</script>

<Input label="School" type="text" required bind:value={school} />
<Input label="School address" type="text" bind:value={address} />
