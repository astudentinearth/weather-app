import { WeatherIcon } from "@/components"
import "./currentWeather.css"
import { useContext } from "react"
import { OptionsContext, WeatherContext } from "@/context"
import { useTranslation } from "react-i18next";
import { DirectionIcons, getWeatherTranslationKey } from "@/lib";

export function CurrentWeatherWidget(){
    const { weatherState } = useContext(WeatherContext);
    const {t} = useTranslation();
    const {options} = useContext(OptionsContext);
    const {temperatureUnit, speedUnit} = options;
    const {currentTemperature, wind, windDirection, weathercode, humidity} = weatherState.current;
    const {minTemperature, maxTemperature} = weatherState.today;
    const {precipitationChance} = weatherState.hourly[new Date().getHours()]
    return <div className="current-weather-widget text-2xl">
        <span className="text-center hsm:self-start">
            <span>{`${weatherState.current.location.name}`}</span> &nbsp;
            <span className="text-zinc-500">{`${weatherState.current.date.toLocaleDateString()}`}</span>
        </span>
        <div className="current-weather-grid">
            <WeatherIcon className="hsm:justify-self-start" width={100} height={100} weathercode={weathercode}></WeatherIcon>
            <span className="current-temperature">{currentTemperature}º{temperatureUnit}</span>
            <span className="current-condition hsm:justify-self-start hsm:text-left inline-block text-center whitespace-pre-line text-ellipsis w-full overflow-hidden">{t(getWeatherTranslationKey(weathercode))}</span>
            <span className="todays-min-max whitespace-nowrap hsm:justify-self-end">{minTemperature}º{temperatureUnit} / {maxTemperature}º{temperatureUnit}</span>
        </div>
        <div className="inline-status-mobile">
            <span>
                <i className="bi-droplet-fill"></i>
                <span>{t("percentage",{percent: humidity})}</span>
            </span>
            <span className="text-[#87C1FF]">
                <i className="bi-umbrella"></i>
                <span>{t("percentage", {percent: precipitationChance})}</span>
            </span>
            <span>
                <i className={DirectionIcons.get(windDirection)}></i>
                <span>{`${wind}${speedUnit}`}</span>
            </span>
        </div>
    </div>
}