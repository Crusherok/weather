import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

export const ApiKeyBanner: React.FC = () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const isValidKey = apiKey && apiKey !== 'demo_key' && apiKey.length > 10;

  if (isValidKey) {
    return null;
  }

  return (
    <div className="glass-card p-4 rounded-xl border-2 border-yellow-400/30 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">Demo Mode Active</h3>
          <p className="text-white/80 text-sm mb-3">
            You're viewing sample weather data. To get real-time weather information, add your free OpenWeatherMap API key.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Get Free API Key
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/yourusername/weathercast#quick-start"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
            >
              Setup Instructions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
