import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/services/prefs_service.dart';
import 'package:mobile/services/weather_service.dart';
import 'package:mockito/annotations.dart';
import 'package:shared_preferences/shared_preferences.dart' as shared;

@GenerateMocks([shared.SharedPreferences])
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  test("should load preferences correctly", () async {
    shared.SharedPreferences.setMockInitialValues({
      "temperature": "celsius",
      "speed": "kmh",
      "precipitation": "inch",
      "timezone": "utc",
      "locations": r'{"locations": [{"latitude":1, "longitude":2}]}'
    });
    final model = PrefsModel();
    final prefs = await model.loadSaved();
    expect(prefs.temperatureUnit == Temperature.celsius, isTrue);
    expect(prefs.speedUnit == Speed.kmh, isTrue);
    expect(prefs.precipitationUnit == Precipitation.inch, isTrue);
    expect(prefs.timezone == Timezone.utc, isTrue);
    expect(prefs.locations.length, 1);
  });
}
