import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/widgets/app_bar.dart';
import 'package:mobile/widgets/current_status.dart';
import 'package:mobile/widgets/current_weather.dart';
import 'package:mobile/widgets/location_search.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Weather',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0x121933FF)),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
            gradient: LinearGradient(colors: [
              Color(0xFF121B3C),
              Color(0xFF111216)
            ],
                begin: FractionalOffset(0.0, 0.0),
                end: FractionalOffset(0.0, 1.0),
                stops: [0.0, 1.0])
        ),
        child: SafeArea(child: Column(
          children: [
            Container(
              margin: const EdgeInsets.all(8),
              child: const Column(
                children: [
                  WeatherAppBar(),
                  CurrentWeatherWidget(),
                  CurrentStatusWidget()
                ],
              )
            )
          ],

        )),
      )
    );
  }
}

