<script lang="ts">
  import Input from "../input/Input.svelte";
  import PageRangeList from "../pages/PageRangeList.svelte";

  export let booktitle: string;
  export let publisher: string;
  export let address: string | undefined;
  export let organization: string | undefined;
  export let pages: [number, number | undefined][];
</script>

<Input label="Book title" type="text" required bind:value={booktitle} />
<Input label="Publisher" type="text" required bind:value={publisher} />
<Input label="Publisher address" type="text" bind:value={address} />
<Input label="Organization" type="text" bind:value={organization} />

<PageRangeList bind:pages />
