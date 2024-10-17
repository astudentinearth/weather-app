import 'package:flutter/material.dart';
import 'package:mobile/services/prefs_service.dart';

import '../services/weather_service.dart';

abstract class UserPrefsViewModelBase{
  void setTemperatureUnit(Temperature unit);
  void setSpeedUnit(Speed unit);
  void setPrecipitationUnit(Precipitation unit);
  void setTimezone(Timezone zone);
  void addLocation(Location location);
  void removeLocation(Location location);
  Units getUnits();
}

class UserPrefsViewModel extends ChangeNotifier implements UserPrefsViewModelBase {
  // Temperature _temperatureUnit = Temperature.celsius;
  // Temperature get temperatureUnit => _temperatureUnit;
  //
  // Speed _speedUnit = Speed.kmh;
  // Speed get speedUnit => _speedUnit;
  //
  // Precipitation _precipitationUnit = Precipitation.mm;
  // Precipitation get precipitationUnit => _precipitationUnit;
  //
  // Timezone _timezone = Timezone.local;
  // Timezone get timezone => _timezone;


  @override void setTemperatureUnit(Temperature unit) {

  }
  @override void setSpeedUnit(Speed unit) {

  }
  @override void setPrecipitationUnit(Precipitation unit) {

  }
  @override void setTimezone(Timezone unit) {

  }

  @override Units getUnits(){
    return Units(_temperatureUnit, _speedUnit, _precipitationUnit, _timezone);
  }

  @override void addLocation(Location location) {
    // TODO: implement addLocation
  }

  @override void removeLocation(Location location) {
    // TODO: implement removeLocation
  }
}