import React from 'react';
import { Waves, Anchor, Wind, Eye, Thermometer, Activity } from 'lucide-react';
import { MarineWeather as MarineWeatherType } from '../types/weather';

interface MarineWeatherProps {
  weather: MarineWeatherType | null;
  isLoading: boolean;
}

export const MarineWeather: React.FC<MarineWeatherProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="glass-card p-8 rounded-2xl">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded-lg mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-24 bg-white/20 rounded-lg"></div>
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
          Select a coastal location to view marine weather
        </div>
      </div>
    );
  }

  const getWaveCondition = (height: number) => {
    if (height < 0.5) return { condition: 'Calm', color: 'text-green-300' };
    if (height < 1.0) return { condition: 'Slight', color: 'text-blue-300' };
    if (height < 2.0) return { condition: 'Moderate', color: 'text-yellow-300' };
    if (height < 4.0) return { condition: 'Rough', color: 'text-orange-300' };
    return { condition: 'Very Rough', color: 'text-red-300' };
  };

  const getTideStatus = (level: number) => {
    if (level > 0.5) return { status: 'High Tide', color: 'text-blue-300' };
    if (level < -0.5) return { status: 'Low Tide', color: 'text-orange-300' };
    return { status: 'Mid Tide', color: 'text-green-300' };
  };

  const waveCondition = getWaveCondition(weather.waveHeight);
  const tideStatus = getTideStatus(weather.tideLevel);

  return (
    <div className="glass-card p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Waves className="w-6 h-6" />
          Marine Weather
        </h2>
        <div className="text-lg text-white/80">{weather.location}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="mini-glass-card p-6 rounded-xl text-center">
          <Thermometer className="w-10 h-10 text-blue-300 mx-auto mb-3" />
          <div className="text-white font-semibold text-xl">
            {weather.seaTemperature}°C
          </div>
          <div className="text-white/60">Sea Temperature</div>
        </div>

        <div className="mini-glass-card p-6 rounded-xl text-center">
          <Waves className="w-10 h-10 text-blue-300 mx-auto mb-3" />
          <div className="text-white font-semibold text-xl">
            {weather.waveHeight}m
          </div>
          <div className={`text-sm ${waveCondition.color}`}>
            {waveCondition.condition}
          </div>
          <div className="text-white/60 text-sm">Wave Height</div>
        </div>

        <div className="mini-glass-card p-6 rounded-xl text-center">
          <Activity className="w-10 h-10 text-blue-300 mx-auto mb-3" />
          <div className="text-white font-semibold text-xl">
            {weather.wavePeriod}s
          </div>
          <div className="text-white/60">Wave Period</div>
        </div>

        <div className="mini-glass-card p-6 rounded-xl text-center">
          <Wind className="w-10 h-10 text-blue-300 mx-auto mb-3" />
          <div className="text-white font-semibold text-xl">
            {weather.windSpeed} km/h
          </div>
          <div className="text-white/60 text-sm">
            {weather.windDirection}° Wind
          </div>
        </div>

        <div className="mini-glass-card p-6 rounded-xl text-center">
          <Eye className="w-10 h-10 text-blue-300 mx-auto mb-3" />
          <div className="text-white font-semibold text-xl">
            {weather.visibility} km
          </div>
          <div className="text-white/60">Visibility</div>
        </div>

        <div className="mini-glass-card p-6 rounded-xl text-center">
          <Anchor className="w-10 h-10 text-blue-300 mx-auto mb-3" />
          <div className="text-white font-semibold text-xl">
            {weather.tideLevel > 0 ? '+' : ''}{weather.tideLevel}m
          </div>
          <div className={`text-sm ${tideStatus.color}`}>
            {tideStatus.status}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-white/5 rounded-xl">
        <h3 className="text-white font-semibold mb-2">Marine Conditions Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="text-white/80">
            <span className="font-medium">Wave Direction:</span> {weather.waveDirection}°
          </div>
          <div className="text-white/80">
            <span className="font-medium">Conditions:</span> 
            <span className={`ml-1 ${waveCondition.color}`}>{waveCondition.condition}</span>
          </div>
        </div>
      </div>
    </div>
  );
};