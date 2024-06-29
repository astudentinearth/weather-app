/**
 * An object which holds a name, country and a mathematical location. Latitude and longitude are used to request weather data.
 */
export interface Location{
    name?: string,
    country?: string,
    latitude: number,
    longitude: number,
    isAutoDetected? : boolean
}

export function CompareLocation(l1: Location, l2: Location){
    return (l1.latitude == l2.latitude) && (l1.longitude == l2.longitude);
}

export type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"

export function degToDirection(deg: number) : Direction{
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    if(deg<0) deg += 360;
    let i = Math.round(deg/45);
    while(i>=8) i-=8;
    return directions[i] as Direction;
}

export const DirectionIcons = new Map<string, string>([
    ["N","bi-arrow-up"],
    ["NE","bi-arrow-up-left"],
    ["E","bi-arrow-right"],
    ["SE","bi-arrow-down-right"],
    ["S","bi-arrow-down"],
    ["SW","bi-arrow-down-left"],
    ["W","bi-arrow-left"],
    ["NW","bi-arrow-up-left"],
]);


/**
 * Weather data to be displayed at the topmost widget, which will show current data. Valid for 15 minutes
 */
export class CurrentWeatherData{
    constructor(
        public location: Location,
        public currentTemperature: number,
        public wind: number,
        public humidity: number,
        public windDirection: Direction,
        public weathercode: number,
        public minTemperature: number,
        public maxTemperature: number,
        public precipitationChance: number
    ){}
}

/**
 * Data for an hour period
 */
export class HourlyWeatherData{
    public hours: HourlyForecast[]=[];
    constructor(
        public location: Location
    ){}
}

export interface HourlyForecast{
    date: Date,
    precipitationChance: number,
    temperature: number,
    windSpeed: number,
    windDirection: Direction,
    weathercode: number,
    precipitation: number,
    humidity: number,
}

/**
 * Data about an entire day
 */
export class DailyWeatherData{
    public days: DailyForecast[] = [];
    constructor(
        public location: Location,
    ){}
}

export interface DailyForecast{
    date: Date;
    minTemperature: number,
    maxTemperature: number,
    weathercode: number,
    precipitation: number,
    precipitationChance: number
}