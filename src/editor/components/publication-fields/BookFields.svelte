<script lang="ts">
  import Input from "../input/Input.svelte";

  export let publisher: string;
  export let address: string | undefined;
  export let volume: number | undefined;
  export let series: string | undefined;
</script>

<Input label="Publisher" type="text" required bind:value={publisher} />
<Input label="Publisher address" type="text" bind:value={address} />
<Input label="Volume" type="number" bind:value={volume} />
<Input label="Series" type="text" bind:value={series} />
