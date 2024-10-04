import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/styles/text.dart';

class WeatherAppBar extends StatelessWidget{
  const WeatherAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: const Color(0xFF1F2D40),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      flexibleSpace: Container(
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: const Color(0xFF1F2D40)
        ),
      ),
      shadowColor: Colors.transparent,
      title: GestureDetector(
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
          child: Row(
            children: [
              const Icon(Icons.search, color: Color(0x80ffffff),),
              const SizedBox(width: 8),
              Text("Search", style: defaultText.halfOpaque().withSize(24))
            ],
          ),
        ),
      ),
      actions: [
        IconButton(onPressed: ()=>{}, icon: const Icon(Icons.menu, color: Color(0x80ffffff)), padding: const EdgeInsets.fromLTRB(0, 0, 8, 0),)
      ],
    );
  }
}