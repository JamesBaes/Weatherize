"use client"

import ForecastCard from '../components/ForecastCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getWeatherData } from '../utils/fetchWeather';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getWeatherData(city, API_KEY);
        setForecast(result.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (city) fetchData();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">7-Day Forecast for {city}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {forecast.map((day) => (
          <ForecastCard
            key={day.date}
            date={day.date}
            temp={day.day.avgtemp_c}
            conditionText={day.day.condition.text}
            iconUrl={`https:${day.day.condition.icon}`}
          />
        ))}
      </div>
    </div>
  );
}
