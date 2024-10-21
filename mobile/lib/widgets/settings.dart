import 'package:flutter/material.dart';
import 'package:mobile/styles/text.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xFF121B3C),
          title: Align(
            alignment: Alignment.centerLeft,
            child: Text(
              'Settings',
              style: defaultText.withSize(24),
            ),
          ),
          leading: IconButton(
              onPressed: () {
                Navigator.pop(context);
              },
              icon: const Icon(Icons.arrow_back),
              color: const Color(0x80ffffff)),
        ),
        body: Container(
          padding: const EdgeInsets.all(16.0),
          decoration: const BoxDecoration(
              gradient: LinearGradient(
                  colors: [Color(0xFF121B3C), Color(0xFF111216)],
                  begin: FractionalOffset(0.0, 0.0),
                  end: FractionalOffset(0.0, 1.0),
                  stops: [0.0, 1.0])),
        ));
  }
}
