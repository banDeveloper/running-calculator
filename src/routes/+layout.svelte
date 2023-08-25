<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/components/Header.svelte';
</script>

<main
	class="lg:max-w-4xl print:max-w-none mx-auto print:mx-0 prose-sm sm:prose p-2 sm:p-4 print:text-black print:bg-transparent"
>
	<Header />
	<slot />
</main>
