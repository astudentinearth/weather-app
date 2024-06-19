import { Options } from "@/context";
import { Location } from "./WeatherData";

export default function getLinkedLocation(searchParams: URLSearchParams, options: Options){
    const latitude_str = searchParams.get("latitude");
    const longitude_str = searchParams.get("longitude");
    const loc_name = searchParams.get("name");
    const latitude = Number(latitude_str);
    const longitude = Number(longitude_str);
    let loc = options.defaultLocation;
    if(latitude_str != null && longitude_str != null && !isNaN(latitude) && !isNaN(longitude)) loc = {latitude, longitude};
    if(loc_name) loc.name=loc_name;
    return loc;
}