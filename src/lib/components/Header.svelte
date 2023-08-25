<script lang="ts">
	import { browser } from '$app/environment';
	import type { Theme } from '$lib/types';
	import { theme } from '$lib/store';

	const themes: Theme[] = ['light', 'dark', 'synthwave', 'retro', 'cyberpunk', 'valentine'];
	let selectedTheme = $theme;

	function sendFeedback() {
		if (browser) {
			window.open('mailto:urban@bandeveloper.com?subject=Running calculator feedback');
		}
	}
</script>

<header class="mb-4 md:mb-10 print:hidden w-full">
	<div class="flex w-full justify-between items-center h-full">
		<div class="flex items-center md:block max-w-xs mr-4">
			<label for="theme" class="label pl-0">
				<span class="label-text">Theme</span>
			</label>
			<select
				class="select select-bordered select-xs md:select-sm pt-0"
				id="theme"
				name="theme"
				bind:value={selectedTheme}
				on:change={() => theme.set(selectedTheme)}
			>
				{#each themes as th}
					<option value={th}>{th.toUpperCase()}</option>
				{/each}
			</select>
		</div>
		<div class="flex">
			<button on:click={sendFeedback} class="btn btn-xs md:btn-sm md:w-auto btn-outline mr-2"
				><span class="hidden md:block mr-1">Send feedback</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
					/>
				</svg>
			</button>
			<a
				href="https://github.com/banDeveloper/running-calculator"
				target="_blank"
				rel="noreferrer"
				class="btn btn-xs md:btn-sm justify-between md:w-auto btn-outline"
				><span class="hidden md:block mr-1">Contribute</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					class="w-5 h-5"
					width="20px"
					height="20px"
					viewBox="0 0 20 19"
					version="1.1"
					fill="currentColor"
				>
					<g id="surface1"
						><path
							style="fill-rule:evenodd;fill-opacity:1;"
							d="M 9.96875 0 C 4.457031 0 0 4.355469 0 9.742188 C 0 14.046875 2.855469 17.691406 6.816406 18.980469 C 7.3125 19.078125 7.492188 18.773438 7.492188 18.515625 C 7.492188 18.289062 7.476562 17.515625 7.476562 16.707031 C 4.703125 17.289062 4.125 15.546875 4.125 15.546875 C 3.679688 14.417969 3.019531 14.128906 3.019531 14.128906 C 2.113281 13.53125 3.085938 13.53125 3.085938 13.53125 C 4.09375 13.59375 4.621094 14.53125 4.621094 14.53125 C 5.511719 16.015625 6.949219 15.59375 7.527344 15.335938 C 7.609375 14.707031 7.875 14.273438 8.15625 14.03125 C 5.941406 13.804688 3.613281 12.964844 3.613281 9.226562 C 3.613281 8.160156 4.011719 7.289062 4.636719 6.613281 C 4.539062 6.371094 4.191406 5.371094 4.738281 4.03125 C 4.738281 4.03125 5.578125 3.773438 7.476562 5.03125 C 8.289062 4.820312 9.128906 4.710938 9.96875 4.710938 C 10.8125 4.710938 11.671875 4.820312 12.460938 5.03125 C 14.359375 3.773438 15.203125 4.03125 15.203125 4.03125 C 15.746094 5.371094 15.402344 6.371094 15.300781 6.613281 C 15.945312 7.289062 16.324219 8.160156 16.324219 9.226562 C 16.324219 12.964844 13.996094 13.789062 11.769531 14.03125 C 12.132812 14.335938 12.445312 14.917969 12.445312 15.835938 C 12.445312 17.144531 12.429688 18.191406 12.429688 18.515625 C 12.429688 18.773438 12.613281 19.078125 13.105469 18.980469 C 17.066406 17.691406 19.925781 14.046875 19.925781 9.742188 C 19.941406 4.355469 15.46875 0 9.96875 0 Z M 9.96875 0 "
						/></g
					>
				</svg>
			</a>
		</div>
	</div>
</header>
