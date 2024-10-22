import "package:mobile/services/cache.dart";
import "package:mobile/util/misc.dart";

// ignore: constant_identifier_names
enum Direction { N, NE, E, SE, S, SW, W, NW }

enum Temperature { celsius, fahrenheit }

enum Precipitation { mm, inch }

enum Timezone { auto, local, utc }

enum Speed { kmh, mph }

extension TempEx on Temperature {
  String getSymbol() {
    return this == Temperature.celsius ? "C" : "F";
  }

  String withSign() {
    return "°${getSymbol()}";
  }
}

Direction fromDegrees(double deg) {
  if (deg < 0) deg += 360;
  var i = (deg / 45).round();
  while (i >= 8) {
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
  Location(
      {required this.latitude,
      required this.longitude,
      this.name,
      this.country,
      this.autoLocated,
      this.admins,
      this.countryCode});
  @override
  String toString() {
    return "$latitude $longitude $name, $admins, $country";
  }

  Map<String, dynamic> toJSON() => {
        "name": name,
        "country": country,
        "countryCode": countryCode,
        "latitude": latitude,
        "longitude": longitude,
        "autoLocated": autoLocated,
        "admins": admins
      };
  Location.fromJSON(Map<String, dynamic> json)
      : name = json["name"] as String?,
        country = (json['country']) as String?,
        latitude = ensureDouble(json['latitude']),
        longitude = ensureDouble(json['longitude']),
        autoLocated = (json['autoLocated']) as bool?,
        admins = (json["admins"]) as String?,
        countryCode = (json["countryCode"]) as String?;

  static List<Location> fromJSONList(List<Map<String, dynamic>> json) {
    List<Location> locations = [];
    for (var i = 0; i < json.length; i++) {
      locations.add(Location.fromJSON(json[i]));
    }
    return locations;
  }

  @override
  bool operator ==(Object other) {
    if (other is! Location) return false;
    if (name != other.name) return false;
    if (other.country != country) return false;
    if (other.latitude != latitude) return false;
    if (other.longitude != longitude) return false;
    if (other.autoLocated != autoLocated) return false;
    if (other.admins != admins) return false;
    if (other.countryCode != countryCode) return false;
    return true;
  }

  @override
  int get hashCode => Object.hash(
      name, latitude, longitude, autoLocated, admins, countryCode, country);
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

  CurrentWeatherData(
      {required this.location,
      required this.currentTemperature,
      required this.humidity,
      required this.maxTemperature,
      required this.minTemperature,
      required this.precipitationChance,
      required this.weatherCode,
      required this.windDirection,
      required this.windSpeed});

  static CurrentWeatherData fromAPIResponse(dynamic data, Location? provided) {
    return CurrentWeatherData(
        location: provided ??
            Location(latitude: data["latitude"], longitude: data["longitude"]),
        currentTemperature: ensureDouble(data["current"]["temperature_2m"]),
        humidity: ensureDouble(data["current"]["relative_humidity_2m"]),
        maxTemperature: ensureDouble(data["daily"]["temperature_2m_max"][0]),
        minTemperature: ensureDouble(data["daily"]["temperature_2m_min"][0]),
        weatherCode: (data["current"]["weather_code"]),
        windSpeed: ensureDouble(data["current"]["wind_speed_10m"]),
        windDirection:
            fromDegrees(ensureDouble(data["current"]["wind_direction_10m"])),
        precipitationChance:
            ensureDouble(data["hourly"]["precipitation_probability"][0]));
  }
}

class HourlyForecast {
  DateTime time = DateTime.now();
  double precpitationChance = 0;
  double precipitation = 0;
  double temperature = 0;
  double windSpeed = 0;
  double humidity = 0;
  int weatherCode = 0;
  Direction windDirection = Direction.N;
  HourlyForecast(
      {required this.time,
      required this.precipitation,
      required this.precpitationChance,
      required this.temperature,
      required this.windSpeed,
      required this.humidity,
      required this.weatherCode,
      required this.windDirection});
}

class HourlyWeatherData {
  List<HourlyForecast> hours = [];
  HourlyWeatherData fromAPIResponse(dynamic data) {
    var hourly = data["hourly"];
    for (var i = 0; i < (hourly["time"] as List<dynamic>).length; i++) {
      hours.add(HourlyForecast(
          time: DateTime.fromMillisecondsSinceEpoch(hourly["time"][i] * 1000),
          precipitation: ensureDouble(hourly["precipitation"][i]),
          precpitationChance:
              ensureDouble(hourly["precipitation_probability"][i]),
          temperature: ensureDouble(hourly["temperature_2m"][i]),
          windSpeed: ensureDouble(hourly["wind_speed_10m"][i]),
          humidity: ensureDouble(hourly["relative_humidity_2m"][i]),
          weatherCode: hourly["weather_code"][i],
          windDirection:
              fromDegrees(ensureDouble(hourly["wind_direction_10m"][i]))));
    }
    return this;
  }
}

class DailyForecast {
  DateTime date = DateTime.now();
  double minTemperature = 0;
  double maxTemperature = 0;
  double precipitation = 0;
  double precipitationChance = 0;
  int weatherCode = 0;
  DailyForecast(
      {required this.date,
      required this.minTemperature,
      required this.maxTemperature,
      required this.precipitation,
      required this.precipitationChance,
      required this.weatherCode});
}

class DailyWeatherData {
  List<DailyForecast> days = [];
  DailyWeatherData fromAPIResponse(dynamic data) {
    var daily = data["daily"];
    for (var i = 0; i < (daily["time"] as List<dynamic>).length; i++) {
      days.add(DailyForecast(
          date: DateTime.fromMillisecondsSinceEpoch(daily["time"][i] * 1000),
          precipitation: ensureDouble(daily["precipitation_sum"][i]),
          precipitationChance:
              ensureDouble(daily["precipitation_probability_max"][i]),
          minTemperature: ensureDouble(daily["temperature_2m_min"][i]),
          maxTemperature: ensureDouble(daily["temperature_2m_max"][i]),
          weatherCode: daily["weather_code"][i]));
    }
    return this;
  }
}

class WeatherModel {
  static Future<CurrentWeatherData> fetchCurrentWeather(
      Location location, Units units) async {
    var url =
        "https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}"
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

  static Future<HourlyWeatherData> fetchHourlyWeather(
      Location location, Units units) async {
    var url =
        "https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}"
        "&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m"
        "&temperature_unit=${units.temperature.name}&wind_speed_unit=${units.speed.name}&precipitation_unit=${units.precipitation.name}"
        "&forecast_days=2&forecast_hours=24"
        "&daily=temperature_2m_max,temperature_2m_min"
        "&timeformat=unixtime"
        "&timezone=auto";
    var response = await Cache().httpGet(url);
    var data = HourlyWeatherData().fromAPIResponse(response.data);
    return data;
  }

  static Future<DailyWeatherData> fetchDailyWeather(
      Location location, Units units) async {
    var url =
        "https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}"
        "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code"
        "&temperature_unit=${units.temperature.name}&wind_speed_unit=${units.speed.name}&precipitation_unit=${units.precipitation.name}"
        "&forecast_days=5&forecast_hours=0"
        "&timeformat=unixtime"
        "&timezone=auto";
    var response = await Cache().httpGet(url);
    var data = DailyWeatherData().fromAPIResponse(response.data);
    return data;
  }
}
