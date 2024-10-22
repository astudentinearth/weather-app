import 'package:mobile/services/cache.dart';
import 'package:mobile/services/weather_service.dart';

String combineAdmins(
    String? a1, String? a2, String? a3, String? a4, String? c) {
  return "${a4 != null ? "$a4, " : ""}${a3 != null ? "$a3, " : ""}${a2 != null ? "$a2, " : ""}${a1 != null ? "$a1, " : ""}$c";
}

class SearchModel {
  static Future<List<Location>> query(String query,
      {CachedHTTPClient? client}) async {
    var q =
        query.replaceAll(RegExp('[`~!@#\$%^&*()_|+-=?;:\'",.<>{}[]\\/]'), '');
    if (q.length <= 1 || q.trim() == "") return [];
    final url =
        "https://geocoding-api.open-meteo.com/v1/search?name=$q&count=10&language=en&format=json";
    var response = await (client ?? Cache()).httpGet(url);
    var list = response.data["results"];
    List<Location> returns = [];
    if (list is List) {
      for (var l in list) {
        returns.add(Location(
            latitude: l["latitude"],
            longitude: l["longitude"],
            name: l["name"],
            country: l["country"],
            countryCode: l["countryCode"],
            admins: combineAdmins(l["admin1"], l["admin2"], l["admin3"],
                l["admin4"], l["country"])));
      }
      return returns;
    } else {
      return [];
    }
  }
}
