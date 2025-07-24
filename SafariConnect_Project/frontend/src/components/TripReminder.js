import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TripReminder = ({ trip }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tripDate = new Date(trip.startDate);
      const difference = tripDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [trip.startDate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (isExpired) return 'bg-gray-100 border-gray-300';
    if (timeLeft.days <= 1) return 'bg-red-100 border-red-300';
    if (timeLeft.days <= 7) return 'bg-yellow-100 border-yellow-300';
    return 'bg-green-100 border-green-300';
  };

  const getStatusText = () => {
    if (isExpired) return 'Trip has started!';
    if (timeLeft.days === 0 && timeLeft.hours === 0) return 'Starting soon!';
    if (timeLeft.days === 0) return 'Today!';
    if (timeLeft.days === 1) return 'Tomorrow!';
    return `${timeLeft.days} days to go`;
  };

  const getPriorityIcon = () => {
    if (isExpired) return '🎯';
    if (timeLeft.days <= 1) return '🚨';
    if (timeLeft.days <= 7) return '⚠️';
    return '📅';
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${getStatusColor()} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{getPriorityIcon()}</span>
            <h3 className="text-lg font-semibold text-gray-800">{trip.destination}</h3>
          </div>
          
          <p className="text-gray-600 mb-2">
            📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </p>
          
          <p className="text-gray-600 mb-2">
            👥 Group Size: {trip.groupSize} people
          </p>
          
          {trip.interests && (
            <p className="text-gray-600 mb-3">
              🎯 {trip.interests}
            </p>
          )}

          <div className="flex items-center space-x-4 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              trip.lookingForCompanion 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {trip.lookingForCompanion ? '🔍 Looking for companions' : 'Solo trip'}
            </span>
            
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {trip.travelStyle}
            </span>
          </div>
        </div>

        <div className="text-right">
          {!isExpired && (
            <div className="mb-2">
              <div className="text-2xl font-bold text-blue-600">
                {timeLeft.days > 0 ? timeLeft.days : timeLeft.hours > 0 ? timeLeft.hours : timeLeft.minutes}
              </div>
              <div className="text-xs text-gray-500">
                {timeLeft.days > 0 ? 'days' : timeLeft.hours > 0 ? 'hours' : 'minutes'}
              </div>
            </div>
          )}
          
          <div className="text-sm font-medium text-gray-700">
            {getStatusText()}
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button 
          onClick={() => {
            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Safari Trip: ${trip.destination}`)}&dates=${trip.startDate.split('T')[0]}/${trip.endDate.split('T')[0]}&details=${encodeURIComponent(`Safari adventure to ${trip.destination}\nGroup Size: ${trip.groupSize}\nInterests: ${trip.interests || 'Not specified'}`)}&location=${encodeURIComponent(trip.destination)}&sf=true&output=xml`;
            window.open(calendarUrl, '_blank');
          }}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          📅 Add to Calendar
        </button>
        
        <Link 
          to="/matchmaking" 
          className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700 transition-colors text-center"
        >
          💕 Find Companions
        </Link>
      </div>

      {timeLeft.days <= 7 && !isExpired && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          ⚠️ Your trip is coming up soon! Make sure to pack your essentials and check your travel documents.
        </div>
      )}
    </div>
  );
};

export default TripReminder; 