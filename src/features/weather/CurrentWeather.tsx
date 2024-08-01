import { WeatherIcon } from "@/components";
import { Button } from "@/components/ui/button";
import { useOptionsStore } from "@/context/use-options-store";
import { useWeatherStore } from "@/context/use-weather-store";
import { CompareLocation, Location, getWeatherTranslationKey } from "@/lib";
import locate from "@/lib/geolocation";
import getLinkedLocation from "@/lib/getLinkedLocation";
import { cn } from "@/lib/utils";
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from "@/lib/weatherAPI";
import { useEffect } from "react";
import { ErrorBoundary, FallbackProps, useErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import CurrentStatus from "./CurrentStatus";
import "./currentWeather.css";
import CurrentWeatherTabView from "./CurrentweatherTabView";
import ViewHeader from "./ViewHeader";

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
    const options = useOptionsStore();
    const {temperatureUnit} = options;
    const state = useWeatherStore((store)=>store.current);
    const setCurrent = useWeatherStore((store)=>store.setCurrent);
    const setHourly = useWeatherStore((store)=>store.setHourly);
    const setDaily = useWeatherStore((store)=>store.setDaily);
    const showLoc = useOptionsStore((state)=>state.displayLocationOnTitle);
    const {showBoundary} = useErrorBoundary();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    useEffect(()=>{
        const load = async()=>{
            let loc = getLinkedLocation(searchParams, options);
            if(!searchParams.has("latitude") || !searchParams.has("longitude")){ // no location provided, ask to use geolocation API
                try{
                    const pos = await locate();
                    loc = {latitude: pos.coords.latitude, longitude: pos.coords.longitude, isAutoDetected: true} as Location;
                    navigate({
                        pathname: '/',
                        search: `?latitude=${loc.latitude}&longitude=${loc.longitude}&autoLocated=true`
                    });
                } catch{ /* empty */ }
            }
            const current = await getCurrentWeather(loc, options)
            const hourly = await getHourlyWeather(loc,options)
            const daily = await getDailyWeather(loc, options);
            if (hourly) hourly.location = loc; else showBoundary(new Error("Failed to load weather"))
            if (daily) daily.location = loc; else showBoundary(new Error("Failed to load weather"))
            if (current) current.location = loc;
            if(showLoc){
                document.title = t("page_title", {degrees: `${r(current?.currentTemperature)}°${options.temperatureUnit}`, city: loc.name ?? `${loc.latitude.toFixed(4)} ${loc.longitude.toFixed(4)}`});
            }
            else document.title = t("private_title");
            setCurrent(current);
            setHourly(hourly);
            setDaily(daily);
        }
        load();
    },[searchParams, options])

    useEffect(()=>{
        if(showLoc){
            document.title = t("page_title", {degrees: `${r(state?.currentTemperature)}°${options.temperatureUnit}`, city: state?.location.name ?? `${state?.location.latitude.toFixed(4)} ${state?.location.longitude.toFixed(4)}`});
        }
        else document.title = t("private_title");
    }, [state?.location, showLoc, options.temperatureUnit, state?.currentTemperature, t])

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