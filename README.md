# WeatherCast - Professional Weather App

A beautiful, production-ready weather application built with React, TypeScript, and Tailwind CSS featuring a stunning glassmorphism design.

## Features

- **Current Weather**: Real-time weather conditions with detailed metrics
- **Historical Weather**: Weather data with customizable date ranges (5-30 days)
- **Marine Weather**: Specialized maritime conditions including waves, tides, and sea temperature
- **Location Search**: Smart location search with geolocation support
- **Responsive Design**: Optimized for all devices and screen sizes
- **Glassmorphism UI**: Modern translucent design with backdrop blur effects

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd weather-app
   npm install
   ```

2. **API Key Setup**
   ```bash
   cp .env.example .env
   ```
   Add your OpenWeatherMap API key to `.env`:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment on Netlify

This app is optimized for Netlify deployment:

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**: Add your `VITE_OPENWEATHER_API_KEY` in site settings
4. **Deploy**: Netlify will automatically deploy on every push

### Manual Deploy
```bash
npm run build
# Upload the 'dist' folder to Netlify or run:
npx netlify deploy --prod --dir=dist
```

## API Integration

The app uses OpenWeatherMap API for weather data:

- **Current Weather**: Real-time conditions
- **Geocoding**: Location search and coordinates
- **Historical Data**: Past weather information (note: requires paid plan for full functionality)
- **Marine Data**: Simulated for demonstration (would require specialized marine API)

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify-optimized

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Glassmorphism effects require modern browsers with backdrop-filter support.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.