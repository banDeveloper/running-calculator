<script lang="ts">
	import type { Units } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ hanleOpenPrintout: null }>();

	export let splitDistance: number;
	export let splitUnit: Units;

	const allUnits: Units[] = ['kilometer', 'mile', 'meter', 'yard'];
</script>

<h3>Split times printout</h3>
<div class="flex items-center my-5">
	<label for="custom-pace">Split at</label>
	<div class="join ml-2">
		<input
			bind:value={splitDistance}
			class="join-item input input-xs md:input-sm input-bordered pr-0 md:pr-0 w-16 md:w-20"
			type="number"
			name="distance"
			id="distance"
		/>
		<select
			class="join-item select select-xs sm:select-sm select-bordered"
			id="split-unit"
			name="split-unit"
			bind:value={splitUnit}
		>
			{#each allUnits as unit}
				<option value={unit}>{unit}</option>
			{/each}
		</select>
	</div>
</div>
<button on:click={() => dispatch('hanleOpenPrintout')} class="btn btn-outline btn-xs md:btn-sm"
	>Open printout</button
>
