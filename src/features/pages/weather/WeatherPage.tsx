//import Navigation from "@/features/navigation";
import { CurrentWeatherWidget } from "@/features/widgets";
import { cn } from "@/lib/utils";

export default function WeatherPage(){
    return <div className="page flex p-2 justify-center items-center">
        <div className="w-full max-w-[900px]">
            <CurrentWeatherWidget></CurrentWeatherWidget>
        </div>
    </div>
}