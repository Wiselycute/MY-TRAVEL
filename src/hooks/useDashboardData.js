"use client";
import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [data, setData] = useState({
    stats: {
      totalBookings: { value: 0, change: 0 },
      activeUsers: { value: 0, change: 0 },
      availableHotels: { value: 0, change: 0 },
      activeTours: { value: 0, change: 0 }
    },
    bookingTrends: {
      labels: [],
      datasets: []
    },
    customerAcquisition: {
      labels: [],
      datasets: []
    },
    revenue: {
      labels: [],
      datasets: []
    }
  });

  const fetchDashboardData = async () => {
    try {
      // Fetch bookings data
      const bookingsResponse = await fetch('/api/bookings');
      const bookings = await bookingsResponse.json();

      // Fetch users data
      const usersResponse = await fetch('/api/users');
      const users = await usersResponse.json();

      // Fetch hotels data
      const hotelsResponse = await fetch('/api/hotels');
      const hotels = await hotelsResponse.json();

      // Fetch tours data
      const toursResponse = await fetch('/api/tours');
      const tours = await toursResponse.json();

      // Process and update data
      setData({
        stats: {
          totalBookings: {
            value: bookings.total || 0,
            change: calculateChange(bookings.total, bookings.previousTotal)
          },
          activeUsers: {
            value: users.active || 0,
            change: calculateChange(users.active, users.previousActive)
          },
          availableHotels: {
            value: hotels.available || 0,
            change: calculateChange(hotels.available, hotels.previousAvailable)
          },
          activeTours: {
            value: tours.active || 0,
            change: calculateChange(tours.active, tours.previousActive)
          }
        },
        bookingTrends: generateBookingTrendsData(bookings.trends),
        customerAcquisition: generateCustomerData(users.acquisition),
        revenue: generateRevenueData(bookings.revenue)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
};

// Helper functions
const calculateChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

const generateBookingTrendsData = (trends = {}) => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Hotels',
      data: trends.hotels || Array(12).fill(0),
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f680',
    },
    {
      label: 'Flights',
      data: trends.flights || Array(12).fill(0),
      borderColor: '#10b981',
      backgroundColor: '#10b98180',
    },
    {
      label: 'Tours',
      data: trends.tours || Array(12).fill(0),
      borderColor: '#f59e0b',
      backgroundColor: '#f59e0b80',
    }
  ],
});

const generateCustomerData = (acquisition = {}) => ({
  labels: ['Direct', 'Social Media', 'Partners', 'Others'],
  datasets: [{
    data: [
      acquisition.direct || 0,
      acquisition.social || 0,
      acquisition.partners || 0,
      acquisition.others || 0
    ],
    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'],
  }],
});

const generateRevenueData = (revenue = {}) => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Revenue',
    data: revenue.monthly || Array(12).fill(0),
    backgroundColor: '#3b82f6',
  }],
});