import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:intl/intl.dart';
import 'package:mobile/styles/text.dart';
import 'package:mobile/util/weather_code.dart';
import 'package:mobile/view_models/weather_view_model.dart';
import 'package:provider/provider.dart';

class DailyWeatherWidget extends StatefulWidget {
  const DailyWeatherWidget({super.key});

  @override
  State<StatefulWidget> createState() => _DailyWeatherWidgetState();
}

class _DailyWeatherWidgetState extends State<DailyWeatherWidget> {
  @override
  Widget build(BuildContext context) {
    return Consumer<WeatherViewModel>(
      builder: (context, weather, child) {
        return Column(
          children: weather.daily.days.map((element) {
            return Padding(
              padding: const EdgeInsets.fromLTRB(0, 0, 0, 8),
              child: Container(
                padding: const EdgeInsets.fromLTRB(12, 12, 12, 12),
                decoration: BoxDecoration(
                  color: const Color(0xff1F2D40),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Align(
                        alignment: Alignment.center,
                        child: SvgPicture.asset(
                          WeatherUtil.getIconAssetName(element.weatherCode),
                          width: 36,
                          height: 36,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(DateFormat('EEEE, MMM d').format(element.date),
                              style: defaultText.withSize(20)),
                          Text(
                              "${element.maxTemperature.round()}°/${element.minTemperature.round()}°",
                              style: defaultText.withSize(20).halfOpaque()),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }
}
