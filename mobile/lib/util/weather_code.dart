const String prefix = 'assets';

final Map<int, String> weatherIcons = {
  0: '$prefix/clear.svg',
  1: '$prefix/clear.svg',
  2: '$prefix/partly_cloudy.svg',
  3: '$prefix/overcast.svg',
  45: '$prefix/fog.svg',
  48: '$prefix/fog.svg',
  51: '$prefix/drizzle_1.svg',
  53: '$prefix/drizzle_2.svg',
  55: '$prefix/drizzle_3.svg',
  56: '$prefix/freezing_drizzle.svg',
  57: '$prefix/dense_freezing_drizzle.svg',
  61: '$prefix/rain_1.svg',
  63: '$prefix/rain_2.svg',
  65: '$prefix/rain_3.svg',
  66: '$prefix/freezing_rain_1.svg',
  67: '$prefix/freezing_rain_2.svg',
  71: '$prefix/snow_1.svg',
  73: '$prefix/snow_2.svg',
  75: '$prefix/snow_3.svg',
  77: '$prefix/snowflake.svg',
  80: '$prefix/showers_1.svg',
  81: '$prefix/showers_2.svg',
  82: '$prefix/showers_3.svg',
  85: '$prefix/snow_showers_1.svg',
  86: '$prefix/snow_showers_2.svg',
  95: '$prefix/storm.svg',
  96: '$prefix/storm.svg',
  99: '$prefix/storm.svg',
};

final Map<int, String> weatherNames = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight showers",
  81: "Showers",
  82: "Violent showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail"
};

class WeatherUtil{
  static getIconAssetName(int code) => weatherIcons[code];
  static getDescription(int code) => weatherNames[code];
}