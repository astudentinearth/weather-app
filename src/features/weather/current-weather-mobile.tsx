import { WeatherIcon } from "@/components";
import { useOptionsStore, useWeatherStore } from "@/context";
import { getWeatherTranslationKey } from "@/lib";
import { useTranslation } from "react-i18next";

export function CurrentWeatherMobile(){
    const {t} = useTranslation();
    const state = useWeatherStore((store)=>store.current);
    const temperatureUnit = useOptionsStore((store)=>store.temperatureUnit)
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    return <div className="flex flex-col m-2 p-3">
        <span className="text-foreground/50 text-sm">{`${new Date().toLocaleDateString()}`}</span>
        <div className="flex">
            <span className="text-6xl flex-shrink-0">{r(state?.currentTemperature)}º{temperatureUnit}</span>
            <div className="flex-grow"></div>
            <WeatherIcon className="flex-shrink-0" width={64} height={64} weathercode={state?.weathercode ?? 1}></WeatherIcon>
        </div>
        <div className="flex">
            <span className="text-foreground/50 text-2xl flex-shrink-0">{r(state?.minTemperature)}º{temperatureUnit} / {r(state?.maxTemperature)}º{temperatureUnit}</span>
            <div className="flex-grow"></div>
            <span className="flex-shrink-0 text-2xl">{t(getWeatherTranslationKey(state?.weathercode ?? 1))}</span>
        </div>
    </div>
}