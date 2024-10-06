import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile/main.dart';
import 'package:mobile/services/weather_service.dart';
import 'package:mobile/styles/text.dart';
import 'package:intl/intl.dart';
import 'package:mobile/util/weather_code.dart';
import 'package:mobile/view_models/weather_view_model.dart';
import 'package:provider/provider.dart';

class CurrentWeatherWidget extends StatefulWidget {
  const CurrentWeatherWidget({super.key});

  @override
  State<CurrentWeatherWidget> createState() => _CurrentWeatherWidgetState();
}

class _CurrentWeatherWidgetState extends State<CurrentWeatherWidget> {
  @override
  Widget build(BuildContext context) {
    return Consumer<WeatherViewModel>(
      builder: (context, weather, child){
        return Container(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
          child: Column(
            children: [
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  DateFormat.yMMMd().add_jm().format(DateTime.now()),
                  style: defaultText.withSize(18).halfOpaque(),
                  textAlign: TextAlign.left,
                ),
              ),
              Row(
                children: [
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Column(
                      children: [
                        Text(
                          "${weather.current.currentTemperature.round()}°${weather.units.temperature.getSymbol()}",
                          style: defaultText.withSize(64).copyWith(height: 1),
                        ),
                        Text("${weather.current.minTemperature.round()}${weather.units.temperature.withSign()} / ${weather.current.maxTemperature.round()}${weather.units.temperature.withSign()}",
                            style: defaultText.withSize(24).halfOpaque())
                      ],
                    ),
                  ),
                  const Spacer(),
                  Align(
                      alignment: Alignment.centerRight,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Align(alignment: Alignment.centerRight, child: SvgPicture.asset(WeatherUtil.getIconAssetName(weather.current.weatherCode), width: 64, height: 64),),
                          Align(alignment: Alignment.centerRight, child: Text(WeatherUtil.getDescription(weather.current.weatherCode), style: defaultText.withSize(24)))
                        ],
                      )
                  )
                ],
              )
            ],
          ),
        );
      },
    );
  }
}
