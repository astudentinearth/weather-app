import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from "@/lib";
import { create } from "zustand";

type WeatherStoreType = {
    current: CurrentWeatherData | null,
    hourly: HourlyWeatherData | null,
    daily: DailyWeatherData |null
}

type WeatherStoreActions = {
    setCurrent: (current: CurrentWeatherData | null)=>void,
    setHourly: (hourly: HourlyWeatherData | null)=>void,
    setDaily: (daily: DailyWeatherData |null)=>void
}

export const useWeatherStore = create<WeatherStoreActions & WeatherStoreType>((set)=>({
    current: null,
    hourly: null,
    daily: null,
    setCurrent(current) {
        set(()=>({current}))
    },
    setHourly(hourly) {
        set(()=>({hourly}))
    },
    setDaily(daily) {
        set(()=>({daily}))
    },
}))