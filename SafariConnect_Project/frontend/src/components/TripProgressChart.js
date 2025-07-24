import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TripProgressChart = ({ tripData }) => {
  if (!tripData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500">Loading trip data...</div>
      </div>
    );
  }

  const { trips, destinations, monthlyTrips, tripStatus } = tripData;

  // Format trip status data for pie chart
  const statusData = [
    { name: 'Completed', value: tripStatus?.completed || 0 },
    { name: 'Upcoming', value: tripStatus?.upcoming || 0 },
    { name: 'Planning', value: tripStatus?.planning || 0 },
    { name: 'Cancelled', value: tripStatus?.cancelled || 0 }
  ];

  // Format monthly trips data
  const monthlyData = monthlyTrips?.map(item => ({
    month: item.month,
    trips: item.count
  })) || [];

  // Format destination popularity
  const destinationData = destinations?.map(dest => ({
    destination: dest.name,
    visits: dest.visitCount || 1
  })) || [];

  return (
    <div className="space-y-6">
      {/* Trip Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Trip Status Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trip Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="trips" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trip Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Trip Planning Timeline</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
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

      {/* Popular Destinations */}
      {destinationData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Most Visited Destinations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={destinationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="destination" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Trip Planning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{trips?.length || 0}</div>
          <div className="text-sm opacity-90">Total Trips</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{tripStatus?.upcoming || 0}</div>
          <div className="text-sm opacity-90">Upcoming</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{tripStatus?.completed || 0}</div>
          <div className="text-sm opacity-90">Completed</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{destinations?.length || 0}</div>
          <div className="text-sm opacity-90">Destinations</div>
        </div>
      </div>
    </div>
  );
};

export default TripProgressChart; 