import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

TextStyle defaultText = GoogleFonts.outfit(textStyle: const TextStyle(color: Colors.white));

extension BodyText on TextStyle{
  TextStyle withSize(double size) => copyWith(fontSize: size);
  TextStyle halfOpaque() => copyWith(color: const Color(0x80ffffff));
  TextStyle black() => copyWith(color: Colors.black);
}