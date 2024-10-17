import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/styles/text.dart';
import 'package:mobile/view_models/weather_view_model.dart';
import 'package:mobile/widgets/location_search.dart';
import 'package:provider/provider.dart';

import '../services/weather_service.dart';

class WeatherAppBar extends StatelessWidget {
  const WeatherAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: const Color(0xFF1F2D40),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      flexibleSpace: GestureDetector(
          child: Container(
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: const Color(0xFF1F2D40)
            ),
          ),
      ),
      shadowColor: Colors.transparent,
      title: GestureDetector(
        onTap: () async {
          await showSearch(context: context, delegate: LocationSearchScreen());
        },
        child: Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
              color: Colors.transparent,
              child: Row(
                children: [
                  const Icon(
                    Icons.search,
                    color: Color(0x80ffffff),
                  ),
                  const SizedBox(width: 8),
                  Consumer<WeatherViewModel>(builder: (context, weather, child){
                    return Text(weather.location.autoLocated==true ? "Your location" : weather.location.name ?? "Search", style: defaultText.halfOpaque().withSize(24));
                  })
                ],
              ),
            )),
      ),
      actions: [
        Container(
            padding: const EdgeInsets.fromLTRB(0, 0, 8, 0),
            child: IconButton(onPressed: () =>
            {
              WeatherModel.fetchCurrentWeather(Location(
                  latitude: 41.01384, longitude: 28.94966, name: "Istanbul"), Units(
                  Temperature.celsius, Speed.kmh, Precipitation.mm, Timezone.local))
            },
              icon: const Icon(Icons.menu, color: Color(0x80ffffff)),
        ))
      ],
    );
  }
}