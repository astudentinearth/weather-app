import { Location } from "@/lib"
import React from "react"

/** Location of İstanbul */
const _ist: Location = {
    name: "Istanbul",
    country: "Türkiye",
    latitude: 41.01384,
    longitude: 28.94966
};


export enum PrefActions{
    SET_TEMP_UNIT="SET_TEMP_UNIT",
    SET_SPEED_UNIT="SET_SPEED_UNIT",
    SET_TIME_FORMAT="SET_TIME_FORMAT",
    SET_DEFAULT_LOCATION="SET_DEFAULT_LOCATION",
    ADD_LOCATION="ADD_LOCATION",
    REMOVE_LOCATION="REMOVE_LOCATION",
    SET_PRECIPITATION_UNIT="SET_PRECIPITATION_UNIT",
    SET_OPTIONS="SET_OPTIONS",
    SET_TIMEZONE="SET_TIMEZONE"
}

/** Change default temperature unit */
export type SetTemperatureUnitAction = {
    type: typeof PrefActions.SET_TEMP_UNIT,
    value: "C" | "F"
}

/** Change default speed unit */
export type SetSpeedUnitAction = {
    type: typeof PrefActions.SET_SPEED_UNIT,
    value: "km" | "mph"
}

/** Change default speed unit */
export type SetPrecipitationUnitAction = {
    type: typeof PrefActions.SET_PRECIPITATION_UNIT,
    value: "mm" | "inch"
}

/** Change default time format */
export type SetTimeFormatAction = {
    type: typeof PrefActions.SET_TIME_FORMAT,
    value: "12" | "24"
}

/** Change default location */
export type SetDefaultLocationAction = {
    type: typeof PrefActions.SET_DEFAULT_LOCATION,
    value: Location
}

/** Add a new location */
export type AddLocationAction = {
    type: typeof PrefActions.ADD_LOCATION,
    value: Location
}

/** Remove a location */
export type RemoveLocationAction = {
    type: typeof PrefActions.REMOVE_LOCATION,
    value: Location
}

export type SetOptionsAction = {
    type: typeof PrefActions.SET_OPTIONS,
    value: Options
}

export type SetTimezoneAction = {
    type: typeof PrefActions.SET_TIMEZONE,
    value: "auto" | "local" | "utc"
}

export type OptActions = SetDefaultLocationAction | SetSpeedUnitAction | SetTemperatureUnitAction | SetTimeFormatAction | AddLocationAction | RemoveLocationAction | SetPrecipitationUnitAction | SetOptionsAction | SetTimezoneAction

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OptionsContextType{
    options: Options,
    dispatch: React.Dispatch<OptActions>
}

export interface Options{
    temperatureUnit: "C" | "F",
    speedUnit: "km" | "mph",
    timeFormat: "24" | "12",
    precipitationUnit: "mm" | "inch"
    defaultLocation: Location,
    locations: Location[],
    timezone: "auto" | "local" | "utc"
}

export const defaultOptions: Options = {
    temperatureUnit: "C",
    speedUnit: "km",
    timeFormat: "24",
    defaultLocation: _ist,
    precipitationUnit: "mm",
    locations: [],
    timezone: "auto"
}

export function optionsReducer(state: Options, action: OptActions){
    let newState = {...state};
    switch(action.type){
        case PrefActions.SET_TEMP_UNIT:
            newState.temperatureUnit = action.value;
            break;
        
        case PrefActions.SET_TIME_FORMAT:
            newState.timeFormat = action.value;
            break;

        case PrefActions.SET_DEFAULT_LOCATION:
            newState.defaultLocation = action.value;
            break;

        case PrefActions.SET_SPEED_UNIT:
            newState.speedUnit = action.value;
            break;

        case PrefActions.SET_PRECIPITATION_UNIT:
            newState.precipitationUnit = action.value;
            break;
            
        case PrefActions.ADD_LOCATION: {
            if(!newState.locations.includes(action.value)) newState.locations.push(action.value);
            break
        }

        case PrefActions.REMOVE_LOCATION: {
            if(newState.locations.includes(action.value)) newState.locations.filter((val)=>val!==action.value);
            break;
        }

        case PrefActions.SET_OPTIONS:{
            const val = action.value;
            newState = {
                temperatureUnit: val.temperatureUnit ?? "C",
                speedUnit: val.speedUnit ?? "km",
                timeFormat: val.timeFormat ?? "24",
                defaultLocation: val.defaultLocation ?? _ist,
                precipitationUnit: val.precipitationUnit ?? "mm",
                locations: val.locations ?? [],
                timezone: val.timezone ?? "auto"
            } as Options;
            break;
        }

        case PrefActions.SET_TIMEZONE:{
            newState.timezone = action.value;
            break;
        }
    }
    localStorage.setItem("options", JSON.stringify(newState));
    return newState;
}

export const OptionsContext = React.createContext<OptionsContextType>({} as OptionsContextType);