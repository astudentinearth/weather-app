import { useTranslation } from "react-i18next";
import HourlyWeatherView from "./HourlyWeatherView";

export function MobileHourlyWeather(){
    const {t} = useTranslation();
    return <div className="m-2 bg-background border border-border rounded-xl pt-3 pl-2 sm:hidden">
        <span className="text-lg text-foreground/50 p-1">{t("ui.hourly_title")}</span>
        <HourlyWeatherView mode={"default"}></HourlyWeatherView>
    </div>
}