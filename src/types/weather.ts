export interface CurrentWeather {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  icon: string;
  timestamp: number;
}

export interface HistoricalWeather {
  date: string;
  temperature: {
    min: number;
    max: number;
    avg: number;
  };
  humidity: number;
  windSpeed: number;
  pressure: number;
  description: string;
  icon: string;
}

export interface MarineWeather {
  location: string;
  seaTemperature: number;
  waveHeight: number;
  waveDirection: number;
  wavePeriod: number;
  visibility: number;
  windSpeed: number;
  windDirection: number;
  tideLevel: number;
  timestamp: number;
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}