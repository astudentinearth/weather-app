import 'package:flutter/material.dart';
import 'package:mobile/services/weather_service.dart';

class WeatherViewModel extends ChangeNotifier {
  CurrentWeatherData _current = CurrentWeatherData(
      location:
          Location(latitude: 41.01384, longitude: 28.94966, name: "Istanbul"),
      currentTemperature: 6,
      humidity: 12,
      maxTemperature: 20,
      minTemperature: 2,
      precipitationChance: 0,
      weatherCode: 1,
      windDirection: Direction.N,
      windSpeed: 24);
  CurrentWeatherData get current => _current;

  HourlyWeatherData _hourly = HourlyWeatherData();
  HourlyWeatherData get hourly => _hourly;

  Location _location =
      Location(latitude: 41.01384, longitude: 28.94966, name: "Istanbul");
  Location get location => _location;

  Units _units =
      Units(Temperature.celsius, Speed.kmh, Precipitation.mm, Timezone.local);
  Units get units => _units;

  /// Change the current location and re-fetch data
  void changeLocation(Location l) async {
    _location = l;
    fetch();
  }

  /// Change unit preferences and re-fetch data
  void changeUnits(Units u) async {
    _units = u;
    fetch();
  }

  void fetch() async {
    _current = await WeatherModel.fetchCurrentWeather(_location, _units);
    _hourly = await WeatherModel.fetchHourlyWeather(_location, _units);
    notifyListeners();
  }
}
