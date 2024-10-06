import "dart:convert";

import "package:http/http.dart" as http;
import "dart:developer";

import "package:mobile/services/cache.dart";
import "package:mobile/util/misc.dart";
enum Direction { N, NE, E, SE, S, SW, W, NW }
enum Temperature {celsius, fahrenheit}
enum Precipitation {mm, inch}
enum Timezone {auto, local, utc}
enum Speed {kmh, mph}

extension TempEx on Temperature{
  String getSymbol(){
    return this == Temperature.celsius ? "C" : "F";
  }
  String withSign(){
    return "°${getSymbol()}";
  }
}

Direction fromDegrees(double deg){
  if(deg<0) deg += 360;
  var i = (deg/45).round();
  while(i>=8) {
    i -= 8;
  }
  return Direction.values[i];
}

class Location {
  String? name;
  String? country;
  double latitude = 0;
  double longitude = 0;
  bool? autoLocated;
  String? admins;
  String? countryCode;
  Location({required this.latitude, required this.longitude, this.name, this.country, this.autoLocated, this.admins, this.countryCode});
  @override
  String toString() {
    return "$latitude $longitude $name, $admins, $country";
  }
}


class Units {
  Temperature temperature = Temperature.celsius;
  Precipitation precipitation = Precipitation.mm;
  Timezone timezone = Timezone.local;
  Speed speed = Speed.kmh;
  Units(this.temperature, this.speed, this.precipitation, this.timezone);
}

class CurrentWeatherData {
  Location location;
  double currentTemperature;
  double windSpeed;
  double humidity;
  Direction windDirection;
  int weatherCode;
  double minTemperature;
  double maxTemperature;
  double precipitationChance;

  CurrentWeatherData({required this.location,
    required this.currentTemperature,
    required this.humidity,
    required this.maxTemperature,
    required this.minTemperature,
    required this.precipitationChance,
    required this.weatherCode,
    required this.windDirection,
    required this.windSpeed});

  static CurrentWeatherData fromAPIResponse(dynamic data, Location? provided){
    return CurrentWeatherData(
      location: provided ?? Location(latitude: data["latitude"], longitude: data["longitude"]),
      currentTemperature: ensureDouble(data["current"]["temperature_2m"]),
      humidity: ensureDouble(data["current"]["relative_humidity_2m"]),
      maxTemperature: ensureDouble(data["daily"]["temperature_2m_max"][0]),
      minTemperature: ensureDouble(data["daily"]["temperature_2m_min"][0]),
      weatherCode: (data["current"]["weather_code"]),
      windSpeed: ensureDouble(data["current"]["wind_speed_10m"]),
      windDirection: fromDegrees(ensureDouble(data["current"]["wind_direction_10m"])),
      precipitationChance: ensureDouble(data["hourly"]["precipitation_probability"][0])
    );
  }
}


class WeatherModel{
  static Future<CurrentWeatherData> fetchCurrentWeather(Location location, Units units) async {
    var url = "https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}"
    "&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m"
    "&hourly=precipitation_probability"
    "&temperature_unit=${units.temperature.name}&wind_speed_unit=${units.speed.name}&precipitation_unit=${units.precipitation.name}"
    "&forecast_days=2&forecast_hours=1"
    "&daily=temperature_2m_max,temperature_2m_min"
    "&timeformat=unixtime"
    "&timezone=auto";
    var response = await Cache().httpGet(url);
    //log((response.data is Map).toString());
    //log(response.data.toString());
    var data = CurrentWeatherData.fromAPIResponse(response.data, location);
    return data;
  }
}