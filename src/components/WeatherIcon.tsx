import { getIconSourceFromWeatherCode } from "../lib"

interface WeatherIconProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">{
    weathercode: number
}

export default function WeatherIcon(props: WeatherIconProps){
    return <img {...props} src={getIconSourceFromWeatherCode(props.weathercode)}></img>
}