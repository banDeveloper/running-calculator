<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { distanceUnits } from '$lib/store';

	const dispatch = createEventDispatcher();

	export let text: string;
	export let displayedDistance: number;
	export let metricDistance: number;
	export let imperialDistance: number;
	export let disabled: boolean;

	function handleClick() {
		displayedDistance = $distanceUnits === 'metric' ? metricDistance : imperialDistance;
		dispatch('clicked');
	}
</script>

<button {disabled} on:click={handleClick} class="btn btn-outline btn-xs md:btn-sm ml-2"
	>{text}</button
>
