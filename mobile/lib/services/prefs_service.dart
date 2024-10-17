import 'dart:convert';

import 'package:mobile/services/weather_service.dart';
import 'package:mobile/util/misc.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserPrefs{
  Temperature temperatureUnit = Temperature.celsius;
  Speed speedUnit = Speed.kmh;
  Precipitation precipitationUnit = Precipitation.mm;
  Timezone timezone = Timezone.local;
  List<Location> locations = [];
}

abstract class PrefsModelBase{
  Future<UserPrefs> loadSaved();
  Future<void> savePrefs(UserPrefs prefs);
}

class PrefsModel implements PrefsModelBase{
  static final PrefsModel _instance = PrefsModel._internal();
  factory PrefsModel(){
    return _instance;
  }
  PrefsModel._internal();
  @override Future<UserPrefs> loadSaved() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    Temperature temperature = Temperature.values.byName(prefs.getString("temperature") ?? "celsius");
    Speed speed = Speed.values.byName(prefs.getString("speed") ?? "celsius");
    Precipitation precipitation = Precipitation.values.byName(prefs.getString("precipitation") ?? "celsius");
    Timezone timezone = Timezone.values.byName(prefs.getString("timezone") ?? "celsius");
    final locationData = prefs.getString("locations");
    final locationObj = jsonDecode(locationData ?? "{locations: []}");
    List<Location> locations = locationObj["locations"] ?? [];
    return UserPrefs()
    ..timezone=timezone
    ..temperatureUnit=temperature
    ..speedUnit=speed
    ..precipitationUnit=precipitation
    ..locations=locations;
  }

  @override Future<void> savePrefs(UserPrefs prefs) async {
    SharedPreferences instance = await SharedPreferences.getInstance();
    await instance.setString("temperature", prefs.temperatureUnit.name);
    await instance.setString("speed", prefs.speedUnit.name);
    await instance.setString("precipitation", prefs.precipitationUnit.name);
    await instance.setString("timezone", prefs.timezone.name);
    await instance.setString("locations", serializeList(prefs.locations, "locations"));
  }

}