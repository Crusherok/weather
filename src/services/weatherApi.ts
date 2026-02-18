const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';

export class WeatherAPI {
  private static instance: WeatherAPI;
  private isApiKeyValid: boolean | null = null;

  private constructor() {}

  static getInstance(): WeatherAPI {
    if (!WeatherAPI.instance) {
      WeatherAPI.instance = new WeatherAPI();
    }
    return WeatherAPI.instance;
  }

  private isValidApiKey(): boolean {
    return API_KEY !== 'demo_key' && API_KEY.length > 10;
  }

  async getCurrentWeather(lat: number, lon: number) {
    if (!this.isValidApiKey()) {
      console.warn('Using mock data: No valid OpenWeatherMap API key configured');
      return this.getMockCurrentWeather();
    }

    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error('Invalid API key. Using mock data.');
          this.isApiKeyValid = false;
          return this.getMockCurrentWeather();
        }
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      return {
        location: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert to km/h
        windDirection: data.wind.deg,
        pressure: data.main.pressure,
        visibility: Math.round((data.visibility || 10000) / 1000),
        uvIndex: 0, // Would need separate UV API call
        icon: data.weather[0].icon,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return this.getMockCurrentWeather();
    }
  }

  async getHistoricalWeather(lat: number, lon: number, days: number = 5) {
    // OpenWeatherMap historical data requires a paid plan
    // Using mock data for demonstration
    return this.getMockHistoricalWeather(days);
  }

  async getMarineWeather(lat: number, lon: number) {
    // Marine weather would typically use a specialized API
    // Using mock data for demonstration
    return this.getMockMarineWeather();
  }

  async searchLocations(query: string) {
    if (!this.isValidApiKey()) {
      console.warn('Using mock locations: No valid OpenWeatherMap API key configured');
      return this.getMockLocations(query);
    }

    try {
      const response = await fetch(
        `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error('Invalid API key. Using mock locations.');
          return this.getMockLocations(query);
        }
        throw new Error('Location search failed');
      }

      const data = await response.json();

      return data.map((item: any) => ({
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      return this.getMockLocations(query);
    }
  }

  private getMockCurrentWeather() {
    return {
      location: 'New York',
      country: 'US',
      temperature: 22,
      feelsLike: 25,
      description: 'partly cloudy',
      humidity: 65,
      windSpeed: 12,
      windDirection: 230,
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      icon: '02d',
      timestamp: Date.now(),
    };
  }

  private getMockHistoricalWeather(days: number) {
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        temperature: {
          min: Math.round(15 + Math.random() * 5),
          max: Math.round(25 + Math.random() * 10),
          avg: Math.round(20 + Math.random() * 8),
        },
        humidity: Math.round(50 + Math.random() * 30),
        windSpeed: Math.round(5 + Math.random() * 15),
        pressure: Math.round(1000 + Math.random() * 30),
        description: ['sunny', 'cloudy', 'rainy', 'partly cloudy'][Math.floor(Math.random() * 4)],
        icon: ['01d', '02d', '10d', '04d'][Math.floor(Math.random() * 4)],
      });
    }
    
    return data;
  }

  private getMockMarineWeather() {
    return {
      location: 'Atlantic Ocean',
      seaTemperature: 18,
      waveHeight: 1.2,
      waveDirection: 210,
      wavePeriod: 6.5,
      visibility: 8,
      windSpeed: 15,
      windDirection: 220,
      tideLevel: 0.8,
      timestamp: Date.now(),
    };
  }

  private getMockLocations(query: string) {
    const mockLocations = [
      { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
      { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
      { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
    ];
    
    return mockLocations.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}