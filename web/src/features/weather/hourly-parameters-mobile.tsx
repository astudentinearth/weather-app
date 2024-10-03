import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import HourlyWeatherView from "./HourlyWeatherView";


export function MobileHourlyParameters(){
    const {t} = useTranslation();
    return <Tabs defaultValue="wind" className="bg-background border border-border m-2 rounded-xl sm:hidden">
        <TabsList className="w-full flex p-1 gap-1 bg-background rounded-2xl">
            <TabsTrigger className="w-full data-[state=active]:bg-secondary rounded-lg text-lg py-3" value="wind">{t("ui.wind_tab")}</TabsTrigger>
            <TabsTrigger className="w-full data-[state=active]:bg-secondary rounded-lg text-lg py-3" value="precipitation">{t("ui.precipitation_tab")}</TabsTrigger>
        </TabsList>
        <TabsContent value="wind">
            <HourlyWeatherView mode="wind"></HourlyWeatherView>
        </TabsContent>
        <TabsContent value="precipitation">
            <HourlyWeatherView mode="precipitation"></HourlyWeatherView>
        </TabsContent>
    </Tabs>
}