<script lang="ts">
  import Input from "../input/Input.svelte";

  export let institution: string;
  export let address: string | undefined;
  export let number: string | undefined;
</script>

<Input label="Institution" type="text" required bind:value={institution} />
<Input label="Institution Address" type="text" bind:value={address} />
<Input label="Number" type="text" bind:value={number} />
