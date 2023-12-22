import { Options } from "@/context";
import { Location } from ".";
import { OpenMeteoUnitOpts } from "./providers/open-meteo";
import OpenMeteoAPI from "./providers/open-meteo/open-meteo";

export async function getCurrentWeather(location: Location, opts: Options){
    const units: OpenMeteoUnitOpts = {
        temperature: opts.temperatureUnit==="F" ? "fahrenheit" : "celsius",
        speed: opts.speedUnit==="mph" ? "mph" : "kmh",
        precipitation: opts.precipitationUnit ?? "mm"
    }
    return await OpenMeteoAPI.getCurrentWeather(location, units);
}