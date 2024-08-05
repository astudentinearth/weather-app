import { WeatherIcon } from "@/components";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useWeatherStore } from "@/context";
import { useOptionsStore } from "@/context/use-options-store";
import { DirectionIcons, HourlyForecast } from "@/lib";
import { Droplet } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HourlyWeatherView(props: {mode: "default" | "wind" | "precipitation"}){
    const {t, i18n} = useTranslation();
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    const temperatureUnit = useOptionsStore((state)=>state.temperatureUnit);
    const speedUnit = useOptionsStore((state)=>state.speedUnit);
    const precipitationUnit = useOptionsStore((state)=>state.precipitationUnit);
    const timezone = useOptionsStore((state)=>state.timezone);
    const data = useWeatherStore((state)=>state.hourly);

    const renderHourly = (e: HourlyForecast, i:number) => 
        <div className="text-2xl flex-shrink-0 w-18 flex flex-col items-center gap-2" key={i}>
            <span className="text-[#87C1FF]">{t("percentage", {percent: e.precipitationChance})}</span>
            <WeatherIcon width={64} weathercode={e.weathercode}></WeatherIcon>
            <span>{r(e.temperature)}º{temperatureUnit}</span>
            <span className="text-muted-foreground text-base">{(timezone === "local" ? 
                e.date.toLocaleTimeString([i18n.resolvedLanguage ?? ""], {hour: "2-digit", "minute": "2-digit"}) : 
                e.date.toLocaleTimeString([i18n.resolvedLanguage ?? ""], {hour: "2-digit", "minute": "2-digit", timeZone: "UTC"}))}</span>
        </div>

    const renderWind = (e: HourlyForecast, i:number) =>
    <div className="text-2xl flex-shrink-0 w-18 flex flex-col items-center gap-2" key={i}>
            <span className="">{t(`directions.${e.windDirection}`)}</span>
            {(()=>{
                const icon = DirectionIcons.get(e.windDirection);
                if(icon != undefined){
                    return icon(48);
                } else return <></>
            })()}
            <span>{r(e.windSpeed)} {speedUnit}</span>
            <span className="text-muted-foreground text-base">{(timezone === "local" ? 
                e.date.toLocaleTimeString([i18n.resolvedLanguage ?? ""], {hour: "2-digit", "minute": "2-digit"}) : 
                e.date.toLocaleTimeString([i18n.resolvedLanguage ?? ""], {hour: "2-digit", "minute": "2-digit", timeZone: "UTC"}))}</span>
    </div>

    const renderPrecipitation = (e: HourlyForecast, i:number) =>
    <div className="text-2xl flex-shrink-0 w-18 flex flex-col items-center gap-2" key={i}>
            <span className="text-[#87C1FF]">{t("percentage", {percent: e.precipitationChance})}</span>
            {e.precipitation > 0 ? <Droplet size={48} fill="white"/> : <Droplet size={48}/>}
            <span>{(e.precipitation)} {precipitationUnit}</span>
            <span className="text-muted-foreground text-base">{(timezone === "local" ? 
                e.date.toLocaleTimeString([i18n.resolvedLanguage ?? ""], {hour: "2-digit", "minute": "2-digit"}) : 
                e.date.toLocaleTimeString([i18n.resolvedLanguage ?? ""], {hour: "2-digit", "minute": "2-digit", timeZone: "UTC"}))}</span>
    </div>

    return <ScrollArea>
        <div className="flex w-max gap-4 pl-2 sm:p-2 h-[200px] items-center select-none">
            {data?.hours.map((e, i)=>{
                switch(props.mode){
                    case "default":
                        return renderHourly(e, i);

                    case "wind":
                        return renderWind(e, i);
                    
                    case "precipitation":
                        return renderPrecipitation(e, i);

                    default:
                        return renderHourly(e, i);
                }
            })}
        </div>
        <ScrollBar orientation="horizontal"></ScrollBar>
    </ScrollArea>
}

