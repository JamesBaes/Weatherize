'use client';

import { useEffect, useState } from 'react';
import ForecastCard from './components/ForecastCard';
import { getWeatherData } from './utils/fetchWeather';

export default function ResultsPage({ searchParams }: { searchParams: { city: string } }) {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const city = searchParams.city;
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWeatherData(city, API_KEY);
        setForecast(res.data);
      } catch (err: any) {
        setError(err.message || 'Error fetching weather data');
      } finally {
        setLoading(false);
      }
    }
    if (city) fetchData();
  }, [city]);

  if (loading) return <p className="p-4">Loading weather...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">7-Day Forecast for {city}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {forecast.map((day, idx) => (
          <ForecastCard
            key={idx}
            date={day.dt}
            temp={Math.round(day.temp.day)}
            description={day.weather[0].description}
            icon={day.weather[0].icon}
          />
        ))}
      </div>
    </div>
  );
}
