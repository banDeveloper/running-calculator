const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const tailwindScrollbar = require('tailwind-scrollbar');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
	},

	plugins: [typography, daisyui, tailwindScrollbar],

	daisyui: {
		themes: ['light', 'dark', 'synthwave', 'retro', 'cyberpunk', 'valentine'],
	},
};

module.exports = config;
