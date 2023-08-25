import { writable, type Writable } from 'svelte/store';
import type { UnitType, Theme, Cumulative } from '$lib/types';
import { browser } from '$app/environment';

export const distanceUnits: Writable<UnitType> = writable('metric');
export const paceUnits: Writable<UnitType> = writable('metric');
export const splits: Writable<Cumulative[]> = writable([]);

function getPreferedTheme(): Theme {
	return window.matchMedia('(prefers-color-scheme: dark)').matches == true ? 'dark' : 'light';
}

const initialValue = browser
	? (window.localStorage.getItem('theme') as Theme | null) ?? getPreferedTheme()
	: 'light';

function createTheme() {
	const store: Writable<Theme> = writable(initialValue);

	return {
		...store,
	};
}

export const theme: Writable<Theme> = createTheme();

theme.subscribe((value) => {
	if (browser) {
		document.documentElement.setAttribute('data-theme', value);
		window.localStorage.setItem('theme', value);
	}
});
