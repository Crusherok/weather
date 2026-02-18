import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { WeatherAPI } from '../services/weatherApi';
import { Location } from '../types/weather';

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
  currentLocation?: string;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onLocationSelect, 
  currentLocation 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const weatherApi = WeatherAPI.getInstance();

  useEffect(() => {
    const searchLocations = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const locations = await weatherApi.searchLocations(query);
        setSuggestions(locations);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchLocations, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location);
    setQuery('');
    setShowSuggestions(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          name: 'Current Location',
          country: '',
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        onLocationSelect(location);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location.');
        setIsGettingLocation(false);
      }
    );
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <div className="glass-card p-4 rounded-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Search for a city..."
                className="w-full bg-transparent text-white placeholder-white/60 pl-10 pr-4 py-2 focus:outline-none"
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 animate-spin" />
              )}
            </div>
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-50">
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/10 last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-white/60" />
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-white/60">{location.country}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="glass-card p-4 rounded-xl text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          title="Use current location"
        >
          {isGettingLocation ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {currentLocation && (
        <div className="mt-2 text-sm text-white/70">
          Current: {currentLocation}
        </div>
      )}
    </div>
  );
};