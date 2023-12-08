import {CurrentWeatherData, Location, degToDirection} from "@/lib"

export interface UnitOpts{
    temperature: "C" | "F",
    speed: "km" | "mph",
    precipitation: "in" | "mm"
}

const _fallbackUnits: UnitOpts = {temperature: "C", speed: "km", precipitation: "mm"}

export async function getCurrentWeather(location: Location, units?: UnitOpts){
    try {
        if(units == null) units = _fallbackUnits;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longtitude}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m`;
        const response = await fetch(url,{headers: {
            "Content-Type":"application/json"
        }});
        const result = await response.json();
        const current: CurrentWeatherData = {
            date: new Date(result.current.time),
            currentTemperature: result.current.temperature_2m,
            weathercode: result.current.weathercode,
            wind: result.current.wind_speed_10m,
            windDirection: degToDirection(result.current.wind_direction_10m),
            humidity: result.current.relative_humidity_2m,
            location
        }
        return current;
    }
    catch (error){
        let msg = "Unknown error fetching current weather data."
        if(error instanceof Error) msg = error.message;
        console.error(msg);
        window.alert(msg);
        return null;
    }
}