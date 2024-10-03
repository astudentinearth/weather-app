import { WeatherIcon } from "@/components";
import { useOptionsStore, useWeatherStore } from "@/context";
import { DailyForecast, getWeatherTranslationKey } from "@/lib";
import { useTranslation } from "react-i18next";

export function MobileDailyWeather(){
    const daily = useWeatherStore((state)=>state.daily);

    return <div>
        {daily?.days.map((day, i)=><MobileDailyWeatherCard key={i} data={day}></MobileDailyWeatherCard>)}
    </div>
}

function MobileDailyWeatherCard(props: {data: DailyForecast}){
    const {data} = props;
    const {t, i18n} = useTranslation();
    const temperatureUnit = useOptionsStore((state)=>state.temperatureUnit);
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    return <div className="flex pl-4 items-center bg-background border border-border m-2 rounded-xl h-16 gap-4 sm:hidden">
        <WeatherIcon width={36} height={36} weathercode={data.weathercode}></WeatherIcon>
        <div className="flex flex-col">
            <span className="text-lg leading-6">{data.date.toLocaleDateString([i18n.resolvedLanguage ?? ""], {weekday: "long", month: "long", day: "numeric"})}</span>
            <span className="text-lg text-foreground/50 leading-5">{t(getWeatherTranslationKey(data?.weathercode ?? 1))} | {r(data?.minTemperature)}º{temperatureUnit} / {r(data?.maxTemperature)}º{temperatureUnit}</span>
        </div>
    </div>
}