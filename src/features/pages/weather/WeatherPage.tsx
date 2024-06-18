//import Navigation from "@/features/navigation";
import { CurrentWeatherWidget } from "@/features/widgets";

export default function WeatherPage(){
    return <div className="page flex flex-col sm:p-2 sm:justify-center sm:items-center overflow-x-hidden">
        <div className="w-full max-w-[900px]">
            <CurrentWeatherWidget></CurrentWeatherWidget>
        </div>
        <span className="text-sm text-muted-foreground text-center">
                <a className="hover:text-muted-foreground-hover transition-colors" href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
                <a className="hover:text-muted-foreground-hover transition-colors" href="https://creativecommons.org/licenses/by/4.0/"> | CC BY 4.0</a>
        </span>
    </div>
}