import { Options } from "@/context";

/** Checks URL search parameters to get location information 
 * @returns the location in search parameters, or the default location if parameters are incorrect
*/
export default function getLinkedLocation(searchParams: URLSearchParams, options: Options){
    const latitude_str = searchParams.get("latitude");
    const longitude_str = searchParams.get("longitude");
    const auto = searchParams.get("autoLocated");
    const loc_name = searchParams.get("name");
    const latitude = Number(latitude_str);
    const longitude = Number(longitude_str);
    let loc = options.defaultLocation;
    if(latitude_str != null && longitude_str != null && !isNaN(latitude) && !isNaN(longitude)) loc = {latitude, longitude, isAutoDetected: !!auto};
    if(loc_name) loc.name=loc_name;
    return loc;
}