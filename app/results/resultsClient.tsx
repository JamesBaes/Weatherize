'use client';

import ForecastCard from '../components/ForecastCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getWeatherData } from '../utils/fetchWeather';
import Link from 'next/link';

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getWeatherData(city, API_KEY);
        setForecast(result.data);
        const currentWeatherCondition = result.data[0].day.condition.text.toLowerCase();
        setBackgroundColor(getBackgroundColorForWeather(currentWeatherCondition));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (city) fetchData();
  }, [city]);

  const getBackgroundColorForWeather = (condition) => {
    const lower = condition.toLowerCase();
    switch (true) {
      case lower.includes("sunny") || lower.includes("clear"):
        return "linear-gradient(to bottom, #87CEEB, #ADD8E6)";
      case lower.includes("cloudy") || lower.includes("overcast"):
        return "linear-gradient(to bottom, #B0B0B0, #D3D3D3)";
      case lower.includes("rain") || lower.includes("showers") || lower.includes("patchy"):
        return "linear-gradient(to bottom, #2F4F4F, #1E90FF)";
      case lower.includes("snow"):
        return "linear-gradient(to bottom, #2F4F4F, #FFFFFF)";
      default:
        return "linear-gradient(to bottom, #F5F5F5, #F5F5F5)";
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen" style={{ background: backgroundColor }}>
      <main>
        <div className="bg-white p-6 flex items-center justify-between">
          <div className="flex gap-2 flex-1/2">
            <img
              src="/image.png"
              alt="Logo"
              title="Weatherize Logo"
              width="35px"
              className="ml-8 w-9 h-8"
            />
            <h1 className="font-semibold text-black text-4xl">Weatherize</h1>
          </div>

          <div className="w-full flex justify-end gap-10">
            <Link
              href="/"
              className="font-semibold text-black text-xl hover:text-blue-600"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            7-Day Forecast for {city}
          </h1>
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
      </main>
    </div>
  );
}
