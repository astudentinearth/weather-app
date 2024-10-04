import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

TextStyle defaultText = GoogleFonts.outfit();

extension BodyText on TextStyle{
  TextStyle withSize(double size) => copyWith(fontSize: size);
  TextStyle halfOpaque() => copyWith(color: const Color(0x80ffffff));
}