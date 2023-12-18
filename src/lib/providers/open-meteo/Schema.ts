export interface OpenMeteoAPIResponse{
    latitude: number,
    longtitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    tiemzone: string,
    timezone_abbreviation: string,
    elevation: number
}

interface CurrentUnits{
    time: string,
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