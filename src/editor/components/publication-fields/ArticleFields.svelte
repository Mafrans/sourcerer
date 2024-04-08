<script lang="ts">
  import Input from "../input/Input.svelte";
  import PageRangeList from "../pages/PageRangeList.svelte";

  export let journal: string;
  export let volume: number | undefined;
  export let number: number | undefined;
  export let chapter: number | undefined;
  export let pages: [number, number | undefined][];
</script>

<Input label="Journal" type="text" required bind:value={journal} />
<Input label="Volume" type="number" bind:value={volume} />
<Input label="Number" type="number" bind:value={number} />
<Input label="Chapter" type="number" bind:value={chapter} />

<PageRangeList bind:pages />
