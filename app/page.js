"use client";

import { useEffect, useState } from "react";
import ForecastCard from "../app/components/ForecastCard";
import { getWeatherData } from "../app/utils/fetchWeather";
import { headerFont } from "./layout.js";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [randomCity, setRandomCity] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("");

  const cities = [
    "Tokyo",
    "Delhi",
    "Shanghai",
    "São Paulo",
    "Mexico City",
  ];

  const getRandomCity = () => {
    const randomCityName = cities[Math.floor(Math.random() * cities.length)];
    setRandomCity(randomCityName);
  };

  useEffect(() => {
    if (randomCity) {
      const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await getWeatherData(randomCity, process.env.NEXT_PUBLIC_WEATHER_API_KEY);
          setForecast(result.data);

          const currentWeatherCondition = result.data[0].day.condition.text.toLowerCase();
          setBackgroundColor(getBackgroundColorForWeather(currentWeatherCondition));

        } catch (err) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [randomCity]);

  const getBackgroundColorForWeather = (condition) => {
    const lowerCaseCondition = condition.toLowerCase();
  
    switch (true) {
      case lowerCaseCondition.includes("sunny") || lowerCaseCondition.includes("clear"):
        return "linear-gradient(to bottom, #87CEEB, #ADD8E6)";
  
      case lowerCaseCondition.includes("cloudy") || lowerCaseCondition.includes("overcast"):
        return "linear-gradient(to bottom, #2F4F4F, #B0B0B0)";
  
      case lowerCaseCondition.includes("rainy") || lowerCaseCondition.includes("showers") || lowerCaseCondition.includes("patchy") || lowerCaseCondition.includes("patchy rain nearby"):
        return "linear-gradient(to bottom, #2F4F4F, #1E90FF)";
  
      case lowerCaseCondition.includes("snow"):
        return "linear-gradient(to bottom, #2F4F4F, #FFFFFF)";
  
      default:
        return "linear-gradient(to bottom, #F5F5F5, #F5F5F5)";
    }
  };
  

  useEffect(() => {
    getRandomCity();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/results?city=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: backgroundColor }}>
      <main>
        <div className="bg-white p-6 flex">
          <div className="flex gap-2 flex-1/2">
            <img
              src="/image.png"
              alt="Logo"
              title="Weatherize Logo"
              width="35px"
              className="ml-8 w-9 h-8"
            />
            <h1
              className={`${headerFont.className} font-semibold text-black text-4xl`}
            >
              Weatherize
            </h1>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="mx-auto">
              <form className="flex items-center" onSubmit={handleSubmit}>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Display the randomly chosen city's name */}
        <div className="flex justify-center mt-10">
          {loading && <p>Loading forecast...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && randomCity && (
            <h2 className="text-2xl font-semibold text-center mt-4">
              7-Day Forecast for {randomCity}
            </h2>
          )}
        </div>

        {/* Forecast Cards for the random city */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mt-6">
          {forecast.length > 0 &&
            forecast.map((day) => (
              <ForecastCard
                key={day.date}
                date={day.date}
                temp={day.day.avgtemp_c}
                conditionText={day.day.condition.text}
                iconUrl={`https:${day.day.condition.icon}`}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
