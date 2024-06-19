import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import HourlyWeatherView from "./HourlyWeatherView";
import { useContext, useEffect, useState } from "react";
import { DailyWeatherData, HourlyWeatherData } from "@/lib";
import { getDailyWeather, getHourlyWeather } from "@/lib/weatherAPI";
import { OptionsContext } from "@/context";
import { useSearchParams } from "react-router-dom";
import DailyWeatherView from "./DailyWeatherView";
import getLinkedLocation from "@/lib/getLinkedLocation";
import { useTranslation } from "react-i18next";

export default function CurrentWeatherTabView(){
    const [hourlyData, setHourlyData] = useState<HourlyWeatherData | null>(null);
    const [dailyData, setDaliyData] = useState<DailyWeatherData | null>(null);
    const {options} = useContext(OptionsContext);
    const [searchParams,] = useSearchParams();
    const {t} = useTranslation();
    useEffect(()=>{
        (async ()=>{
            const loc = getLinkedLocation(searchParams, options);
            const hourly = await getHourlyWeather(loc,options)
            const daily = await getDailyWeather(loc, options);
            if (hourly) hourly.location = loc;
            if (daily) daily.location = loc;
            setHourlyData(hourly);
            setDaliyData(daily);
        })();
    }, [searchParams, options])
    return <div>
        <Tabs defaultValue="hourly" className={cn("bg-background/50 border-2 border-border rounded-2xl hidden sm:block select-none")}>
            <TabsList className={cn("bg-transparent p-0")}>
                <TabsTrigger value="hourly">{t("ui.hourly_tab")}</TabsTrigger>
                <TabsTrigger value="daily">{t("ui.daily_tab")}</TabsTrigger>
                <TabsTrigger value="wind">{t("ui.wind_tab")}</TabsTrigger>
                <TabsTrigger value="precipitation">{t("ui.precipitation_tab")}</TabsTrigger>
            </TabsList>
            <TabsContent value="hourly">
                {hourlyData ? <HourlyWeatherView data={hourlyData} mode="default"></HourlyWeatherView> : t("loading")}
            </TabsContent>
            <TabsContent value="daily">
                {dailyData ? <DailyWeatherView data={dailyData}></DailyWeatherView> : t("loading")}
            </TabsContent>
            <TabsContent value="wind">
                {hourlyData ? <HourlyWeatherView data={hourlyData} mode="wind"></HourlyWeatherView> : t("loading")}
            </TabsContent>
            <TabsContent value="precipitation">
                {hourlyData ? <HourlyWeatherView data={hourlyData} mode="precipitation"></HourlyWeatherView> : t("loading")}
            </TabsContent>
        </Tabs>
        <div className="sm:hidden flex flex-col gap-2">
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.hourly_title")}</h2>
            {hourlyData ? <HourlyWeatherView mode="default" data={hourlyData}></HourlyWeatherView> : t("loading")}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.daily_title")}</h2>
            {dailyData ? <DailyWeatherView data={dailyData}></DailyWeatherView> : t("loading")}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.precipitation_title")}</h2>
            {hourlyData ? <HourlyWeatherView mode="precipitation" data={hourlyData}></HourlyWeatherView> : t("loading")}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.wind_title")}</h2>
            {hourlyData ? <HourlyWeatherView mode="wind" data={hourlyData}></HourlyWeatherView> : t("loading")}
        </div>
    </div>
}
