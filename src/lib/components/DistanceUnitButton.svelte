<script lang="ts">
	export let dispatchFunction: () => boolean;
	export let isButtonActive: boolean;
	export let name: string;
</script>

<button
	on:click={dispatchFunction}
	class:btn-active={isButtonActive}
	class="join-item btn btn-outline btn-xs md:btn-sm">{name}</button
>
