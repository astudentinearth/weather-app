import { WeatherIcon } from "@/components"
import "./currentWeather.css"
import { useContext, useEffect, useState } from "react"
import { OptionsContext } from "@/context"
import { useTranslation } from "react-i18next";
import { CompareLocation, CurrentWeatherData, Location, getWeatherTranslationKey } from "@/lib";
import { getCurrentWeather } from "@/lib/weatherAPI";
import { useSearchParams } from "react-router-dom";
import CurrentWeatherTabView from "./CurrentweatherTabView";
import getLinkedLocation from "@/lib/getLinkedLocation";
import ViewHeader from "./ViewHeader";
import CurrentStatus from "./CurrentStatus";

export function CurrentWeatherWidget(){
    const {t, i18n} = useTranslation();
    const {options} = useContext(OptionsContext);
    const {temperatureUnit} = options;
    const [state, setState] = useState<CurrentWeatherData | null>(null);
    const [searchParams] = useSearchParams();
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    useEffect(()=>{
        const load = async()=>{
            const loc = getLinkedLocation(searchParams, options);
            const data = await getCurrentWeather(loc,options)
            if (data) data.location = loc;
            document.title = t("page_title", {degrees: `${r(data?.currentTemperature)}°${options.temperatureUnit}`, city: loc.name ?? `${loc.latitude.toFixed(4)} ${loc.longitude.toFixed(4)}`});
            setState(data);
        }
        load();
    },[searchParams, options])
    useEffect(()=>{
        if(!state) return;
        document.title = t("page_title", {degrees: `${r(state?.currentTemperature)}°${options.temperatureUnit}`, city: state.location.name ?? `${state.location.latitude.toFixed(4)} ${state.location.longitude.toFixed(4)}`});
    }, [i18n.language])
    return <div className="current-weather-widget transition-[font-size,transform] duration-100 text-2xl sm:text-4xl z-20">
        <div className="px-2 flex flex-col gap-3">
            {state ? <ViewHeader location={state?.location} isDefaultLocation={CompareLocation(state.location, options.defaultLocation)}></ViewHeader> : <></>}
            <div className="current-weather-grid select-none">
                <WeatherIcon className="hsm:justify-self-start" width={100} height={100} weathercode={state?.weathercode ?? 1}></WeatherIcon>
                <span className="current-temperature">{r(state?.currentTemperature)}º{temperatureUnit}</span>
                <span className="current-condition hsm:justify-self-start hsm:text-left inline-block text-center whitespace-pre-line text-ellipsis w-full overflow-hidden">{t(getWeatherTranslationKey(state?.weathercode ?? 1))}</span>
                <span className="todays-min-max whitespace-nowrap hsm:justify-self-end">{r(state?.minTemperature)}º{temperatureUnit} / {r(state?.maxTemperature)}º{temperatureUnit}</span>
            </div>
            {state ? <CurrentStatus precipitation={state.precipitationChance} humidity={state.humidity} direction={state.windDirection} wind={state.wind}></CurrentStatus> : <></>}
        </div>
        <CurrentWeatherTabView></CurrentWeatherTabView>
    </div>
}