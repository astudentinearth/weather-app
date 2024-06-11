import Navigation from "@/features/navigation";
import { CurrentWeatherWidget } from "@/features/widgets";
import { cn } from "@/lib/utils";

export default function WeatherPage(){
    return <div className="page">
        <Navigation></Navigation>
        <div className="grid col-start-2 xl:grid-cols-[1fr_1fr] gap-2 2xl:grid-cols-[1fr_1fr_1fr]">
            <CurrentWeatherWidget></CurrentWeatherWidget>
        </div>
    </div>
}