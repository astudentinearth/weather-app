import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/services/weather_service.dart';

void main() {
  test("should fetch current weather data", () async {});

  test("should construct location from json", () {
    Map<String, dynamic> json = {
      "name": "Istanbul",
      "latitude": 2.5,
      "longitude": 3,
      "autoLocated": false,
      "admins": "Istanbul, Türkiye",
      "country": "Türkiye"
    };
    final Location location = Location.fromJSON(json);
    expect(location.name, "Istanbul");
    expect(location.latitude, 2.5);
    expect(location.longitude, 3);
    expect(location.autoLocated, false);
    expect(location.admins, "Istanbul, Türkiye");
    expect(location.country, "Türkiye");
  });
  test("should convert location to json", () {
    final Location location =
        Location(name: "Istanbul", latitude: 2.5, longitude: 3);
    expect(location.toJSON(), {
      "name": "Istanbul",
      "latitude": 2.5,
      "longitude": 3,
      "autoLocated": null,
      "admins": null,
      "country": null,
      "countryCode": null
    });
  });

  test("should create a location list from json", () {
    final location1 = Location(name: "Istanbul", latitude: 3, longitude: 3);
    final location2 =
        Location(name: "Ankara", latitude: 4, longitude: 5, country: "Türkiye");
    final location3 = Location(
        name: "İzmir", latitude: 4.5, longitude: 6, admins: "İzmir, Türkiye");
    final List<Location> locations = Location.fromJSONList(
        [location1.toJSON(), location2.toJSON(), location3.toJSON()]);
    expect(locations[0] == location1, isTrue);
    expect(locations[1] == location2, isTrue);
    expect(locations[2] == location3, isTrue);
  });
}
