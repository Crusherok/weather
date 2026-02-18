import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { HistoricalWeather as HistoricalWeatherType } from '../types/weather';

interface HistoricalWeatherProps {
  data: HistoricalWeatherType[];
  isLoading: boolean;
  onDateRangeChange: (days: number) => void;
}

export const HistoricalWeather: React.FC<HistoricalWeatherProps> = ({ 
  data, 
  isLoading, 
  onDateRangeChange 
}) => {
  const [selectedDays, setSelectedDays] = useState(5);

  const dateRangeOptions = [
    { value: 5, label: '5 Days' },
    { value: 10, label: '10 Days' },
    { value: 15, label: '15 Days' },
    { value: 30, label: '30 Days' },
  ];

  const handleDateRangeChange = (days: number) => {
    setSelectedDays(days);
    onDateRangeChange(days);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="glass-card p-8 rounded-2xl">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded-lg mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-white/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Historical Weather
        </h2>
        
        <div className="flex gap-2">
          {dateRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleDateRangeChange(option.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDays === option.value
                  ? 'bg-blue-500/80 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {data.map((day, index) => (
          <div key={index} className="mini-glass-card p-4 rounded-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-white font-medium w-24">
                  {formatDate(day.date)}
                </div>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-12 h-12"
                />
                <div className="text-white/80 capitalize flex-1">
                  {day.description}
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-red-300">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">{day.temperature.max}°</span>
                  </div>
                  <div className="text-white/60">High</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center gap-1 text-blue-300">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-semibold">{day.temperature.min}°</span>
                  </div>
                  <div className="text-white/60">Low</div>
                </div>
                
                <div className="text-center">
                  <div className="text-white font-semibold">{day.humidity}%</div>
                  <div className="text-white/60">Humidity</div>
                </div>
                
                <div className="text-center">
                  <div className="text-white font-semibold">{day.windSpeed} km/h</div>
                  <div className="text-white/60">Wind</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && !isLoading && (
        <div className="text-center text-white/60 py-12">
          Select a location to view historical weather data
        </div>
      )}
    </div>
  );
};