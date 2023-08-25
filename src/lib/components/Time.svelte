<script lang="ts">
	import type { Calculation, Time } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ updateCalculation: null }>();

	export let time: Time;
	export let calculate: Calculation;
</script>

<h3>Time</h3>

<input
	disabled={calculate == 'time'}
	bind:value={time.hours}
	on:input={() => dispatch('updateCalculation')}
	class="input input-xs md:input-sm input-bordered rounded-r-none pr-0 md:pr-0 w-8 md:w-12"
	type="number"
	name="hours"
	id="hours"
/>
<label for="hours">hrs</label>
<input
	disabled={calculate == 'time'}
	bind:value={time.minutes}
	on:input={() => dispatch('updateCalculation')}
	class="input input-xs md:input-sm input-bordered rounded-none pr-0 md:pr-0 w-8 md:w-12"
	type="number"
	name="minutes"
	id="minutes"
/>
<label for="minutes">min</label>
<input
	disabled={calculate == 'time'}
	bind:value={time.seconds}
	on:input={() => dispatch('updateCalculation')}
	class="input input-xs md:input-sm input-bordered rounded-l-none pr-0 md:pr-0 w-10 md:w-14"
	type="number"
	name="seconds"
	id="seconds"
/>
<label for="seconds">sec</label>
