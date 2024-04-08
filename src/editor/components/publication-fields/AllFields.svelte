<script lang="ts">
  import Input from "../input/Input.svelte";
  import PageRangeList from "../pages/PageRangeList.svelte";

  export let booktitle: string | undefined;
  export let journal: string | undefined;
  export let edition: string | undefined;
  export let volume: number | undefined;
  export let chapter: number | undefined;
  export let series: string | undefined;
  export let publisher: string | undefined;
  export let address: string | undefined;
  export let institution: string | undefined;
  export let organization: string | undefined;
  export let school: string | undefined;
  export let email: string | undefined;
  export let pages: [number, number | undefined][] = [];
</script>

<Input label="Book title" type="text" bind:value={booktitle} />
<Input label="Journal" type="text" bind:value={journal} />
<Input label="Edition" type="text" bind:value={edition} />
<Input label="Volume" type="number" bind:value={volume} />
<Input label="Chapter" type="number" bind:value={chapter} />
<Input label="Series" type="text" bind:value={series} />
<Input label="Publisher" type="text" bind:value={publisher} />
<Input label="Publisher address" type="text" bind:value={address} />
<Input label="Institution" type="text" bind:value={institution} />
<Input label="Organization" type="text" bind:value={organization} />
<Input label="School" type="text" bind:value={school} />
<Input label="Email" type="email" bind:value={email} />

<PageRangeList bind:pages />
