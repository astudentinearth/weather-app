import 'package:flutter/material.dart';
import 'package:mobile/styles/text.dart';
import 'package:mobile/view_models/prefs_view_model.dart';
import 'package:provider/provider.dart';

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
        body: Consumer<UserPrefsViewModel>(
          builder: (context, prefs, child) {
            return Container(
                padding: const EdgeInsets.all(16.0),
                decoration: const BoxDecoration(
                    gradient: LinearGradient(
                        colors: [Color(0xFF121B3C), Color(0xFF111216)],
                        begin: FractionalOffset(0.0, 0.0),
                        end: FractionalOffset(0.0, 1.0),
                        stops: [0.0, 1.0])),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text("Units", style: defaultText.withSize(20)),
                        SegmentedButton<UnitPreference>(
                            showSelectedIcon: false,
                            style: ButtonStyle(
                                backgroundColor:
                                    WidgetStateProperty.resolveWith<Color>(
                                  (Set<WidgetState> states) {
                                    if (states.contains(WidgetState.selected)) {
                                      return const Color(0xFF283c58);
                                    }
                                    return const Color(0xFF121B3C);
                                  },
                                ),
                                foregroundColor: WidgetStateProperty.all(
                                    const Color(0xffffffff))),
                            segments: const [
                              ButtonSegment<UnitPreference>(
                                value: UnitPreference.metric,
                                label: Text("Metric"),
                              ),
                              ButtonSegment<UnitPreference>(
                                  value: UnitPreference.imperial,
                                  label: Text("Imperial")),
                            ],
                            selected: {prefs.unitPreference},
                            onSelectionChanged: (unit) {
                              prefs.setUnitPreference(unit.first);
                            })
                      ],
                    )
                  ],
                ));
          },
        ));
  }
}
