<script lang="ts">
	import type { Calculation } from '$lib/types';

	export let calculate: Calculation;
	export let calculating: Calculation;
</script>

<button
	class:btn-active={calculate == calculating}
	on:click={() => (calculate = calculating)}
	class="join-item btn btn-outline btn-xs">{calculating}</button
>
