import { getIconSourceFromWeatherCode } from "../lib"

interface WeatherIconProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">{
    /** A WMO interpretation code */
    weathercode: number 
}

/** An image with an icon for the received weather data. Replaces src attribute with a weather code.
 */
export default function WeatherIcon(props: WeatherIconProps){
    return <img {...props} src={getIconSourceFromWeatherCode(props.weathercode)}></img>
}