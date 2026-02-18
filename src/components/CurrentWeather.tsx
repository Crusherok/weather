import React from 'react';
import { Thermometer, Wind, Droplets, Eye, Gauge, Sun } from 'lucide-react';
import { CurrentWeather as CurrentWeatherType } from '../types/weather';

interface CurrentWeatherProps {
  weather: CurrentWeatherType | null;
  isLoading: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="glass-card p-8 rounded-2xl">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded-lg mb-4"></div>
          <div className="h-16 bg-white/20 rounded-lg mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-20 bg-white/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center">
        <div className="text-white/60 text-lg">
          Select a location to view current weather
        </div>
      </div>
    );
  }

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    return iconUrl;
  };

  return (
    <div className="glass-card p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {weather.location}, {weather.country}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            src={getWeatherIcon(weather.icon)}
            alt={weather.description}
            className="w-20 h-20"
          />
          <div>
            <div className="text-6xl font-light text-white">
              {weather.temperature}°C
            </div>
            <div className="text-xl text-white/80 capitalize">
              {weather.description}
            </div>
          </div>
        </div>
        <div className="text-lg text-white/70">
          Feels like {weather.feelsLike}°C
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="mini-glass-card p-4 rounded-xl text-center">
          <Wind className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {weather.windSpeed} km/h
          </div>
          <div className="text-white/60 text-sm">
            {getWindDirection(weather.windDirection)}
          </div>
        </div>

        <div className="mini-glass-card p-4 rounded-xl text-center">
          <Droplets className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {weather.humidity}%
          </div>
          <div className="text-white/60 text-sm">Humidity</div>
        </div>

        <div className="mini-glass-card p-4 rounded-xl text-center">
          <Gauge className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {weather.pressure} hPa
          </div>
          <div className="text-white/60 text-sm">Pressure</div>
        </div>

        <div className="mini-glass-card p-4 rounded-xl text-center">
          <Eye className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {weather.visibility} km
          </div>
          <div className="text-white/60 text-sm">Visibility</div>
        </div>

        <div className="mini-glass-card p-4 rounded-xl text-center">
          <Sun className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {weather.uvIndex}
          </div>
          <div className="text-white/60 text-sm">UV Index</div>
        </div>

        <div className="mini-glass-card p-4 rounded-xl text-center">
          <Thermometer className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {weather.feelsLike}°C
          </div>
          <div className="text-white/60 text-sm">Feels Like</div>
        </div>
      </div>
    </div>
  );
};