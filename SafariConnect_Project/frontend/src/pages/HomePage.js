import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserProgressChart from '../components/UserProgressChart';

const HomePage = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [userProgressData, setUserProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTrips: 0,
    upcomingTrips: 0,
    activeMatches: 0,
    savedDestinations: 0
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's trips
      const tripsResponse = await axios.get('http://localhost:5000/api/trips');
      const trips = tripsResponse.data;
      
      // Filter upcoming trips (within next 30 days)
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      
      const upcoming = trips.filter(trip => {
        const tripDate = new Date(trip.startDate);
        return tripDate >= now && tripDate <= thirtyDaysFromNow;
      });

      setUserTrips(trips);
      setUpcomingTrips(upcoming);
      setStats({
        totalTrips: trips.length,
        upcomingTrips: upcoming.length,
        activeMatches: Math.floor(Math.random() * 5) + 1, // Mock data for now
        savedDestinations: Math.floor(Math.random() * 8) + 2
      });

      // Mock recent matches data
      setRecentMatches([
        {
          id: 1,
          name: 'Sarah Johnson',
          destination: 'Maasai Mara',
          date: '2024-01-15',
          compatibility: 92,
          avatar: 'SJ'
        },
        {
          id: 2,
          name: 'Mike Chen',
          destination: 'Diani Beach',
          date: '2024-01-20',
          compatibility: 87,
          avatar: 'MC'
        }
      ]);

      // Prepare user progress data for charts
      setUserProgressData({
        trips: trips,
        matches: recentMatches,
        destinations: [
          { name: 'Maasai Mara', visitCount: 2 },
          { name: 'Diani Beach', visitCount: 1 },
          { name: 'Nairobi National Park', visitCount: 3 }
        ],
        monthlyActivity: {
          chatMessages: 45
        },
        profileCompletion: 85
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilTrip = (tripDate) => {
    const now = new Date();
    const trip = new Date(tripDate);
    const diffTime = trip - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTripStatus = (trip) => {
    const now = new Date();
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    
    if (now < startDate) {
      return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
      return 'ongoing';
    } else {
      return 'completed';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ongoing': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your safari dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
            Welcome to SafariConnect 🦁
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your personal safari adventure hub. Plan trips, find companions, and explore Kenya's wonders.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalTrips}</div>
            <div className="text-gray-600">Total Trips</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.upcomingTrips}</div>
            <div className="text-gray-600">Upcoming Trips</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.activeMatches}</div>
            <div className="text-gray-600">Active Matches</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.savedDestinations}</div>
            <div className="text-gray-600">Saved Destinations</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🚀 Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/explore" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-semibold mb-2">Explore Destinations</h3>
              <p className="text-blue-100">Discover amazing safari locations</p>
            </Link>
            
            <Link 
              to="/matchmaking" 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-3xl mb-3">💕</div>
              <h3 className="text-lg font-semibold mb-2">Find Companions</h3>
              <p className="text-green-100">Connect with fellow travelers</p>
            </Link>
            
            <Link 
              to="/trip-planner" 
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-lg font-semibold mb-2">Plan Trip</h3>
              <p className="text-purple-100">Create your perfect itinerary</p>
            </Link>
          </div>
        </div>

        {/* Upcoming Trips */}
        {upcomingTrips.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Upcoming Trips</h2>
            <div className="space-y-4">
              {upcomingTrips.map((trip) => {
                const daysUntil = getDaysUntilTrip(trip.startDate);
                const status = getTripStatus(trip);
                
                return (
                  <div key={trip._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{trip.destination}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </p>
                        <p className="text-gray-600 mb-2">
                          👥 Group Size: {trip.groupSize} people
                        </p>
                        {trip.interests && (
                          <p className="text-gray-600">
                            🎯 Interests: {trip.interests}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {daysUntil}
                        </div>
                        <div className="text-sm text-gray-500">
                          {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'day to go' : 'days to go'}
                        </div>
                        {trip.lookingForCompanion && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              🔍 Looking for companions
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* User Progress Charts */}
        {userProgressData && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Your Progress Dashboard</h2>
            <UserProgressChart userData={userProgressData} />
          </div>
        )}

        {/* Recent Matches */}
        {recentMatches.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💕 Recent Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentMatches.map((match) => (
                <div key={match.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {match.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{match.name}</h3>
                      <p className="text-gray-600 text-sm">📍 {match.destination}</p>
                      <p className="text-gray-600 text-sm">📅 {formatDate(match.date)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{match.compatibility}%</div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Message
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Trips Message */}
        {userTrips.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">🦁</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready for Your First Safari?</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your adventure by exploring destinations and booking your first safari trip. 
              We'll help you find travel companions and plan the perfect experience.
            </p>
            <div className="space-x-4">
              <Link 
                to="/explore" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Destinations
              </Link>
              <Link 
                to="/matchmaking" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Find Companions
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:support@safariconnect.com" className="text-blue-600 hover:text-blue-800">
              support@safariconnect.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
