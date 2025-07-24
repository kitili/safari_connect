import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMatches, getMatchSuggestions } from '../utils/api';

const Matchmaking = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [filter, setFilter] = useState('all'); // all, high-score, same-destination

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const suggestions = await getMatchSuggestions();
      setMatches(suggestions);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompatibilityBadge = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredMatches = matches.filter(match => {
    if (filter === 'high-score') return match.compatibilityScore >= 70;
    if (filter === 'same-destination') return match.matchDetails?.destinationScore >= 80;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding your perfect travel companions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
            Find Your Travel Companion 💕
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow travelers who share your destinations and travel dates. 
            Start your adventure together!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600">{filteredMatches.length}</div>
            <div className="text-gray-600">Potential Matches</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-green-600">
              {filteredMatches.filter(m => m.compatibilityScore >= 80).length}
            </div>
            <div className="text-gray-600">High Compatibility</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600">
              {filteredMatches.filter(m => m.matchDetails?.dateOverlapScore >= 80).length}
            </div>
            <div className="text-gray-600">Perfect Date Overlap</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full transition ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Matches
          </button>
          <button
            onClick={() => setFilter('high-score')}
            className={`px-6 py-2 rounded-full transition ${
              filter === 'high-score' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            High Compatibility
          </button>
          <button
            onClick={() => setFilter('same-destination')}
            className={`px-6 py-2 rounded-full transition ${
              filter === 'same-destination' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Same Destination
          </button>
        </div>

        {/* Matches Grid */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
            <p className="text-gray-500">
              Try updating your travel plans or check back later for new travelers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <div
                key={match._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* Profile Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {match.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{match.username}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {match.age && (
                          <span className="text-sm text-gray-500">{match.age} years</span>
                        )}
                        {match.gender && match.gender !== 'prefer-not-to-say' && (
                          <span className="text-sm text-gray-500">• {match.gender}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compatibility Score */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Compatibility</span>
                    <span className={`text-lg font-bold ${getCompatibilityColor(match.compatibilityScore)}`}>
                      {match.compatibilityScore}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${match.compatibilityScore}%` }}
                    ></div>
                  </div>

                  {/* Match Details */}
                  <div className="space-y-3">
                    {match.matchDetails && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Date Overlap</span>
                          <span className="font-medium">{match.matchDetails.dateOverlapScore}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Destination</span>
                          <span className="font-medium">{match.matchDetails.destinationScore}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Interests</span>
                          <span className="font-medium">{match.matchDetails.interestCompatibilityScore}%</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Travel Plans */}
                  {match.travelPlans && match.travelPlans.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Travel Plans</h4>
                      {match.travelPlans.slice(0, 2).map((plan, index) => (
                        <div key={index} className="text-sm text-blue-700">
                          <div className="font-medium">{plan.destination}</div>
                          <div className="text-xs">
                            {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interests */}
                  {match.interests && match.interests.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.interests.slice(0, 3).map((interest, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                        {match.interests.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{match.interests.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-3">
                    <Link
                      to={`/chat/${match._id}`}
                      className="flex-1 bg-safari-500 hover:bg-safari-600 text-white py-2 px-4 rounded-lg transition duration-200 font-medium text-center"
                    >
                      💬 Start Chat
                    </Link>
                    <button 
                      onClick={() => setSelectedMatch(match)}
                      className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Match Detail Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Match Details</h2>
                <button 
                  onClick={() => setSelectedMatch(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedMatch.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedMatch.username}</h3>
                    <p className="text-gray-600">
                      {selectedMatch.age && `${selectedMatch.age} years old`}
                      {selectedMatch.gender && selectedMatch.gender !== 'prefer-not-to-say' && ` • ${selectedMatch.gender}`}
                    </p>
                  </div>
                </div>

                {/* Compatibility Breakdown */}
                <div>
                  <h4 className="font-semibold mb-3">Compatibility Breakdown</h4>
                  <div className="space-y-2">
                    {selectedMatch.matchDetails && Object.entries(selectedMatch.matchDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel Plans */}
                {selectedMatch.travelPlans && selectedMatch.travelPlans.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Travel Plans</h4>
                    <div className="space-y-3">
                      {selectedMatch.travelPlans.map((plan, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <div className="font-medium text-blue-800">{plan.destination}</div>
                          <div className="text-sm text-blue-600">
                            {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                          </div>
                          {plan.activities && plan.activities.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-600 mb-1">Activities:</div>
                              <div className="flex flex-wrap gap-1">
                                {plan.activities.map((activity, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                    {activity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {selectedMatch.languages && selectedMatch.languages.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMatch.languages.map((lang, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-200 font-medium">
                    Send Connection Request
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg transition duration-200 font-medium">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matchmaking;
