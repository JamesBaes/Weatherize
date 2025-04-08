export async function getWeatherData(city: string, apiKey: string) {
    // Get coordinates
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error('City not found');
  
    const { lat, lon } = geoData[0];
  
    // Get weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
    );
    const weatherData = await weatherRes.json();
    return { city: geoData[0].name, data: weatherData.daily.slice(0, 7) }; // first 7 days
}
  