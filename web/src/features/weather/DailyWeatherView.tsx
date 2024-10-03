import { WeatherIcon } from "@/components";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeatherStore } from "@/context";
import { useOptionsStore } from "@/context/use-options-store";
import { DailyWeatherData } from "@/lib";
import { useTranslation } from "react-i18next";

export default function DailyWeatherView(){
    const {t} = useTranslation();
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    const temperatureUnit = useOptionsStore((state)=>state.temperatureUnit);
    const data = useWeatherStore((state)=>state.daily)
    return <ScrollArea>
        <div className="flex w-max gap-4 pl-2 sm:p-2">
            {data ? data?.days.map((e, i)=><div className="text-2xl flex-shrink-0 w-48 flex flex-col items-center gap-2" key={i}>
                <span className="text-[#87C1FF]">{t("percentage", {percent: e.precipitationChance})}</span>
                <WeatherIcon width={64} weathercode={e.weathercode}></WeatherIcon>
                <span>{r(e.minTemperature)}º{temperatureUnit} / {r(e.maxTemperature)}º{temperatureUnit}</span>
                <span className="text-muted-foreground text-base">{e.date.toLocaleDateString([], {day: "numeric", weekday: 'short', month: "short"})}</span>
            </div>) : <DailySkeleton/>}
        </div>
        <ScrollBar orientation="horizontal"></ScrollBar>
    </ScrollArea>
}

function DailySkeleton(){
    const render = ()=>{
        const elements:JSX.Element[] = [];
        for(let i=0;i<24;i++){
            elements.push(
                <div className="flex flex-col gap-2 items-center">
                    <Skeleton className="w-12 h-4"></Skeleton>
                    <Skeleton className="w-16 h-16 rounded-full"></Skeleton>
                    <Skeleton className="w-24 h-4"></Skeleton>
                    <Skeleton className="w-16 h-2"></Skeleton>
                </div>
            )
        }
        return elements
    }
    return <div className="flex gap-2">
        {render()}
    </div>
}