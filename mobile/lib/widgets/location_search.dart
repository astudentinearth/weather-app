import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/styles/text.dart';

class LocationSearchBar extends StatelessWidget {
  const LocationSearchBar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SearchBar(
      shape: WidgetStatePropertyAll(RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12)
      )),
      shadowColor: const WidgetStatePropertyAll(Color(0x00FFFFFF)),
      hintText: "Your Location",
      textStyle: WidgetStatePropertyAll(defaultText.withSize(18)),
      hintStyle: WidgetStatePropertyAll(defaultText.halfOpaque()),
      backgroundColor: const WidgetStatePropertyAll(Color.fromARGB(255, 31, 45, 64)),

    );
  }
}
