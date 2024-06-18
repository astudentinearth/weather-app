import { WeatherIcon } from "@/components";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { OptionsContext } from "@/context";
import { DirectionIcons, HourlyForecast, HourlyWeatherData } from "@/lib";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function HourlyWeatherView(props: {data: HourlyWeatherData, mode: "default" | "wind" | "precipitation"}){
    const {t} = useTranslation();
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    const {options} = useContext(OptionsContext);
    const {temperatureUnit, speedUnit, precipitationUnit} = options;

    const renderHourly = (e: HourlyForecast, i:number) => 
        <div className="text-2xl flex-shrink-0 w-16 flex flex-col items-center gap-2" key={i}>
            <span className="text-[#87C1FF]">{t("percentage", {percent: e.precipitationChance})}</span>
            <WeatherIcon width={64} weathercode={e.weathercode}></WeatherIcon>
            <span>{r(e.temperature)}º{temperatureUnit}</span>
            <span className="text-muted-foreground">{e.date.toLocaleTimeString([], {hour: "2-digit", "minute": "2-digit"})}</span>
        </div>

    const renderWind = (e: HourlyForecast, i:number) =>
    <div className="text-2xl flex-shrink-0 w-18 flex flex-col items-center gap-2" key={i}>
            <i className={cn(DirectionIcons.get(e.windDirection ?? "NE"), "text-[48px]")}></i>
            <span>{r(e.windSpeed)} {speedUnit}</span>
            <span className="text-muted-foreground">{e.date.toLocaleTimeString([], {hour: "2-digit", "minute": "2-digit"})}</span>
    </div>

    const renderPrecipitation = (e: HourlyForecast, i:number) =>
    <div className="text-2xl flex-shrink-0 w-18 flex flex-col items-center gap-2" key={i}>
            <span className="text-[#87C1FF]">{t("percentage", {percent: e.precipitationChance})}</span>
            <i className={cn(e.precipitation > 0 ? "bi-droplet-half" : "bi-droplet", "text-[48px]")}></i>
            <span>{r(e.precipitation)} {precipitationUnit}</span>
            <span className="text-muted-foreground">{e.date.toLocaleTimeString([], {hour: "2-digit", "minute": "2-digit"})}</span>
    </div>

    return <ScrollArea>
        <div className="flex w-max gap-4 pl-2 sm:p-2 h-[200px] items-center">
            {props.data.hours.map((e, i)=>{
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

