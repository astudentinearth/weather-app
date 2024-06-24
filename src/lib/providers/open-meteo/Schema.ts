import { CurrentWeatherData, DailyForecast, DailyWeatherData, degToDirection, HourlyForecast, HourlyWeatherData, Location } from "@/lib";

/** Base parameters for open-meteo API responses */
export interface OpenMeteoAPIResponse{
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    tiemzone: string,
    timezone_abbreviation: string,
    elevation: number
}

/** Base fields present on all unit objects */
interface BaseUnits{
    time: string,
}

// Current weather data

/** Units for current weather responses */
interface CurrentUnits extends BaseUnits{
    interval: string,
    temperature_2m: string,
    weather_code: string,
    wind_speed_10m: string,
    wind_direction_10m: string,
    relative_humidity_2m: string
}

/** Data in current weather responses */
interface CurrentData{
    time: string,
    interval: number,
    temperature_2m: number,
    weather_code: number,
    wind_speed_10m: number,
    wind_direction_10m: number,
    relative_humidity_2m: number
}

/** Combined current weather API response object */
export interface OpenMeteoCurrentAPIResponse extends OpenMeteoAPIResponse{
    current_units: CurrentUnits,
    current: CurrentData,
    daily_units: {time: string, temperature_2m_min: string, temperature_2m_max: string},
    daily: {time: string[], temperature_2m_min: number[], temperature_2m_max: number[]},
    hourly_units: {time:string, precipitation_probability: string},
    hourly: {time: string[], precipitation_probability: number[]}
}

/** Converts a current weather response to `CurrentWeatherData` which can be rendered on the frontend */
export function convertCurrentResponse(response: OpenMeteoCurrentAPIResponse){
    if(response.latitude==null || response.longitude==null || response.current==null) return null;
    const location: Location = {latitude: response.latitude, longitude: response.longitude};
    const minTemperature = response.daily.temperature_2m_min[1];
    const maxTemperature = response.daily.temperature_2m_max[0];
    const data = new CurrentWeatherData(
        location,
        response.current.temperature_2m,
        response.current.wind_speed_10m,
        response.current.relative_humidity_2m,
        degToDirection(response.current.wind_direction_10m),
        response.current.weather_code,
        minTemperature, maxTemperature,
        response.hourly.precipitation_probability[0]);
    return data;
}

// Hourly weather data

/** Data in hourly weather responses */
interface HourlyData{
    time: number[],
    temperature_2m: number[],
    relative_humidity_2m: number[],
    precipitation_probability: number[],
    precipitation: number[],
    weather_code: number[],
    wind_speed_10m: number[],
    wind_direction_10m: number[]
}

/** Corresponding units for hourly weather data */
interface HourlyUnits extends BaseUnits{
    temperature_2m: string,
    weather_code: string,
    wind_speed_10m: string,
    wind_direction_10m: string,
    relative_humidity_2m: string
    precipitation: string
}

/** Combined hourly weather response object */
export interface OpenMeteoHourlyAPIResponse extends OpenMeteoAPIResponse{
    hourly_units: HourlyUnits,
    hourly: HourlyData
}

/** Converts hourly weather responses to `HourlyWeatherData` */
export function convertHourlyResponse(response: OpenMeteoHourlyAPIResponse, utc_offset: number){
    if(response.latitude==null || response.longitude==null || response.hourly==null) return null;
    const location: Location = {latitude: response.latitude, longitude: response.longitude};
    const hours: HourlyForecast[] = [];
    for(let i=0;i<response.hourly.time.length;i++){
        console.log(response.hourly.time[i] * 1000);
        const forecast:HourlyForecast = {
            date: new Date((response.hourly.time[i] + utc_offset) * 1000),
            temperature: response.hourly.temperature_2m[i],
            humidity: response.hourly.relative_humidity_2m[i],
            precipitationChance: response.hourly.precipitation_probability[i],
            precipitation: response.hourly.precipitation[i],
            weathercode: response.hourly.weather_code[i],
            windSpeed: response.hourly.wind_speed_10m[i],
            windDirection: degToDirection(response.hourly.wind_direction_10m[i])
        };
        hours.push(forecast);
    }
    const data: HourlyWeatherData = {location, hours};
    return data;
}

// Daily weather data

/** Data in 7-day weather responses */
interface DailyData{
    time: number[],
    weather_code: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_sum: number[],
    precipitation_probability_max: number[]
}

/** Units in 7-day weather responses */
interface DailyUnits extends BaseUnits{
    weather_code: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    precipitation_sum: string,
    precipitation_probability_max: string
}

/** Combined daily weather response object */
export interface OpenMeteoDailyAPIResponse extends OpenMeteoAPIResponse{
    daily_units: DailyUnits,
    daily: DailyData
}

/** Converts daily weather responses to `DailyWeatherData` */
export function convertDailyResponse(response: OpenMeteoDailyAPIResponse){
    if(response.latitude==null || response.longitude==null || response.daily==null) return null;
    const location: Location = {latitude: response.latitude, longitude: response.longitude};
    const days: DailyForecast[] = [];
    for(let i=0;i<response.daily.time.length;i++){
        const forecast:DailyForecast = {
            date: new Date(response.daily.time[i] * 1000),
            maxTemperature: response.daily.temperature_2m_max[i],
            minTemperature: response.daily.temperature_2m_min[i],
            precipitationChance: response.daily.precipitation_probability_max[i],
            precipitation: response.daily.precipitation_sum[i],
            weathercode: response.daily.weather_code[i],
        };
        days.push(forecast);
    }
    const data: DailyWeatherData = {location, days};
    return data;
}

// Geocoding
/** Response interface for geocoding API */
export interface OpenMeteoGeocodingAPIResponse{
    results: OpenMeteoLocation[]
}

/** Location result object */
interface OpenMeteoLocation{
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    country_code: number,
    country: string,
    timezone: string
}