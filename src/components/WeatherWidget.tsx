import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, CloudLightning, CloudSnow, Loader2 } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    icon: any;
    condition: string;
  }>;
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setError("Unable to get location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!coordinates) return;

      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        
        // Current weather
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`
        );
        
        // 5 day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`
        );

        if (!currentResponse.ok || !forecastResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        // Process forecast data to get next 3 days
        const dailyForecasts = forecastData.list.reduce((acc: any[], item: any) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!acc.find((f: any) => new Date(f.dt * 1000).toLocaleDateString() === date)) {
            acc.push(item);
          }
          return acc;
        }, []).slice(0, 3);

        setWeatherData({
          location: currentData.name,
          temperature: Math.round(currentData.main.temp),
          condition: currentData.weather[0].main,
          humidity: currentData.main.humidity,
          windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
          forecast: dailyForecasts.map((day: any, index: number) => ({
            day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            high: Math.round(day.main.temp_max),
            low: Math.round(day.main.temp_min),
            icon: getWeatherIcon(day.weather[0].main),
            condition: day.weather[0].main
          }))
        });
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    if (coordinates) {
      fetchWeatherData();
    }
  }, [coordinates]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear': return Sun;
      case 'rain': return CloudRain;
      case 'clouds': return Cloud;
      case 'thunderstorm': return CloudLightning;
      case 'snow': return CloudSnow;
      default: return Cloud;
    }
  };

  const getWeatherAlert = (
    condition: string, 
    temperature: number, 
    windSpeed: number, 
    humidity: number
  ): { message: string; severity: 'success' | 'warning' | 'danger' | 'info' } => {
    // High Wind Speed Warning (above 50 km/h)
    if (windSpeed > 50) {
      return {
        message: "⚠️ DANGER: Extremely high winds detected! Secure all equipment, protect crops, and avoid open fields.",
        severity: 'danger'
      };
    }
    
    // Heavy Rainfall Warning (based on conditions and humidity)
    if (condition.toLowerCase() === 'rain' && humidity > 85) {
      return {
        message: "⚠️ WARNING: Heavy rainfall expected. Risk of flooding - ensure proper drainage and protect crops.",
        severity: 'warning'
      };
    }

    // Extreme Temperature Warnings
    if (temperature > 35) {
      return {
        message: "⚠️ WARNING: Extreme heat conditions! Risk of crop damage - implement shade protection and increase irrigation.",
        severity: 'warning'
      };
    }

    if (temperature < 5) {
      return {
        message: "⚠️ WARNING: Very low temperature alert! Protect sensitive crops from frost damage.",
        severity: 'warning'
      };
    }

    // Drought Conditions (high temperature + low humidity)
    if (temperature > 30 && humidity < 30) {
      return {
        message: "⚠️ CAUTION: Drought conditions detected. Conserve water and maintain soil moisture.",
        severity: 'warning'
      };
    }

    // Perfect Weather Conditions
    if (temperature >= 20 && temperature <= 30 && humidity >= 40 && humidity <= 70 && windSpeed < 20) {
      return {
        message: "✅ Ideal farming conditions! Perfect for field work and crop management.",
        severity: 'success'
      };
    }

    // Default moderate conditions
    return {
      message: "ℹ️ Normal weather conditions. Monitor your crops and adjust care as needed.",
      severity: 'info'
    };
  };

  const getFarmingTip = (condition: string, temperature: number, windSpeed: number) => {
    const tips = [];

    if (condition.toLowerCase() === 'rain') {
      tips.push("• Hold off on irrigation and protect harvested crops");
      tips.push("• Check drainage systems");
    }

    if (temperature > 30) {
      tips.push("• Water crops early morning or evening");
      tips.push("• Consider mulching to retain moisture");
    }

    if (windSpeed > 30) {
      tips.push("• Delay pesticide spraying");
      tips.push("• Support tall crops and young plants");
    }

    if (condition.toLowerCase() === 'clear' && temperature > 25) {
      tips.push("• Provide shade for sensitive crops");
      tips.push("• Monitor soil moisture levels");
    }

    return tips.length > 0 ? tips.join("\\n") : "Monitor conditions and adjust farming activities accordingly.";
  };

  if (loading) {
    return (
      <div className="farmer-card flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-sky-blue" />
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="farmer-card">
        <p className="text-destructive text-sm">{error || 'Unable to load weather data'}</p>
      </div>
    );
  }

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
      
      {/* Weather Alert */}
      {(() => {
        const alert = getWeatherAlert(
          weatherData.condition, 
          weatherData.temperature, 
          weatherData.windSpeed, 
          weatherData.humidity
        );
        const alertColors = {
          danger: 'bg-red-100 border-red-500 text-red-700',
          warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
          success: 'bg-green-100 border-green-500 text-green-700',
          info: 'bg-blue-100 border-blue-500 text-blue-700'
        };
        return (
          <div className={`mt-4 p-3 rounded-lg border-l-4 ${alertColors[alert.severity]}`}>
            <p className="text-sm font-medium">
              {alert.message}
            </p>
          </div>
        );
      })()}

      {/* Farming Tips */}
      <div className="mt-4 p-3 bg-secondary rounded-lg">
        <p className="text-sm font-medium mb-2 text-secondary-foreground">
          <strong>Farming Tips:</strong>
        </p>
        <div className="text-sm text-secondary-foreground whitespace-pre-line">
          {getFarmingTip(weatherData.condition, weatherData.temperature, weatherData.windSpeed)}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;