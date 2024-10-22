// ignore_for_file: avoid_print

import "package:dio/dio.dart";
import "package:flutter_test/flutter_test.dart";
import "package:mobile/services/cache.dart";
import "package:mobile/services/search_service.dart";

class FakeHTTPClient implements CachedHTTPClient {
  @override
  Future<Response> httpGet(String uri) {
    return Dio().get(uri);
  }
}

void main() {
  test("should search locations", () async {
    var result = await SearchModel.query("istanbul", client: FakeHTTPClient());
    for (var l in result) {
      print(l.toString());
    }
    expect(result.length, isNonZero);
  });
}
