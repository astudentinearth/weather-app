import React from "react"

export enum PrefActions{
    SET_TEMP_UNIT="SET_TEMP_UNIT",
    SET_SPEED_UNIT="SET_SPEED_UNIT",
    SET_TIME_FORMAT="SET_TIME_FORMAT",
    SET_DEFAULT_LOCATION="SET_DEFAULT_LOCATION",
    ADD_LOCATION="ADD_LOCATION",
    REMOVE_LOCATION="REMOVE_LOCATION"
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

/** Change default time format */
export type SetTimeFormatAction = {
    type: typeof PrefActions.SET_TIME_FORMAT,
    value: "12" | "24"
}

/** Change default location */
export type SetDefaultLocationAction = {
    type: typeof PrefActions.SET_DEFAULT_LOCATION,
    value: string
}

/** Add a new location */
export type AddLocationAction = {
    type: typeof PrefActions.ADD_LOCATION,
    value: string
}

/** Remove a location */
export type RemoveLocationAction = {
    type: typeof PrefActions.REMOVE_LOCATION,
    value: string
}

export type OptActions = SetDefaultLocationAction | SetSpeedUnitAction | SetTemperatureUnitAction | SetTimeFormatAction | AddLocationAction | RemoveLocationAction

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OptionsContextType{
    options: Options,
    dispatch: React.Dispatch<OptActions>
}

export interface Options{
    temperatureUnit: "C" | "F",
    speedUnit: "km" | "mph",
    timeFormat: "24" | "12",
    defaultLocation: string,
    locations: string[]
}

export const defaultOptions: Options = {
    temperatureUnit: "C",
    speedUnit: "km",
    timeFormat: "24",
    defaultLocation: "Istanbul",
    locations: ["Ankara", "London", "Paris"]
}

export function optionsReducer(state: Options, action: OptActions){
    const newState = {...state};
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

        case PrefActions.ADD_LOCATION: {
            if(!newState.locations.includes(action.value)) newState.locations.push(action.value);
            break
        }

        case PrefActions.REMOVE_LOCATION: {
            if(newState.locations.includes(action.value)) newState.locations.filter((val)=>val!==action.value);
            break
        }
    }
    return newState;
}

export const OptionsContext = React.createContext<OptionsContextType>({} as OptionsContextType);