import 'package:flutter/material.dart';
import 'package:mobile/services/prefs_service.dart';

import '../services/weather_service.dart';

enum UnitPreference { metric, imperial }

abstract class UserPrefsViewModelBase {
  void setTemperatureUnit(Temperature unit);
  void setSpeedUnit(Speed unit);
  void setPrecipitationUnit(Precipitation unit);
  void setTimezone(Timezone zone);
  void setUnitPreference(UnitPreference unit);
  void addLocation(Location location);
  void removeLocation(Location location);
  Future<void> init();
  Units getUnits();
}

class UserPrefsViewModel extends ChangeNotifier
    implements UserPrefsViewModelBase {
  Temperature _temperatureUnit = Temperature.celsius;
  Temperature get temperatureUnit => _temperatureUnit;

  Speed _speedUnit = Speed.kmh;
  Speed get speedUnit => _speedUnit;

  Precipitation _precipitationUnit = Precipitation.mm;
  Precipitation get precipitationUnit => _precipitationUnit;

  Timezone _timezone = Timezone.local;
  Timezone get timezone => _timezone;

  List<Location> _locations = [];
  List<Location> get locations => _locations;

  UnitPreference get unitPreference => _temperatureUnit == Temperature.celsius
      ? UnitPreference.metric
      : UnitPreference.imperial;

  UserPrefsViewModel() {
    init();
  }

  @override
  void setTemperatureUnit(Temperature unit) {
    _temperatureUnit = unit;
    notifyListeners();
    PrefsModel().savePrefs(_toUserPrefs());
  }

  @override
  void setSpeedUnit(Speed unit) {
    _speedUnit = unit;
    notifyListeners();
    PrefsModel().savePrefs(_toUserPrefs());
  }

  @override
  void setPrecipitationUnit(Precipitation unit) {
    _precipitationUnit = unit;
    notifyListeners();
    PrefsModel().savePrefs(_toUserPrefs());
  }

  @override
  void setTimezone(Timezone unit) {
    _timezone = unit;
    notifyListeners();
    PrefsModel().savePrefs(_toUserPrefs());
  }

  @override
  Units getUnits() {
    return Units(_temperatureUnit, _speedUnit, _precipitationUnit, _timezone);
  }

  UserPrefs _toUserPrefs() {
    return UserPrefs()
      ..locations
      ..precipitationUnit
      ..speedUnit
      ..temperatureUnit
      ..timezone;
  }

  @override
  void addLocation(Location location) {
    for (int i = 0; i < _locations.length; i++) {
      if (_locations[i].latitude == location.latitude &&
          _locations[i].longitude == location.longitude) {
        _locations[i] = location;
        PrefsModel().savePrefs(_toUserPrefs());
        notifyListeners();
        return;
      }
    }
    _locations.add(location);
  }

  @override
  void removeLocation(Location location) {
    for (var loc in _locations) {
      if (loc == location) {
        _locations.remove(location);
        PrefsModel().savePrefs(_toUserPrefs());
        notifyListeners();
      }
    }
  }

  @override
  Future<void> init() async {
    final prefs = await PrefsModel().loadSaved();
    _locations = prefs.locations;
    _temperatureUnit = prefs.temperatureUnit;
    _speedUnit = prefs.speedUnit;
    _precipitationUnit = prefs.precipitationUnit;
    _timezone = prefs.timezone;
    notifyListeners();
  }

  @override
  void setUnitPreference(UnitPreference unit) {
    if (unit == UnitPreference.metric) {
      _temperatureUnit = Temperature.celsius;
      _speedUnit = Speed.kmh;
      _precipitationUnit = Precipitation.mm;
    } else {
      _temperatureUnit = Temperature.fahrenheit;
      _speedUnit = Speed.mph;
      _precipitationUnit = Precipitation.inch;
    }
    notifyListeners();
    PrefsModel().savePrefs(_toUserPrefs());
  }
}
