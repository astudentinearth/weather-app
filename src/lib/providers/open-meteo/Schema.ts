import { CurrentWeatherData, DailyForecast, DailyWeatherData, degToDirection, HourlyForecast, HourlyWeatherData, Location } from "@/lib";

export interface OpenMeteoAPIResponse{
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    tiemzone: string,
    timezone_abbreviation: string,
    elevation: number
}

interface BaseUnits{
    time: string,
}

// Current weather data

interface CurrentUnits extends BaseUnits{
    interval: string,
    temperature_2m: string,
    weather_code: string,
    wind_speed_10m: string,
    wind_direction_10m: string,
    relative_humidity_2m: string
}

interface CurrentData{
    time: string,
    interval: number,
    temperature_2m: number,
    weather_code: number,
    wind_speed_10m: number,
    wind_direction_10m: number,
    relative_humidity_2m: number
}

export interface OpenMeteoCurrentAPIResponse extends OpenMeteoAPIResponse{
    current_units: CurrentUnits,
    current: CurrentData
}

export function convertCurrentResponse(response: OpenMeteoCurrentAPIResponse){
    if(response.latitude==null || response.longitude==null || response.current==null) return null;
    const location: Location = {latitude: response.latitude, longitude: response.longitude};
    const data = new CurrentWeatherData(
        location,
        response.current.temperature_2m,
        response.current.wind_speed_10m,
        response.current.relative_humidity_2m,
        degToDirection(response.current.wind_direction_10m),
        response.current.weather_code);
    return data;
}

// Hourly weather data

interface HourlyData{
    time: string[],
    temperature_2m: number[],
    relative_humidity_2m: number[],
    precipitation_probability: number[],
    precipitation: number[],
    weather_code: number[],
    wind_speed_10m: number[],
    wind_direction_10m: number[]
}

interface HourlyUnits extends BaseUnits{
    temperature_2m: string,
    weather_code: string,
    wind_speed_10m: string,
    wind_direction_10m: string,
    relative_humidity_2m: string
    precipitation: string
}

export interface OpenMeteoHourlyAPIResponse extends OpenMeteoAPIResponse{
    hourly_units: HourlyUnits,
    hourly: HourlyData
}

export function convertHourlyResponse(response: OpenMeteoHourlyAPIResponse){
    console.log(response.latitude)
    console.log(response.longitude)
    console.log(response.hourly)
    if(response.latitude==null || response.longitude==null || response.hourly==null) return null;
    console.log("here");
    const location: Location = {latitude: response.latitude, longitude: response.longitude};
    const hours: HourlyForecast[] = [];
    for(let i=0;i<response.hourly.time.length;i++){
        const forecast:HourlyForecast = {
            date: new Date(response.hourly.time[i]),
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

interface DailyData{
    time: string[],
    weather_code: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_sum: number[],
    precipitation_probability_max: number[]
}

interface DailyUnits extends BaseUnits{
    weather_code: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    precipitation_sum: string,
    precipitation_probability_max: string
}

export interface OpenMeteoDailyAPIResponse extends OpenMeteoAPIResponse{
    daily_units: DailyUnits,
    daily: DailyData
}

export function convertDailyResponse(response: OpenMeteoDailyAPIResponse){
    if(response.latitude==null || response.longitude==null || response.daily==null) return null;
    const location: Location = {latitude: response.latitude, longitude: response.longitude};
    const days: DailyForecast[] = [];
    for(let i=0;i<response.daily.time.length;i++){
        const forecast:DailyForecast = {
            date: new Date(response.daily.time[i]),
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