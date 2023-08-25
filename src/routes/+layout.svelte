<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:body class="print:bg-white" />

<main class="lg:max-w-4xl print:max-w-none mx-auto print:mx-0 prose p-2 sm:p-4 print:text-black">
	<Header />
	<slot />
</main>
