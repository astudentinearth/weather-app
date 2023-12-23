import { WeatherIcon } from "@/components"
import "./currentWeather.css"
import { useContext, useEffect, useState } from "react"
import { OptionsContext } from "@/context"
import { useTranslation } from "react-i18next";
import { CurrentWeatherData, DirectionIcons, getWeatherTranslationKey } from "@/lib";
import { getCurrentWeather } from "@/lib/weatherAPI";
import { useSearchParams } from "react-router-dom";

export function CurrentWeatherWidget(){
    const {t} = useTranslation();
    const {options} = useContext(OptionsContext);
    const {temperatureUnit, speedUnit} = options;
    const [state, setState] = useState<CurrentWeatherData | null>(null);
    const [searchParams,] = useSearchParams();
    useEffect(()=>{
        const load = async()=>{
            const latitude_str = searchParams.get("latitude");
            const longitude_str = searchParams.get("longitude");
            const latitude = Number(latitude_str);
            const longitude = Number(longitude_str);
            let loc = options.defaultLocation;
            if(latitude_str != null && longitude_str != null && !isNaN(latitude) && !isNaN(longitude)) loc = {latitude, longitude};
            const data = await getCurrentWeather(loc,options)
            if (data) data.location = loc;
            setState(data);
        }
        load();
    },[])
    return <div className="current-weather-widget text-2xl">
        <span className="text-center hsm:self-start">
            <span>{`${state?.location.name}`}</span> &nbsp;
            <span className="text-zinc-500">{`${new Date().toLocaleDateString()}`}</span>
        </span>
        <div className="current-weather-grid">
            <WeatherIcon className="hsm:justify-self-start" width={100} height={100} weathercode={state?.weathercode ?? 1}></WeatherIcon>
            <span className="current-temperature">{state?.currentTemperature}º{temperatureUnit}</span>
            <span className="current-condition hsm:justify-self-start hsm:text-left inline-block text-center whitespace-pre-line text-ellipsis w-full overflow-hidden">{t(getWeatherTranslationKey(state?.weathercode ?? 1))}</span>
            <span className="todays-min-max whitespace-nowrap hsm:justify-self-end">{state?.minTemperature}º{temperatureUnit} / {state?.maxTemperature}º{temperatureUnit}</span>
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
    return <></>
}