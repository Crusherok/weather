import React, { useState, useEffect } from 'react';
import { Cloud, Calendar, Waves, Github } from 'lucide-react';
import { LocationSearch } from './components/LocationSearch';
import { CurrentWeather } from './components/CurrentWeather';
import { HistoricalWeather } from './components/HistoricalWeather';
import { MarineWeather } from './components/MarineWeather';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import { WeatherAPI } from './services/weatherApi';
import { CurrentWeather as CurrentWeatherType, HistoricalWeather as HistoricalWeatherType, MarineWeather as MarineWeatherType, Location } from './types/weather';

type WeatherTab = 'current' | 'historical' | 'marine';

function App() {
  const [activeTab, setActiveTab] = useState<WeatherTab>('current');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);
  const [historicalWeather, setHistoricalWeather] = useState<HistoricalWeatherType[]>([]);
  const [marineWeather, setMarineWeather] = useState<MarineWeatherType | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(false);
  const [isLoadingHistorical, setIsLoadingHistorical] = useState(false);
  const [isLoadingMarine, setIsLoadingMarine] = useState(false);

  const weatherApi = WeatherAPI.getInstance();

  const tabs = [
    { id: 'current' as const, label: 'Current Weather', icon: Cloud },
    { id: 'historical' as const, label: 'Historical', icon: Calendar },
    { id: 'marine' as const, label: 'Marine Weather', icon: Waves },
  ];

  const handleLocationSelect = async (location: Location) => {
    setCurrentLocation(location);
    
    // Load current weather
    setIsLoadingCurrent(true);
    try {
      const current = await weatherApi.getCurrentWeather(location.lat, location.lon);
      setCurrentWeather(current);
    } catch (error) {
      console.error('Error loading current weather:', error);
    } finally {
      setIsLoadingCurrent(false);
    }

    // Load historical weather
    setIsLoadingHistorical(true);
    try {
      const historical = await weatherApi.getHistoricalWeather(location.lat, location.lon);
      setHistoricalWeather(historical);
    } catch (error) {
      console.error('Error loading historical weather:', error);
    } finally {
      setIsLoadingHistorical(false);
    }

    // Load marine weather
    setIsLoadingMarine(true);
    try {
      const marine = await weatherApi.getMarineWeather(location.lat, location.lon);
      setMarineWeather(marine);
    } catch (error) {
      console.error('Error loading marine weather:', error);
    } finally {
      setIsLoadingMarine(false);
    }
  };

  const handleHistoricalDateRangeChange = async (days: number) => {
    if (!currentLocation) return;

    setIsLoadingHistorical(true);
    try {
      const historical = await weatherApi.getHistoricalWeather(currentLocation.lat, currentLocation.lon, days);
      setHistoricalWeather(historical);
    } catch (error) {
      console.error('Error loading historical weather:', error);
    } finally {
      setIsLoadingHistorical(false);
    }
  };

  useEffect(() => {
    // Load default location weather (New York)
    handleLocationSelect({
      name: 'New York',
      country: 'US',
      lat: 40.7128,
      lon: -74.0060,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Weather<span className="text-blue-300">Cast</span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Professional weather forecasting with glassmorphism design
          </p>
          
          {/* Location Search */}
          <div className="max-w-2xl mx-auto">
            <LocationSearch
              onLocationSelect={handleLocationSelect}
              currentLocation={currentLocation ? `${currentLocation.name}, ${currentLocation.country}` : undefined}
            />
          </div>
        </div>

        {/* API Key Banner */}
        <div className="max-w-2xl mx-auto mb-8">
          <ApiKeyBanner />
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-2 rounded-2xl">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Weather Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'current' && (
            <CurrentWeather 
              weather={currentWeather} 
              isLoading={isLoadingCurrent}
            />
          )}
          
          {activeTab === 'historical' && (
            <HistoricalWeather
              data={historicalWeather}
              isLoading={isLoadingHistorical}
              onDateRangeChange={handleHistoricalDateRangeChange}
            />
          )}
          
          {activeTab === 'marine' && (
            <MarineWeather
              weather={marineWeather}
              isLoading={isLoadingMarine}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="glass-card p-6 rounded-2xl inline-block">
            <div className="flex items-center justify-center gap-4 text-white/70">
              <span>Built with React & TypeScript</span>
              <span>•</span>
              <span>Powered by OpenWeatherMap</span>
              <span>•</span>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;