import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile/styles/text.dart';
import 'package:intl/intl.dart';

class CurrentWeatherWidget extends StatefulWidget {
  const CurrentWeatherWidget({super.key});

  @override
  State<CurrentWeatherWidget> createState() => _CurrentWeatherWidgetState();
}

class _CurrentWeatherWidgetState extends State<CurrentWeatherWidget> {
  @override
  Widget build(BuildContext context) {
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
                      "18°C",
                      style: defaultText.withSize(64).copyWith(height: 1),
                    ),
                    Text("15°C / 26°C",
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
                    Align(alignment: Alignment.centerRight, child: SvgPicture.asset("assets/drizzle_3.svg", width: 64, height: 64),),
                    Align(alignment: Alignment.centerRight, child: Text("Partly cloudy", style: defaultText.withSize(24)))
                  ],
                )
              )
            ],
          )
        ],
      ),
    );
  }
}
