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
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminCharts = ({ analyticsData }) => {
  if (!analyticsData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500">Loading charts...</div>
      </div>
    );
  }

  const { userGrowth, matchStats, popularDestinations, genderDistribution } = analyticsData;

  // Format user growth data for chart
  const userGrowthData = userGrowth?.map(item => ({
    period: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
    users: item.count
  })) || [];

  // Format gender distribution data for pie chart
  const genderData = genderDistribution?.map(item => ({
    name: item._id || 'Unknown',
    value: item.count
  })) || [];

  // Format popular destinations data
  const destinationsData = popularDestinations?.slice(0, 8).map(item => ({
    destination: item._id,
    trips: item.count
  })) || [];

  return (
    <div className="space-y-6">
      {/* User Growth Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Match Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Match Success Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Matches:</span>
              <span className="font-semibold text-blue-600">{matchStats?.totalMatches || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Score:</span>
              <span className="font-semibold text-green-600">
                {matchStats?.avgScore ? Math.round(matchStats.avgScore) : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">High Score Matches:</span>
              <span className="font-semibold text-purple-600">{matchStats?.highScoreMatches || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Destinations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={destinationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="destination" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="trips" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity Timeline</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={userGrowthData.slice(-7)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#FF8042"
              strokeWidth={2}
              dot={{ fill: '#FF8042', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminCharts; 