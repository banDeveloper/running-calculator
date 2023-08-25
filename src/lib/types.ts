export type UnitType = 'metric' | 'imperial';

export type Units = 'kilometer' | 'mile' | 'meter' | 'yard';

export type Calculation = 'time' | 'pace' | 'distance';

export type Distance = {
	metric: number;
	imperial: number;
};

export type DisplayedPace = {
	minutes: number;
	seconds: number;
};

export type Pace = {
	metric: DisplayedPace;
	imperial: DisplayedPace;
};

export type Time = {
	hours: number;
	minutes: number;
	seconds: number;
};

export type Theme = 'light' | 'dark' | 'synthwave' | 'retro' | 'cyberpunk' | 'valentine';

export type Cumulative = {
	distance: string;
	time: string;
};
