//import Navigation from "@/features/navigation";
import { CurrentWeatherWidget } from "@/features/widgets";
import { cn } from "@/lib/utils";

export default function WeatherPage(){
    return <div className="page flex sm:p-2 sm:justify-center sm:items-center overflow-x-hidden">
        <div className="w-full max-w-[900px]">
            <CurrentWeatherWidget></CurrentWeatherWidget>
        </div>
    </div>
}