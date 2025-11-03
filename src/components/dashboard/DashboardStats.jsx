"use client";
import React from 'react';
import { FaPlane, FaHotel, FaUsers, FaRoute } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { Card } from '../ui/card';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { useDashboardData } from '@/hooks/useDashboardData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ title, value, change, icon: Icon }) => (
  <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </p>
      </div>
      <div className="p-3 bg-blue-500/10 rounded-full">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  </Card>
);

const DashboardStats = () => {
  const { stats, bookingTrends: bookingData, customerAcquisition: customerData, revenue: revenueData } = useDashboardData();

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings.value.toLocaleString()}
          change={stats.totalBookings.change}
          icon={MdEventNote}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers.value.toLocaleString()}
          change={stats.activeUsers.change}
          icon={FaUsers}
        />
        <StatCard
          title="Available Hotels"
          value={stats.availableHotels.value.toLocaleString()}
          change={stats.availableHotels.change}
          icon={FaHotel}
        />
        <StatCard
          title="Active Tours"
          value={stats.activeTours.value.toLocaleString()}
          change={stats.activeTours.change}
          icon={FaRoute}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Booking Trends</h3>
          <Line
            data={bookingData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            }}
          />
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Customer Acquisition</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={customerData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
        <Bar
          data={revenueData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
            },
          }}
        />
      </Card>
    </div>
  );
};

export default DashboardStats;