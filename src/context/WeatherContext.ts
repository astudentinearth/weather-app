import { Dispatch, SetStateAction, createContext } from "react";
import { WeatherState } from "@/lib";

interface WeatherContextType{
    weatherState: WeatherState,
    setWeatherState: Dispatch<SetStateAction<WeatherState>>
}

export const WeatherContext = createContext<WeatherContextType>({weatherState: {} as WeatherState, setWeatherState: ()=>{}})