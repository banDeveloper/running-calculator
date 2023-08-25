<script lang="ts">
	import type { Calculation, UnitType, DisplayedPace } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { paceUnits } from '$lib/store';
	import { slide } from 'svelte/transition';
	import DistanceUnitButton from './DistanceUnitButton.svelte';

	const dispatch = createEventDispatcher<{
		updatePace: null;
		updateCustomPace: null;
		setPaceUnits: UnitType;
	}>();

	export let displayedPace: DisplayedPace;
	export let customPace: number;
	export let customDistance: number;
	export let calculate: Calculation;
	export let pacePer100: number;
	export let pacePer200: number;
	export let pacePer400: number;

	let customePaceEnabled = false;
</script>

<h4>Pace</h4>

<div class="sm:flex sm:items-center">
	{#if customePaceEnabled == false}
		<input
			bind:value={displayedPace.minutes}
			on:input={() => dispatch('updatePace')}
			disabled={calculate == 'pace'}
			class="input input-xs md:input-sm input-bordered rounded-r-none pr-0 md:pr-0 mr-1 w-8 md:w-12"
			type="number"
			name="pace-minutes"
			id="pace-minutes"
		/>
		<label for="pace-minutes">min</label>
		<input
			bind:value={displayedPace.seconds}
			on:input={() => dispatch('updatePace')}
			disabled={calculate == 'pace'}
			class="input input-xs md:input-sm input-bordered rounded-none pr-0 md:pr-0 mx-1 w-10 md:w-14"
			type="number"
			name="pace-seconds"
			id="pace-seconds"
		/>
		<label for="pace-seconds">sec</label>
		<div class="join items-center">
			<span class="join-item px-1">per</span>
			<DistanceUnitButton
				dispatchFunction={() => dispatch('setPaceUnits', 'metric')}
				isButtonActive={$paceUnits === 'metric'}
				name="km"
			/>
			<DistanceUnitButton
				dispatchFunction={() => dispatch('setPaceUnits', 'imperial')}
				isButtonActive={$paceUnits === 'imperial'}
				name="mi"
			/>
		</div>
	{:else}
		<input
			bind:value={customPace}
			on:input={() => dispatch('updateCustomPace')}
			disabled={calculate == 'pace'}
			class="input input-xs md:input-sm input-bordered rounded-r-none pr-0 md:pr-0 w-10 md:w-14"
			type="number"
			name="custom-pace-seconds"
			id="custom-pace-seconds"
		/>
		<label for="custom-pace-seconds" class="sm:px-1">sec</label>
		<span class="sm:pr-1">per</span>
		<input
			bind:value={customDistance}
			on:input={() => dispatch('updateCustomPace')}
			class="input input-xs md:input-sm input-bordered rounded-l-none pr-0 md:pr-0 w-16"
			type="number"
			name="custom-pace-meters"
			id="custom-pace-meters"
		/>
		<label for="custom-pace-meters" class="sm:pl-1">meters</label>
	{/if}
</div>
<p class="flex items-center">
	<label for="custom-pace">Use custom pace</label>
	<input
		type="checkbox"
		name="custom-pace"
		id="custom-pace"
		class="toggle toggle-sm ml-1"
		bind:checked={customePaceEnabled}
	/>
</p>
{#if displayedPace.seconds > 0 || displayedPace.minutes > 0}
	<p transition:slide>
		{pacePer100} s per 100 m, {pacePer200} s per 200 m, {pacePer400} s per 400 m.
	</p>
{/if}
