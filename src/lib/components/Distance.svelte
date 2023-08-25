<script lang="ts">
	import type { Calculation, UnitType } from '$lib/types';
	import DistanceButton from '$lib/components/DistanceButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import { distanceUnits } from '$lib/store';
	import DistanceUnitButton from './DistanceUnitButton.svelte';

	const dispatch = createEventDispatcher<{ updateDistance: null; setDistanceUnits: UnitType }>();

	export let displayedDistance: number;
	export let calculate: Calculation;
</script>

<h4>Distance</h4>
<div class="flex">
	<div class="join">
		<input
			bind:value={displayedDistance}
			on:input={() => dispatch('updateDistance')}
			disabled={calculate == 'distance'}
			class="join-item input input-xs md:input-sm input-bordered pr-0 md:pr-0 w-16 md:w-20"
			type="number"
			name="distance"
			id="distance"
		/>
		<DistanceUnitButton
			dispatchFunction={() => dispatch('setDistanceUnits', 'metric')}
			isButtonActive={$distanceUnits === 'metric'}
			name="km"
		/>
		<DistanceUnitButton
			dispatchFunction={() => dispatch('setDistanceUnits', 'imperial')}
			isButtonActive={$distanceUnits === 'imperial'}
			name="mi"
		/>
	</div>
	<div class="overflow-x-auto scrollbar-none">
		<div class="flex">
			<DistanceButton
				bind:displayedDistance
				on:clicked={() => dispatch('updateDistance')}
				disabled={calculate == 'distance'}
				text="Marathon"
				metricDistance={42.195}
				imperialDistance={26.219}
			/>
			<DistanceButton
				bind:displayedDistance
				on:clicked={() => dispatch('updateDistance')}
				disabled={calculate == 'distance'}
				text="Half-marathon"
				metricDistance={21.097}
				imperialDistance={13.109}
			/>
			<DistanceButton
				bind:displayedDistance
				on:clicked={() => dispatch('updateDistance')}
				disabled={calculate == 'distance'}
				text="10K"
				metricDistance={10}
				imperialDistance={6.214}
			/>
			<DistanceButton
				bind:displayedDistance
				on:clicked={() => dispatch('updateDistance')}
				disabled={calculate == 'distance'}
				text="5K"
				metricDistance={5}
				imperialDistance={3.107}
			/>
			<DistanceButton
				bind:displayedDistance
				on:clicked={() => dispatch('updateDistance')}
				disabled={calculate == 'distance'}
				text="Mile"
				metricDistance={1.609}
				imperialDistance={1}
			/>
		</div>
	</div>
</div>
