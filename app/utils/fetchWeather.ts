export async function getWeatherData(cityQuery, apiKey) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(cityQuery)}&days=7&aqi=no&alerts=no`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    if (!res.ok || !data || !data.forecast) {
      console.error("Invalid weather response:", data);
      throw new Error(data.error?.message || "Weather data unavailable");
    }
  
    return {
      city: data.location.name + ", " + data.location.country,
      data: data.forecast.forecastday, // array of 7 days
    };
  }
  