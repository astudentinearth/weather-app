import 'package:flutter/material.dart';
import 'package:mobile/services/search_service.dart';
import 'package:mobile/services/weather_service.dart';

class SearchViewModel extends ChangeNotifier{
  List<Location> _results = [];
  List<Location> get results => _results;

  Future<void> search(String query) async {
    var result = await SearchModel.query(query);
    _results = result;
    notifyListeners();
  }
}