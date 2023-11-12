import { Location, WeatherState } from "./weatherData";

/** Location of İstanbul */
const _ist: Location = {
    name: "İstanbul",
    country: "Türkiye",
    latitude: 41.01384,
    longtitude: 28.94966
};

/** Fake state data for UI testing */
export const MockWeatherState: WeatherState = {
    lastFetch: new Date().getTime(),
    current: {
        weathercode: 3,
        currentTemperature: 26,
        wind: 8,
        windDirection: "S",
        humidity: 15,
        date: new Date(),
        location: _ist
    },
    today: {
        weathercode: 3,
        date: new Date(),
        location: _ist,
        minTemperature: 12,
        maxTemperature: 18
    },
    fiveDay: [1, 2, 3, 4, 5].map((n) => {
        return {
            minTemperature: 12 + n,
            maxTemperature: 32 - n,
            date: new Date(),
            location: _ist,
            weathercode: 63
        };
    }),
    hourly: Array.from({ length: 24 }, (_v, k) => k + 1).map((n) => {
        return {
            precipitationChance: 20 + n,
            temperature: 16,
            windSpeed: 24,
            windDirection: "NW",
            date: new Date(2023, 11, 14, n - 1),
            location: _ist,
            weathercode: 3
        };
    })
};
