import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const UserProgressChart = ({ userData }) => {
  if (!userData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500">Loading your progress...</div>
      </div>
    );
  }

  const { trips, matches, destinations, monthlyActivity } = userData;

  // Format trip data for chart
  const tripData = trips?.map(trip => ({
    month: new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short' }),
    trips: 1,
    destination: trip.destination
  })) || [];

  // Group trips by month
  const monthlyTrips = tripData.reduce((acc, trip) => {
    const month = trip.month;
    if (acc[month]) {
      acc[month].trips += 1;
    } else {
      acc[month] = { month, trips: 1 };
    }
    return acc;
  }, {});

  const monthlyTripData = Object.values(monthlyTrips);

  // Match success data
  const matchData = [
    { name: 'Successful Matches', value: matches?.filter(m => m.status === 'active').length || 0 },
    { name: 'Pending Matches', value: matches?.filter(m => m.status === 'pending').length || 0 },
    { name: 'Total Matches', value: matches?.length || 0 }
  ];

  // Destination preferences
  const destinationData = destinations?.map(dest => ({
    destination: dest.name,
    visits: dest.visitCount || 1
  })) || [];

  // Activity radar chart data
  const activityData = [
    { subject: 'Trips Planned', A: trips?.length || 0, fullMark: 10 },
    { subject: 'Matches Made', A: matches?.length || 0, fullMark: 10 },
    { subject: 'Destinations Visited', A: destinations?.length || 0, fullMark: 10 },
    { subject: 'Chat Activity', A: monthlyActivity?.chatMessages || 0, fullMark: 50 },
    { subject: 'Profile Completion', A: userData.profileCompletion || 0, fullMark: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Trip Activity Over Time */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Trip Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyTripData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="trips"
              stroke="#8884d8"
              strokeWidth={3}
              dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Match Success Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Match Success Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={matchData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {matchData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={activityData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
              <Radar
                name="Your Activity"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Destinations */}
      {destinationData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Favorite Destinations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={destinationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="destination" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{trips?.length || 0}</div>
          <div className="text-sm opacity-90">Total Trips</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{matches?.length || 0}</div>
          <div className="text-sm opacity-90">Matches Made</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{destinations?.length || 0}</div>
          <div className="text-sm opacity-90">Destinations</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{userData.profileCompletion || 0}%</div>
          <div className="text-sm opacity-90">Profile Complete</div>
        </div>
      </div>
    </div>
  );
};

export default UserProgressChart; 