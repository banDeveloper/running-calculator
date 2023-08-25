<script lang="ts">
	import { splits } from '$lib/store';

	let columns = 1;
	let textSize = 16;

	$: columnsCount = Math.ceil($splits.length / columns);
</script>

<svelte:head>
	<title>Splits printout</title>
</svelte:head>

<h1 class="print:hidden">Splits printout</h1>

<div class="mb-4 print:hidden">
	<label for="text-size">Text size</label>
	<input
		type="number"
		bind:value={textSize}
		class="input input-xs input-bordered pr-0 md:pr-0 w-8 md:w-12"
		name="text-size"
		id="text-size"
	/>
	<label for="columns">Columns</label>
	<input
		type="number"
		bind:value={columns}
		class="input input-xs input-bordered pr-0 md:pr-0 w-8 md:w-12"
		name="columns"
		id="columns"
	/>
</div>
<div class="mb-4 print:hidden">
	<button on:click={() => window.print()} class="btn btn-outline btn-xs md:btn-sm mr-2"
		>Open print dialog</button
	>
	<a href="/" class="btn btn-outline btn-xs md:btn-sm">Back to calculator</a>
</div>

<div class="flex">
	{#each Array(columns) as _, index}
		<div class="grid grid-cols-2 gap-x-4 w-max" style={`font-size: ${textSize}px`}>
			{#each $splits.slice(columnsCount * index, columnsCount * (index + 1)) as split}
				<span class="text-right">{split.distance}</span>
				<span>{split.time}</span>
			{/each}
		</div>
	{/each}
</div>
