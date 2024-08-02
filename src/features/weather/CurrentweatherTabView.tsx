import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeatherStore } from "@/context/use-weather-store";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import DailyWeatherView from "./DailyWeatherView";
import HourlyWeatherView from "./HourlyWeatherView";

export default function CurrentWeatherTabView(){
    const hourly = useWeatherStore((store)=>store.hourly);
    const daily = useWeatherStore((store)=>store.daily);
    const {t} = useTranslation();
    return <div>
        <Tabs defaultValue="hourly" className={cn("bg-secondary/25 border border-border rounded-2xl hidden sm:block select-none")}>
            <TabsList className={cn("bg-transparent p-0")}>
                <TabsTrigger value="hourly">{t("ui.hourly_tab")}</TabsTrigger>
                <TabsTrigger value="daily">{t("ui.daily_tab")}</TabsTrigger>
                <TabsTrigger value="wind">{t("ui.wind_tab")}</TabsTrigger>
                <TabsTrigger value="precipitation">{t("ui.precipitation_tab")}</TabsTrigger>
            </TabsList>
            <TabsContent value="hourly">
                {hourly ? <HourlyWeatherView mode="default"></HourlyWeatherView> : t("loading")}
            </TabsContent>
            <TabsContent value="daily">
                {daily ? <DailyWeatherView data={daily}></DailyWeatherView> : t("loading")}
            </TabsContent>
            <TabsContent value="wind">
                {hourly ? <HourlyWeatherView mode="wind"></HourlyWeatherView> : t("loading")}
            </TabsContent>
            <TabsContent value="precipitation">
                {hourly ? <HourlyWeatherView mode="precipitation"></HourlyWeatherView> : t("loading")}
            </TabsContent>
        </Tabs>
        <div className="sm:hidden flex flex-col gap-2">
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.hourly_title")}</h2>
            {hourly ? <HourlyWeatherView mode="default"></HourlyWeatherView> : t("loading")}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.daily_title")}</h2>
            {daily ? <DailyWeatherView data={daily}></DailyWeatherView> : t("loading")}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.precipitation_title")}</h2>
            {hourly ? <HourlyWeatherView mode="precipitation" ></HourlyWeatherView> : t("loading")}
            <hr className="bg-muted-foreground border-0 h-[2px] mx-2"></hr>
            <h2 className="text-muted-foreground-hover p-2">{t("ui.wind_title")}</h2>
            {hourly ? <HourlyWeatherView mode="wind"></HourlyWeatherView> : t("loading")}
        </div>
    </div>
}
