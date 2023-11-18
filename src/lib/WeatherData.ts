/**
 * An object which holds a name, country and a mathematical location. Latitude and longtitude are used to request weather data.
 */
export interface Location{
    name: string,
    country: string,
    latitude: number,
    longtitude: number
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
 * Base weather data which will be used everywhere.
 */
export interface WeatherData{
    date: Date, /** Date and time corresponding to this data */
    location: Location, /** Location corresponding to this data */
    weathercode: number, /** A code indicating the current weather, e.g. showers */
}

/**
 * Weather data to be displayed at the topmost widget, which will show current data.
 */
export interface CurrentWeatherData extends WeatherData{
    currentTemperature: number,
    wind: number,
    humidity: number,
    windDirection: Direction
}

/**
 * Data for an hour period
 */
export interface HourlyWeatherData extends WeatherData{
    precipitationChance: number,
    temperature: number,
    windSpeed: number,
    windDirection: Direction
}

/**
 * Data about an entire day
 */
export interface DailyWeatherData extends WeatherData{
    minTemperature: number,
    maxTemperature: number,
}

export interface WeatherState{
    lastFetch: number,
    current: CurrentWeatherData,
    today: DailyWeatherData,
    fiveDay: DailyWeatherData[],
    hourly: HourlyWeatherData[]
}

