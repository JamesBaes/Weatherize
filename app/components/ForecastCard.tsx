import React from 'react';

export default function ForecastCard({ date, temp, conditionText, iconUrl }) {
    return (
      <div className="p-4 border rounded-xl shadow-md text-center">
        <p className="font-semibold">{date}</p>
        <img src={iconUrl} alt={conditionText} />
        <p className="text-lg">{temp}°C</p>
        <p className="text-gray-600">{conditionText}</p>
      </div>
    );
  }
