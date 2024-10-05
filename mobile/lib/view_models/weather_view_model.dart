import 'package:flutter/material.dart';
import 'package:mobile/services/weather_service.dart';
import 'package:provider/provider.dart';

class WeatherViewModel extends ChangeNotifier{
  late CurrentWeatherData _current;
  CurrentWeatherData get current => _current;

  Location _location = Location(latitude: 41.01384, longitude: 28.94966, name: "Istanbul");
  Location get location => _location;

  Units _units = Units(Temperature.celsius, Speed.kmh, Precipitation.mm, Timezone.local);
  Units get units => _units;

  /// Change the current location and re-fetch data
  void changeLocation(Location l) async {
    _location = l;
    _current = await WeatherModel.fetchCurrentWeather(_location, _units);
    notifyListeners();
  }

  /// Change unit preferences and re-fetch data
  void changeUnits(Units u) async {
    _units = u;
    _current = await WeatherModel.fetchCurrentWeather(_location, _units);
    notifyListeners();
  }
}