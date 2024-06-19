import { WeatherIcon } from "@/components"
import "./currentWeather.css"
import { useContext, useEffect, useState } from "react"
import { OptionsContext } from "@/context"
import { useTranslation } from "react-i18next";
import { CurrentWeatherData, DirectionIcons, getWeatherTranslationKey } from "@/lib";
import { getCurrentWeather } from "@/lib/weatherAPI";
import { useSearchParams } from "react-router-dom";
import CurrentWeatherTabView from "./CurrentweatherTabView";
import { Button } from "@/components/ui/button";
import LocationSearchDialog from "@/features/locations/LocationSearchDialog";
import getLinkedLocation from "@/lib/getLinkedLocation";

export function CurrentWeatherWidget(){
    const {t} = useTranslation();
    const {options} = useContext(OptionsContext);
    const {temperatureUnit, speedUnit} = options;
    const [state, setState] = useState<CurrentWeatherData | null>(null);
    const [searchParams,] = useSearchParams();
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    useEffect(()=>{
        const load = async()=>{
            // TODO: this part can be a hook
            const loc = getLinkedLocation(searchParams, options);
            const data = await getCurrentWeather(loc,options)
            if (data) data.location = loc;
            setState(data);
        }
        load();
    },[searchParams])
    return <div className="current-weather-widget transition-[font-size,transform] duration-100 text-2xl sm:text-4xl z-20">
        <div className="px-2 flex flex-col gap-2">
            <div className="hsm:self-start flex w-full">
                <span>{`${state?.location.name}`}</span> &nbsp;
                <span className="text-zinc-500">{`${new Date().toLocaleDateString()}`}</span>
                <div className="w-full"></div>
                <LocationSearchDialog></LocationSearchDialog>
            </div>
            <div className="current-weather-grid select-none">
                <WeatherIcon className="hsm:justify-self-start" width={100} height={100} weathercode={state?.weathercode ?? 1}></WeatherIcon>
                <span className="current-temperature">{r(state?.currentTemperature)}º{temperatureUnit}</span>
                <span className="current-condition hsm:justify-self-start hsm:text-left inline-block text-center whitespace-pre-line text-ellipsis w-full overflow-hidden">{t(getWeatherTranslationKey(state?.weathercode ?? 1))}</span>
                <span className="todays-min-max whitespace-nowrap hsm:justify-self-end">{r(state?.minTemperature)}º{temperatureUnit} / {r(state?.maxTemperature)}º{temperatureUnit}</span>
            </div>
            <div className="inline-status-mobile">
                <span>
                    <i className="bi-droplet-fill"></i>
                    <span>{t("percentage",{percent: state?.humidity})}</span>
                </span>
                <span className="text-[#87C1FF]">
                    <i className="bi-umbrella"></i>
                    <span>{t("percentage", {percent: state?.precipitationChance})}</span>
                </span>
                <span>
                    <i className={DirectionIcons.get(state?.windDirection ?? "NE")}></i>
                    <span>{`${state?.wind}${speedUnit}`}</span>
                </span>
            </div>
        </div>
        <CurrentWeatherTabView></CurrentWeatherTabView>
    </div>
    return <></>
}