<script lang="ts">
	import type {
		UnitType,
		Calculation,
		Distance,
		Pace,
		DisplayedPace,
		Units,
		Time,
	} from '$lib/types';

	import debounce from 'lodash-es/debounce.js';
	import { paceUnits, distanceUnits, splits } from '$lib/store';
	import TimeCompontent from '$lib/components/Time.svelte';
	import DistanceComponent from '$lib/components/Distance.svelte';
	import PaceComponent from '$lib/components/Pace.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Calculate from '$lib/components/Calculate.svelte';
	import Splits from '$lib/components/Splits.svelte';

	onMount(() => {
		const stringData = localStorage.getItem('running-calculator');
		if (stringData !== null) {
			const data: {
				time: Time;
				distance: Distance;
				displayedDistance: number;
				pace: Pace;
				displayedPace: DisplayedPace;
				customPace: number;
				customDistance: number;
				pacePer100: number;
				pacePer200: number;
				pacePer400: number;
				calculate: Calculation;
				splitUnit: Units;
				splitDistance: number;
			} = JSON.parse(stringData);
			time = data.time;
			distance = data.distance;
			displayedDistance = data.displayedDistance;
			pace = data.pace;
			displayedPace = data.displayedPace;
			customDistance = data.customDistance;
			pacePer100 = data.pacePer100;
			pacePer200 = data.pacePer200;
			pacePer400 = data.pacePer400;
			calculate = data.calculate;
			splitUnit = data.splitUnit;
			splitDistance = data.splitDistance;
		}
	});

	let time: Time = {
		hours: 0,
		minutes: 0,
		seconds: 0,
	};

	const updateLocalStorage = debounce(() => {
		localStorage.setItem(
			'running-calculator',
			JSON.stringify({
				time,
				distance,
				displayedDistance,
				pace,
				displayedPace,
				customPace,
				customDistance,
				pacePer100,
				pacePer200,
				pacePer400,
				calculate,
				splitUnit,
				splitDistance,
			})
		);
	}, 5000);

	let displayedDistance = 0;
	let distance: Distance = {
		metric: 0,
		imperial: 0,
	};

	let displayedPace: DisplayedPace = {
		minutes: 0,
		seconds: 0,
	};
	let pace: Pace = {
		metric: {
			minutes: 0,
			seconds: 0,
		},
		imperial: {
			minutes: 0,
			seconds: 0,
		},
	};

	let customPace = 0;
	let customDistance = 400;
	let pacePer100 = 0;
	let pacePer200 = 0;
	let pacePer400 = 0;

	let calculate: Calculation = 'time';

	$: canDisplayCumulative =
		displayedDistance > 0 && (time.minutes > 0 || time.seconds > 0 || time.hours > 0);

	let splitUnit: Units = 'kilometer';
	let splitDistance = 1;

	function handleReset() {
		time = {
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
		distance = {
			metric: 0,
			imperial: 0,
		};
		displayedDistance = 0;
		pace = {
			metric: {
				minutes: 0,
				seconds: 0,
			},
			imperial: {
				minutes: 0,
				seconds: 0,
			},
		};
		displayedPace = {
			minutes: 0,
			seconds: 0,
		};
		customPace = 0;
		customDistance = 400;
		pacePer100 = 0;
		pacePer200 = 0;
		pacePer400 = 0;

		updateLocalStorage();
	}

	function updateDistance(update = true) {
		if ($distanceUnits === 'metric') {
			distance = {
				metric: displayedDistance,
				imperial: Math.round(displayedDistance * 621.371192) / 1000,
			};
		} else {
			distance = {
				metric: Math.round(displayedDistance / 0.000621371192) / 1000,
				imperial: displayedDistance,
			};
		}
		if (update === true) {
			updateCalculation();
		}
		updateLocalStorage();
	}

	function updatePace(update = true) {
		if ($paceUnits === 'metric') {
			const totalSeconds = Math.round(
				(displayedPace.minutes * 60 + displayedPace.seconds) / 0.621371192
			);
			pace = {
				metric: displayedPace,
				imperial: {
					minutes: Math.floor(totalSeconds / 60),
					seconds: totalSeconds % 60,
				},
			};
		} else {
			const totalSeconds = Math.round(
				(displayedPace.minutes * 60 + displayedPace.seconds) * 0.621371192
			);
			pace = {
				metric: {
					minutes: Math.floor(totalSeconds / 60),
					seconds: totalSeconds % 60,
				},
				imperial: displayedPace,
			};
		}
		customPace =
			Math.ceil((((pace.metric.minutes * 60 + pace.metric.seconds) * customDistance) / 1000) * 10) /
			10;

		if (update === true) {
			updateCalculation();
		}
		updateSetPaces();
		updateLocalStorage();
	}

	function updateCustomPace() {
		const total = (customPace / customDistance) * 1000;
		// calculate pace from custom pace
		pace = {
			metric: {
				minutes: Math.floor(total / 60),
				seconds: Math.round((total % 60) * 10) / 10,
			},
			imperial: {
				minutes: Math.floor(total / 0.621371192 / 60),
				seconds: Math.round(((total / 0.621371192) % 60) * 10) / 10,
			},
		};

		// set displayed pace given pace units
		displayedPace = $paceUnits === 'metric' ? pace.metric : pace.imperial;

		updateCalculation();
		updateSetPaces();
		updateLocalStorage();
	}

	function setDistanceUnits(newUnits: UnitType) {
		if ($distanceUnits === newUnits) {
			return;
		}
		if ($distanceUnits === 'metric') {
			distanceUnits.set('imperial');
			displayedDistance = distance.imperial;
		} else {
			distanceUnits.set('metric');
			displayedDistance = distance.metric;
		}
		updateLocalStorage();
	}

	function handleSettingDistanceUnits({ detail }: CustomEvent<UnitType>) {
		setDistanceUnits(detail);
	}

	function handleSettingPaceUnits({ detail }: CustomEvent<UnitType>) {
		setPaceUnits(detail);
	}

	function setPaceUnits(newUnits: UnitType) {
		if ($paceUnits === newUnits) {
			return;
		}
		if ($paceUnits === 'metric') {
			paceUnits.set('imperial');
			displayedPace = pace.imperial;
		} else {
			paceUnits.set('metric');
			displayedPace = pace.metric;
		}
		updateLocalStorage();
	}

	function updateCalculation() {
		let total = 0;
		switch (calculate) {
			case 'time':
				total =
					$distanceUnits === 'metric'
						? distance.metric * (pace.metric.minutes * 60 + pace.metric.seconds)
						: distance.imperial * (pace.imperial.minutes * 60 + pace.imperial.seconds);
				time = {
					hours: Math.floor(total / 3600),
					minutes: Math.floor((total % 3600) / 60),
					seconds: Math.round((total % 60) * 10) / 10,
				};
				break;

			case 'distance':
				if (
					(time.minutes == 0 && time.seconds == 0 && time.hours == 0) ||
					(displayedPace.minutes == 0 && displayedPace.seconds == 0)
				) {
					break;
				}
				displayedDistance =
					Math.round(
						((time.hours * 3600 + time.minutes * 60 + time.seconds) /
							(pace.metric.minutes * 60 + pace.metric.seconds)) *
							1000
					) / 1000;
				updateDistance(false);
				break;

			case 'pace':
				if (displayedDistance == 0) {
					break;
				}
				total = (time.hours * 3600 + time.minutes * 60 + time.seconds) / distance.metric;
				displayedPace = {
					minutes: Math.floor(total / 60),
					seconds: Math.round((total % 60) * 10) / 10,
				};
				customPace = Math.round((((total / distance.metric) * customDistance) / 100) * 10) / 10;
				updatePace(false);
				break;
		}
		updateLocalStorage();
	}

	function updateSetPaces() {
		pacePer100 = Math.round((customPace / customDistance) * 1000) / 10;
		pacePer200 = Math.round((customPace / customDistance) * 2000) / 10;
		pacePer400 = Math.round((customPace / customDistance) * 4000) / 10;
		updateLocalStorage();
	}

	function hanleOpenPrintout() {
		if (displayedDistance === 0 || (time.minutes === 0 && time.seconds === 0 && time.hours === 0)) {
			return;
		}
		$splits = [];

		const totalSeconds = time.seconds + time.minutes * 60 + time.hours * 3600;
		let total = 0;
		let secondsPerUnit: number;

		switch (splitUnit) {
			case 'kilometer':
				secondsPerUnit = totalSeconds / (distance.metric / splitDistance);
				total = Math.floor(distance.metric / splitDistance);
				break;
			case 'mile':
				secondsPerUnit = totalSeconds / (distance.imperial / splitDistance);
				total = Math.floor(distance.imperial / splitDistance);
				break;
			case 'meter':
				secondsPerUnit = totalSeconds / (distance.metric / (splitDistance / 1000));
				total = Math.floor(distance.metric / (splitDistance / 1000));
				break;
			case 'yard':
				secondsPerUnit = totalSeconds / (distance.imperial / (splitDistance / 1760));
				total = Math.floor(distance.imperial / (splitDistance / 1760));
				break;
		}

		for (let i = 0; i < total; i++) {
			let seconds = Math.floor(((secondsPerUnit * (i + 1)) % 60) * 10) / 10;
			let minutes = Math.floor(((secondsPerUnit * (i + 1)) % 3600) / 60);
			let hours = Math.floor((secondsPerUnit * (i + 1)) / 3600);

			let time =
				hours > 0
					? hours +
					  ':' +
					  minutes.toString().padStart(2, '0') +
					  ':' +
					  seconds.toFixed(1).padStart(4, '0')
					: minutes.toString().padStart(2, '0') + ':' + seconds.toFixed(1).padStart(4, '0');

			$splits.push({
				distance: `${splitUnit.at(0)?.toUpperCase() + splitUnit.slice(1)} ${
					(i + 1) * splitDistance
				}`,
				time,
			});
		}
		updateLocalStorage();

		goto('/splits');
	}
</script>

<svelte:head>
	<title>Running calculator</title>
</svelte:head>

<h1>Running calculator</h1>

<Calculate bind:calculate />

<TimeCompontent on:updateCalculation={updateCalculation} bind:time {calculate} />
<DistanceComponent
	on:setDistanceUnits={handleSettingDistanceUnits}
	on:updateDistance={() => updateDistance()}
	bind:displayedDistance
	{calculate}
/>
<PaceComponent
	on:setPaceUnits={handleSettingPaceUnits}
	on:updateCustomPace={() => updateCustomPace()}
	on:updatePace={() => updatePace()}
	{displayedPace}
	bind:customPace
	bind:customDistance
	{calculate}
	{pacePer100}
	{pacePer200}
	{pacePer400}
/>

<button on:click={handleReset} class="btn btn-outline btn-xs md:btn-sm btn-error">Reset</button>

{#if canDisplayCumulative}
	<Splits bind:splitDistance bind:splitUnit on:hanleOpenPrintout={hanleOpenPrintout} />
{/if}
