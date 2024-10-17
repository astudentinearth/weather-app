import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/util/misc.dart';

void main() {
  test("should cast types without casting null", () {
    expect(nullableCast<bool>(null), isNull);
    expect(nullableCast<bool>(true), isTrue);
  });

  test("should ensure number values are double", (){
    final case1 = ensureDouble(1243);
    final case2 = ensureDouble(5.0);
    expect(case1 == 1243, isTrue);
    expect(case2 == 5, isTrue);
  });

  test("should convert a list to json", () {
    List<int> list = [1,2,3];
    String json = serializeList(list, "numbers");
    expect(json==r'{"numbers":[1,2,3]}', isTrue);
  });
}