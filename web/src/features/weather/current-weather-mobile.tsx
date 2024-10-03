import { WeatherIcon } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { useOptionsStore, useWeatherStore } from "@/context";
import { getWeatherTranslationKey } from "@/lib";
import { useTranslation } from "react-i18next";

export function CurrentWeatherMobile(){
    const {t, i18n} = useTranslation();
    const state = useWeatherStore((store)=>store.current);
    const temperatureUnit = useOptionsStore((store)=>store.temperatureUnit)
    const r = (n?: number) => Math.round(n ?? 0); // shorthand for rounding
    return <div className="flex sm:hidden flex-col m-2 p-3">
        {state ? <span className="text-foreground/50 text-sm">{`${new Date().toLocaleDateString([i18n.resolvedLanguage ?? ""], {month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"})}`}</span> : <Skeleton className="h-5 w-32 flex-shrink-0"/>}
        <div className="flex">
            {state ? <span className="text-6xl flex-shrink-0">{r(state?.currentTemperature)}º{temperatureUnit}</span> : <Skeleton className="w-24 h-12 mt-2"/>}
            <div className="flex-grow"></div>
            {state ? <WeatherIcon className="flex-shrink-0" width={64} height={64} weathercode={state?.weathercode ?? 1}></WeatherIcon> : <Skeleton className="w-16 h-16 rounded-full"/>}
        </div>
        <div className="flex">
            {state ? <span className="text-foreground/50 text-2xl flex-shrink-0">{r(state?.minTemperature)}º{temperatureUnit} / {r(state?.maxTemperature)}º{temperatureUnit}</span> : <Skeleton className="h-6 w-24 flex-shrink-0 mt-2"/>}
            <div className="flex-grow"></div>
            {state ? <span className="flex-shrink-0 text-2xl">{t(getWeatherTranslationKey(state?.weathercode ?? 1))}</span> : <Skeleton className="h-6 w-24 flex-shrink-0 mt-2"/>}
        </div>
    </div>
}