import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/styles/text.dart';
import 'package:mobile/view_models/weather_view_model.dart';
import 'package:provider/provider.dart';

import '../services/weather_service.dart';
import '../view_models/search_view_model.dart';

class LocationSearchBar extends StatelessWidget {
  const LocationSearchBar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SearchBar(
      shape: WidgetStatePropertyAll(
          RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
      shadowColor: const WidgetStatePropertyAll(Color(0x00FFFFFF)),
      hintText: "Your Location",
      textStyle: WidgetStatePropertyAll(defaultText.withSize(18)),
      hintStyle: WidgetStatePropertyAll(defaultText.halfOpaque()),
      backgroundColor:
          const WidgetStatePropertyAll(Color.fromARGB(255, 31, 45, 64)),
    );
  }
}

class LocationSearchScreen extends SearchDelegate {
  @override
  ThemeData appBarTheme(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final ColorScheme colorScheme = theme.colorScheme;
    return theme.copyWith(
      appBarTheme: AppBarTheme(
          systemOverlayStyle: SystemUiOverlayStyle.light,
          backgroundColor: const Color(0xFF1F2D40),
          iconTheme:
              theme.primaryIconTheme.copyWith(color: const Color(0x80FFFFFF))),
      inputDecorationTheme: InputDecorationTheme(
          hintStyle: defaultText.halfOpaque(), border: InputBorder.none,
      ),
      textTheme: TextTheme(
        titleLarge: defaultText.withSize(18)
      ),
      scaffoldBackgroundColor: const Color(0xff121937),
    );
  }

  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
          onPressed: () {
            query = "";
          },
          icon: const Icon(Icons.clear))
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
        onPressed: () => Navigator.of(context).pop(),
        icon: const Icon(Icons.arrow_back));
  }

  @override
  Widget buildResults(BuildContext context) {
    Provider.of<SearchViewModel>(context).search(query);
    return Consumer<SearchViewModel>(builder: (context, search, child) {
      return ListView.builder(
          itemCount: search.results.length,
          itemBuilder: (context, index) {
            return LocationButton(location: search.results[index],
            pressCallback: (){
              Provider.of<WeatherViewModel>(context, listen: false).changeLocation(search.results[index]);
              close(context, query);
            },);
          });
    });
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return ListView.builder(
        itemCount: 2,
        itemBuilder: (context, index) {
          if (index == 0) {
            return ListButton(
                child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const Icon(Icons.near_me, color: Colors.white),
                const SizedBox(width: 12),
                Text("Automatically detect my location", style: defaultText)
              ],
            ));
          }
        });
  }
}

class ListButton extends StatelessWidget {
  final Widget? child;

  const ListButton({super.key, this.child});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        onPressed: () {},
        style: ButtonStyle(
            padding: const WidgetStatePropertyAll(EdgeInsets.all(16)),
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            backgroundColor: const WidgetStatePropertyAll(Colors.transparent),
            shadowColor: const WidgetStatePropertyAll(Colors.transparent),
            shape: WidgetStatePropertyAll(RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(0)))),
        child: child);
  }
}

class LocationButton extends StatelessWidget {
  final Location location;
  final Function() pressCallback;
  const LocationButton({super.key, required this.location, required this.pressCallback});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        onPressed: pressCallback,
        style: ButtonStyle(
            padding: const WidgetStatePropertyAll(EdgeInsets.all(16)),
            backgroundColor: const WidgetStatePropertyAll(Colors.transparent),
            shadowColor: const WidgetStatePropertyAll(Colors.transparent),
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            shape: WidgetStatePropertyAll(RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(0)))),
        child: Align(
          alignment: Alignment.centerLeft,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "${location.name ?? "Unknown location"}, ${location.country ?? ""}",
                textAlign: TextAlign.start,
                style: defaultText.withSize(20),
              ),
              Text(
                location.admins ?? "(no admin information)",
                style: defaultText.withSize(16).halfOpaque(),
              ),
            ],
          ),
        ));
  }
}
