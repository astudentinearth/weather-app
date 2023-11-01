/** Mappings for WMO interpretation codes to receive from Open-Meteo API. */

/** The prefix for icon files. */
const prefix = "icons";

/**
 * Maps a weather code to a translation key. 
 */
export const WeatherNames = new Map<number,string>([
    [0,"weather.clear"],
    [1,"weather.mainly_clear"],
    [2,"weather.partly_cloudy"],
    [3,"weather.cloudy"],
    [45,"weather.fog"],
    [48,"weather.rime"],
    [51,"weather.light_drizzle"],
    [53,"weather.moderate_drizzle"],
    [55,"weather.dense_drizzle"],
    [56,"weather.freezing_drizzle"],
    [57,"weather.dense_freezing_drizzle"],
    [61,"weather.slight_rain"],
    [63,"weather.rain"],
    [65,"weather.heavy_rain"],
    [66,"weather.freezing_rain"],
    [67,"weather.heavy_freezing_rain"],
    [71,"weather.slight_snowfall"],
    [73,"weather.snowfall"],
    [75,"weather.heavy_snowfall"],
    [77,"weather.snow_grains"],
    [80,"weather.slight_showers"],
    [81,"weather.showers"],
    [82,"weather.violent_showers"],
    [85,"weather.snow_showers"],
    [86,"weather.heavy_snow_showers"],
    [95,"weather.thunderstorm"],
    [96,"weather.thunderstorm_light_hail"],
    [99,"weather.thunderstorm_heavy_hail"],
]);

/**
 * Maps a weather code to an icon file.
 */
export const WeatherIcons = new Map<number,string>([
    [0,`${prefix}/clear.svg`],
    [1,`${prefix}/clear.svg`],
    [2,`${prefix}/partly_cloudy.svg`],
    [3,`${prefix}/overcast.svg`],
    [45,`${prefix}/fog.svg`],
    [48,`${prefix}/fog.svg`],
    [51,`${prefix}/drizzle_1.svg`],
    [53,`${prefix}/drizzle_2.svg`],
    [55,`${prefix}/drizzle_3.svg`],
    [56,`${prefix}/freezing_drizzle.svg`],
    [57,`${prefix}/dense_freezing_drizzle.svg`],
    [61,`${prefix}/rain_1.svg`],
    [63,`${prefix}/rain_2.svg`],
    [65,`${prefix}/rain_3.svg`],
    [66,`${prefix}/freezing_rain_1.svg`],
    [67,`${prefix}/freezing_rain_2.svg`],
    [71,`${prefix}/snow_1.svg`],
    [73,`${prefix}/snow_2.svg`],
    [75,`${prefix}/snow_3.svg`],
    [77,`${prefix}/snowflake.svg`],
    [80,`${prefix}/showers_1.svg`],
    [81,`${prefix}/showers_2.svg`],
    [82,`${prefix}/showers_3.svg`],
    [85,`${prefix}/snow_showers_1.svg`],
    [86,`${prefix}/snow_showers_2.svg`],
    [95,`${prefix}/storm.svg`],
    [96,`${prefix}/storm.svg`],
    [99,`${prefix}/storm.svg`],
]);

/**
 * 
 * @param code Weathercode from the API response
 * @returns An image source to the desired icon
 */
export function getIconSourceFromWeatherCode(code: number){
    const hours = new Date().getHours();
    if(hours > 18 || hours < 6){
        if (code === 0 || code === 1) return `${prefix}/clear_night.svg`;
        else if (code === 2) return `${prefix}/partly_cloudy_night.svg`;
    }
    else return WeatherIcons.get(code);
}