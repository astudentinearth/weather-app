import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:intl/intl.dart';
import 'package:mobile/services/weather_service.dart';
import 'package:mobile/styles/text.dart';
import 'package:mobile/util/weather_code.dart';
import 'package:mobile/view_models/weather_view_model.dart';
import 'package:provider/provider.dart';

class HourlyWeatherWidget extends StatefulWidget {
  const HourlyWeatherWidget({super.key});
  @override
  createState() => _HourlyWeatherWidgetState();
}

class _HourlyWeatherWidgetState extends State<HourlyWeatherWidget> {
  @override
  Widget build(BuildContext context) {
    return Consumer<WeatherViewModel>(builder: (context, weather, child) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            decoration: BoxDecoration(
                color: const Color(0xff1F2D40),
                borderRadius: BorderRadius.circular(12)),
            height: 200,
            child: Column(
              children: [
                Align(
                  alignment: Alignment.centerLeft,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
                    child: Text(
                      'Hourly Forecast',
                      style: defaultText.withSize(20).halfOpaque(),
                    ),
                  ),
                ),
                Flexible(
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    shrinkWrap: true,
                    children: weather.hourly.hours.map((hour) {
                      return Padding(
                        padding: const EdgeInsets.all(8),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Text("${hour.precpitationChance.round()}%",
                                style: defaultText
                                    .withSize(16)
                                    .halfOpaque()
                                    .copyWith(color: const Color(0xff87C1FF))),
                            const SizedBox(height: 8),
                            SvgPicture.asset(
                              WeatherUtil.getIconAssetName(hour.weatherCode),
                              width: 48,
                              height: 48,
                            ),
                            const SizedBox(height: 8),
                            Text(
                              "${hour.temperature.round()}${weather.units.temperature.withSign()}",
                              style: defaultText.withSize(24),
                            ),
                            Text(
                              DateFormat.Hm().format(hour.time),
                              style: defaultText.withSize(16).halfOpaque(),
                            ),
                          ],
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
          ),
        ],
      );
    });
  }
}
