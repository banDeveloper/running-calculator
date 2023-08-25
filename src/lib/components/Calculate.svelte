<script lang="ts">
	import type { Calculation } from '$lib/types';
	import CalculateButton from './CalculateButton.svelte';
	export let calculate: Calculation;
</script>

<p>
	Calculate <span class="join">
		<CalculateButton bind:calculate calculating="time" />
		<CalculateButton bind:calculate calculating="distance" />
		<CalculateButton bind:calculate calculating="pace" />
	</span>
</p>
