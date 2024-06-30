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
import locate from "@/lib/geolocation";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function HourlyViewFallback({error, resetErrorBoundary}: FallbackProps){
    const {t} = useTranslation();
    return <div className={cn("sm:bg-background/50 border-2 border-none sm:border-solid p-2 sm:border-border rounded-2xl bg-transparent select-text flex gap-2 flex-col items-center justify-center")}>
        <span className="text-2xl">{t("errors.something_went_wrong")}</span>
        <Button variant={"outline"} className="rounded-xl" onClick={()=>{resetErrorBoundary()}}>
            <i className="bi-arrow-clockwise "></i>
            {t("errors.retry_button")}</Button>
    </div>
}

export function CurrentWeatherWidget(){
    const {t, i18n} = useTranslation();
    const {options} = useContext(OptionsContext);
    const {temperatureUnit} = options;
    const [state, setState] = useState<CurrentWeatherData | null>(null);
    const [searchParams] = useSearchParams();
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    useEffect(()=>{
        const load = async()=>{
            let loc = getLinkedLocation(searchParams, options);
            if(!searchParams.has("latitude") || !searchParams.has("longitude")){ // no location provided, ask to use geolocation API
                try{
                    const pos = await locate();
                    loc = {latitude: pos.coords.latitude, longitude: pos.coords.longitude, isAutoDetected: true} as Location
                } catch{ /* empty */ }
            }
            const data = await getCurrentWeather(loc, options)
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
            {state ? <div className="flex flex-col">
                <ViewHeader location={state?.location} isDefaultLocation={CompareLocation(state.location, options.defaultLocation)}></ViewHeader>
                <span className="text-zinc-500 select-none sm:hidden">{`${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}`}</span>
            </div> : <></>}
            
            <div className="current-weather-grid select-none">
                <WeatherIcon className="hsm:justify-self-start" width={100} height={100} weathercode={state?.weathercode ?? 1}></WeatherIcon>
                <span className="current-temperature">{r(state?.currentTemperature)}º{temperatureUnit}</span>
                <span className="current-condition hsm:justify-self-start hsm:text-left inline-block text-center whitespace-pre-line text-ellipsis w-full overflow-hidden">{t(getWeatherTranslationKey(state?.weathercode ?? 1))}</span>
                <span className="todays-min-max whitespace-nowrap hsm:justify-self-end">{r(state?.minTemperature)}º{temperatureUnit} / {r(state?.maxTemperature)}º{temperatureUnit}</span>
            </div>
            {state ? <CurrentStatus precipitation={state.precipitationChance} humidity={state.humidity} direction={state.windDirection} wind={state.wind}></CurrentStatus> : <></>}
        </div>
        <ErrorBoundary FallbackComponent={HourlyViewFallback}>
            <CurrentWeatherTabView></CurrentWeatherTabView>
        </ErrorBoundary>
    </div>
}