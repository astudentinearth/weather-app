export interface OpenMeteoAPIResponse{
    latitude: number,
    longtitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    tiemzone: string,
    timezone_abbreviation: string,
    elevation: number
}

interface BaseUnits{
    time: string,
}

// Current weather data

interface CurrentUnits extends BaseUnits{
    interval: string,
    temperature_2m: string,
    weather_code: string,
    wind_speed_10m: string,
    wind_direction_10m: string,
    relative_humidity_2m: string
}

interface CurrentData{
    time: string,
    interval: number,
    temperature_2m: number,
    weather_code: number,
    wind_speed_10m: number,
    wind_direction_10m: number,
    relative_humidity_2m: number
}

export interface OpenMeteoCurrentAPIResponse extends OpenMeteoAPIResponse{
    current_units: CurrentUnits,
    current: CurrentData
}

// Hourly weather data

interface HourlyData{
    time: string[],
    temperature_2m: number[],
    relative_humidity_2m: number[],
    precipitation_probability: number[],
    precipitation: number[],
    weather_code: number[],
    wind_speed_10m: number[],
    wind_direction_10m: number[]
}

interface HourlyUnits extends BaseUnits{
    temperature_2m: string,
    weather_code: string,
    wind_speed_10m: string,
    wind_direction_10m: string,
    relative_humidity_2m: string
    precipitation: string
}

export interface OpenMeteoHourlyAPIResponse extends OpenMeteoAPIResponse{
    hourly_units: HourlyUnits,
    hourly: HourlyData
}

// Daily weather data

interface DailyData{
    time: string[],
    weather_code: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_sum: number[],
    precipitation_probability_max: number[]
}

interface DailyUnits extends BaseUnits{
    weather_code: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    precipitation_sum: string,
    precipitation_probability_max: string
}

export interface OpenMeteoDailyAPIResponse extends OpenMeteoAPIResponse{
    daily_units: DailyUnits,
    daily: DailyData
}