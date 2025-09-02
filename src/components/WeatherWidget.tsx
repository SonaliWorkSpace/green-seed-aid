import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

const WeatherWidget = () => {
  // Mock weather data - in real app this would come from an API
  const weatherData = {
    location: 'Your Location',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: 'Today', high: 32, low: 24, icon: Sun, condition: 'Sunny' },
      { day: 'Tomorrow', high: 29, low: 22, icon: CloudRain, condition: 'Rain' },
      { day: 'Day 3', high: 31, low: 25, icon: Cloud, condition: 'Cloudy' }
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return Sun;
      case 'rain': return CloudRain;
      case 'cloudy': return Cloud;
      default: return Sun;
    }
  };

  const CurrentIcon = getWeatherIcon(weatherData.condition);

  return (
    <div className="farmer-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground">Weather Forecast</h3>
        <CurrentIcon className="w-8 h-8 text-sky-blue" />
      </div>
      
      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{weatherData.location}</p>
            <p className="text-3xl font-bold text-foreground">{weatherData.temperature}°C</p>
            <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-sky-blue" />
              <span>{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <span>{weatherData.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">3-Day Forecast</h4>
        {weatherData.forecast.map((day, index) => {
          const DayIcon = day.icon;
          return (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center gap-3">
                <DayIcon className="w-5 h-5 text-sky-blue" />
                <span className="font-medium">{day.day}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{day.condition}</span>
                <div className="text-right">
                  <span className="font-semibold">{day.high}°</span>
                  <span className="text-muted-foreground">/{day.low}°</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Farming Tip based on weather */}
      <div className="mt-4 p-3 bg-secondary rounded-lg">
        <p className="text-sm text-secondary-foreground">
          <strong>Farming Tip:</strong> Good weather for field work today. Consider watering crops in the evening.
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;