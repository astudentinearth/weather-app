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

export default function CurrentWeatherTabView(){
    const [hourlyData, setHourlyData] = useState<HourlyWeatherData | null>(null);
    const [dailyData, setDaliyData] = useState<DailyWeatherData | null>(null);
    const {options} = useContext(OptionsContext);
    const [searchParams,] = useSearchParams();
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
        <Tabs defaultValue="hourly" className={cn("bg-background/50 border-2 border-border rounded-2xl hidden sm:block")}>
            <TabsList className={cn("bg-transparent p-0")}>
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="wind">Wind</TabsTrigger>
                <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
            </TabsList>
            <TabsContent value="hourly">
                {hourlyData ? <HourlyWeatherView data={hourlyData} mode="default"></HourlyWeatherView> : "loading"}
            </TabsContent>
            <TabsContent value="daily">
                {dailyData ? <DailyWeatherView data={dailyData}></DailyWeatherView> : "loading"}
            </TabsContent>
            <TabsContent value="wind">
                {hourlyData ? <HourlyWeatherView data={hourlyData} mode="wind"></HourlyWeatherView> : "loading"}
            </TabsContent>
            <TabsContent value="precipitation">
                {hourlyData ? <HourlyWeatherView data={hourlyData} mode="precipitation"></HourlyWeatherView> : "loading"}
            </TabsContent>
        </Tabs>
        <div className="sm:hidden flex flex-col gap-2">
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">Hourly forecast</h2>
            {hourlyData ? <HourlyWeatherView mode="default" data={hourlyData}></HourlyWeatherView> : "loading"}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">Daily forecast</h2>
            {dailyData ? <DailyWeatherView data={dailyData}></DailyWeatherView> : "loading"}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">Hourly precipitation</h2>
            {hourlyData ? <HourlyWeatherView mode="precipitation" data={hourlyData}></HourlyWeatherView> : "loading"}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">Hourly wind</h2>
            {hourlyData ? <HourlyWeatherView mode="wind" data={hourlyData}></HourlyWeatherView> : "loading"}
        </div>
    </div>
}
