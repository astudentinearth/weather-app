import { CompareLocation, Location } from "@/lib";
import {create} from "zustand"
import {persist} from "zustand/middleware"

/** Location of İstanbul */
const _ist: Location = {
    name: "Istanbul",
    country: "Türkiye",
    latitude: 41.01384,
    longitude: 28.94966
};

export interface Options{
    temperatureUnit: "C" | "F",
    speedUnit: "km" | "mph",
    timeFormat: "24" | "12",
    precipitationUnit: "mm" | "inch"
    defaultLocation: Location,
    locations: Location[],
    timezone: "auto" | "local" | "utc",
    displayLocationOnTitle: boolean
}

type OptionsStoreActions = {
    setTemperatureUnit: (val: "C" | "F")=>void,
    setSpeedUnit: (val: "km" | "mph")=>void,
    setPrecipitationUnit: (val: "mm" | "inch")=>void,
    setTimeFormat: (val: "12" | "24")=>void,
    setDefaultLocation: (val: Location)=>void,
    addLocation: (val: Location)=>void,
    removeLocation: (val: Location)=>void,
    setTimezone: (val: "auto" | "local" | "utc")=>void,
    setDisplayLocationOnTitle: (val: boolean)=>void,
    overwrite: (val: Options)=>void,
}

export const useOptionsStore = create(
    persist<Options & OptionsStoreActions>((set, get)=>({
        temperatureUnit: "C",
        speedUnit: "km",
        timeFormat: "24",
        defaultLocation: _ist,
        precipitationUnit: "mm",
        locations: [],
        timezone: "auto",
        displayLocationOnTitle: false,
        setTemperatureUnit(val) {
            return set({...get(), temperatureUnit: val})
        },
        setSpeedUnit(val) {
            return set({...get(), speedUnit: val})
        },
        setPrecipitationUnit(val) {
            return set({...get(), precipitationUnit: val})
        },
        setTimeFormat(val) {
            return set({...get(), timeFormat: val})
        },
        setDefaultLocation(val) {
            return set({...get(), defaultLocation: val})
        },
        addLocation(val) {
            const l =[...get().locations];
            let exists = false;
            for(const i in l){
                if(CompareLocation(l[i], val)) exists = true;
            }
            if(!exists) l.push(val);
            set({locations: l});
        },
        removeLocation(val) {
            let l = [...get().locations];
            l = l.filter((n)=>!CompareLocation(n, val));
            set({locations: l});
        },
        setTimezone(val) {
            return set({...get(), timezone: val})
        },
        overwrite(val) {
            return set({...val})
        },
        setDisplayLocationOnTitle(val) {
            return set({displayLocationOnTitle: val})
        },
    }), {name: "prefs", version: 1})
)