import 'dart:convert';

/// Given a dynamic that is known to be either int or double, makes sure it's a double
double ensureDouble(dynamic x) => (x is int ? x.toDouble() : x as double);

/// Performs a type cast for type T, without casting null values
T? nullableCast<T>(dynamic object) => (object == null) ? object : object as T;

/// Returns a JSON string containing the given list with the corresponding key
String serializeList<T>(List<T> list, String key){
  return jsonEncode(
    {
      key: list
    }
  );
}