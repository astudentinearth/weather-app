import {Location} from "@/lib"
import { OpenMeteoCurrentAPIResponse, OpenMeteoDailyAPIResponse, OpenMeteoHourlyAPIResponse, convertCurrentResponse, convertDailyResponse, convertHourlyResponse } from "./Schema";

export interface UnitOpts{
    temperature: "celsius" | "fahrenheit",
    speed: "kmh" | "mph",
    precipitation: "inch" | "mm"
}

const _fallbackUnits: UnitOpts = {temperature: "celsius", speed: "kmh", precipitation: "mm"}

export async function getCurrentWeather(location: Location, units?: UnitOpts){
    try {
        if(units == null) units = _fallbackUnits;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}`
        +`&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m`
        +`&temperature_unit=${units.temperature}&wind_speed_unit=${units.speed}&precipitation_unit=${units.precipitation}`;
        const response = await fetch(url,{headers: {
            "Content-Type":"application/json"
        }});
        const result = (await response.json()) as OpenMeteoCurrentAPIResponse;
        const current = convertCurrentResponse(result)
        if(current) return current;
        else throw new Error("Data wasn't received in correct format or no data was received.");
    }
    catch (error){
        let msg = "Unknown error fetching current weather data."
        if(error instanceof Error) msg = error.message;
        console.error(msg);
        window.alert(msg);
        return null;
    }
}

/**
 * 
 * @param location 
 * @param units 
 * @returns 
 */
export async function getHourlyWeather(location: Location, units?: UnitOpts) {
    try {
        if(units == null) units = _fallbackUnits;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}`
        +`&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m`
        +`&forecast_hours=24`
        +`&temperature_unit=${units.temperature}&wind_speed_unit=${units.speed}&precipitation_unit=${units.precipitation}`;
        const response = await fetch(url,{headers: {
            "Content-Type":"application/json"
        }});
        const result = await response.json() as OpenMeteoHourlyAPIResponse;
        const hourly = convertHourlyResponse(result);
        if(hourly) return hourly;
        else throw new Error("Data wasn't received in correct format or no data was received.");
    }
    catch (error){
        let msg = "Unknown error fetching hourly weather data."
        if(error instanceof Error) msg = error.message;
        console.error(msg);
        window.alert(msg);
        return null;
    }
}

export async function getDailyWeather(location: Location, units?: UnitOpts){
    try {
        if(units == null) units = _fallbackUnits;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}`
        +`&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max`
        +`&temperature_unit=${units.temperature}&wind_speed_unit=${units.speed}&precipitation_unit=${units.precipitation}`;
        const response = await fetch(url,{headers: {
            "Content-Type":"application/json"
        }});
        const result = await response.json() as OpenMeteoDailyAPIResponse;
        const daily = convertDailyResponse(result);
        if(daily) return daily;
        else throw new Error("Data wasn't received in correct format or no data was received.");
    }
    catch (error){
        let msg = "Unknown error fetching hourly weather data."
        if(error instanceof Error) msg = error.message;
        console.error(msg);
        window.alert(msg);
        return null;
    }
}