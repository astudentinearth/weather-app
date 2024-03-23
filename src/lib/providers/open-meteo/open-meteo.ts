import {Location} from "@/lib"
import { OpenMeteoCurrentAPIResponse, OpenMeteoDailyAPIResponse, OpenMeteoGeocodingAPIResponse, OpenMeteoHourlyAPIResponse, convertCurrentResponse, convertDailyResponse, convertHourlyResponse } from "./Schema";

export interface OpenMeteoUnitOpts{
    temperature: "celsius" | "fahrenheit",
    speed: "kmh" | "mph",
    precipitation: "inch" | "mm"
}

const _fallbackUnits: OpenMeteoUnitOpts = {temperature: "celsius", speed: "kmh", precipitation: "mm"}

async function getCurrentWeather(location: Location, units?: OpenMeteoUnitOpts){
    try {
        if(units == null) units = _fallbackUnits;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}`
        +`&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m`
        +`&hourly=precipitation_probability`
        +`&temperature_unit=${units.temperature}&wind_speed_unit=${units.speed}&precipitation_unit=${units.precipitation}`
        +`&forecast_days=2&forecast_hours=1`
        +`&daily=temperature_2m_max,temperature_2m_min`;
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
async function getHourlyWeather(location: Location, units?: OpenMeteoUnitOpts) {
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

async function getDailyWeather(location: Location, units?: OpenMeteoUnitOpts){
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
        let msg = "Unknown error fetching daily weather data."
        if(error instanceof Error) msg = error.message;
        console.error(msg);
        window.alert(msg);
        return null;
    }
}


async function locationSearch(query: string){
    try {
        const q = query.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,'');        
        if(q.length <= 1 || q.trim()=="") return [];
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=10&language=en&format=json`;
        const response = await fetch(url);
        const result = await response.json() as OpenMeteoGeocodingAPIResponse;
        if(result==null) throw new Error();
        const data = [] as Location[]
        result.results.map((n)=>{data.push({latitude: n.latitude, longitude: n.longitude, name: n.name, country: n.country} as Location)})
        return data
    } catch (error) {
        let msg = "Unknown error fetching locations."
        if(error instanceof Error) msg = error.message;
        console.error(msg);
        window.alert(msg);
        return null;
    }
}

const OpenMeteoAPI = {getCurrentWeather, getDailyWeather, getHourlyWeather, locationSearch}
export default OpenMeteoAPI;