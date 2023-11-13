import Navigation from "@/features/navigation";
import { CurrentWeatherWidget } from "@/features/widgets";

export default function WeatherPage(){
    return <div className="page">
        <Navigation></Navigation>
        <CurrentWeatherWidget></CurrentWeatherWidget>
    </div>
}