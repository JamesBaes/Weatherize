// components/ForecastCard.tsx
import React from 'react';

type ForecastCardProps = {
  date: number;
  temp: number;
  description: string;
  icon: string;
};

export default function ForecastCard({ date, temp, description, icon }: ForecastCardProps) {
  const formattedDate = new Date(date * 1000).toLocaleDateString();

  return (
    <div className="p-4 border rounded-xl shadow-md text-center">
      <p className="font-semibold">{formattedDate}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
      <p className="text-lg">{temp}°C</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
