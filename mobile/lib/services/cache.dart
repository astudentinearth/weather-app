import "dart:convert";
import "dart:developer";
import "dart:io";
import "package:dio_cache_interceptor_hive_store/dio_cache_interceptor_hive_store.dart";
import "package:dio_cache_interceptor_file_store/dio_cache_interceptor_file_store.dart";
import "package:hive/hive.dart";
import "package:path_provider/path_provider.dart";
import "package:dio/dio.dart";
import "package:dio_cache_interceptor/dio_cache_interceptor.dart";
import "package:crypto/crypto.dart";

Future<Directory> getTempDirectory() async {
  final tempDir = await getTemporaryDirectory();
  return await Directory("${tempDir.path}/cache").create(recursive: true);
}

Future<CacheOptions> getCacheOpts() async {
  final dir = await getTempDirectory();
  log(dir.path);
  final store = FileCacheStore(dir.path);
  var cacheOpts = CacheOptions(
    store: store,
    policy: CachePolicy.forceCache,
    priority: CachePriority.high,
    maxStale: const Duration(minutes: 10),
    hitCacheOnErrorExcept: [400, 401, 404],
    keyBuilder: (request) => md5.convert(utf8.encode(request.uri.toString())).toString(),
    allowPostMethod: false
  );
  return cacheOpts;
}

class Cache{
  static final Cache _cache = Cache._internal();
  static final Dio _dio = Dio();
  factory Cache(){
    return _cache;
  }
  Cache._internal();
  Future<void> init() async {
    final opts = await getCacheOpts();
    _dio.interceptors.add(DioCacheInterceptor(options: opts));
  }
  Future<Response> httpGet(String uri){
    var response = _dio.get(uri);
    return response;
  }
}