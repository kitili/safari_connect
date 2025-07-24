import React from 'react';

const TripPlanner = () => {
  const itinerary = [
    { date: '2025-07-01', activity: 'Safari Drive', location: 'Maasai Mara' },
    { date: '2025-07-02', activity: 'Beach Day', location: 'Diani' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-10 px-4">
      <h2 className="text-4xl font-extrabold text-center text-green-800 mb-10">Your Trip Itinerary 📅</h2>
      <ul className="max-w-3xl mx-auto space-y-6">
        {itinerary.map((item, i) => (
          <li key={i} className="relative pl-12 bg-white p-4 rounded-xl shadow-md">
            <div className="absolute top-5 left-4 w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="text-lg font-semibold text-blue-800">{item.date}</div>
            <div className="text-gray-700 mt-1">
              {item.activity} <span className="italic">at</span> <strong>{item.location}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripPlanner;
