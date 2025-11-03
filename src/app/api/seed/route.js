import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import Car from '@/models/Car';
import Hotel from '@/models/Hotel';
import Flight from '@/models/Flight';
import Room from '@/models/Room';
import Insurance from '@/models/Insurance';
import Payment from '@/models/Payment';
import Booking from '@/models/Booking';
import User from '@/models/User';
import TourActivity from '@/models/TourActivity';

// Sample data for each model
const sampleData = {
  cars: [
    {
      provider_name: "Luxury Car Rentals",
      model: "BMW 7 Series",
      category: "luxury",
      seats: 5,
      price_per_day: 199.99,
      availability_status: true,
      image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3"
    },
    {
      provider_name: "Economy Rentals",
      model: "Toyota Corolla",
      category: "economy",
      seats: 5,
      price_per_day: 49.99,
      availability_status: true,
      image: "https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?ixlib=rb-4.0.3"
    },
    {
      provider_name: "Adventure Vehicles",
      model: "Jeep Grand Cherokee",
      category: "SUV",
      seats: 7,
      price_per_day: 129.99,
      availability_status: true,
      image: "https://images.unsplash.com/photo-1625055930842-b9ad84b7facd?ixlib=rb-4.0.3"
    }
  ],
  
  hotels: [
    {
      hotel_name: "Grand Luxury Resort",
      location: "Maldives",
      star_rating: 5,
      description: "Luxury beachfront resort with private villas",
      price_per_night: 599.99,
      available_rooms: 20,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3"
    },
    {
      hotel_name: "City Center Hotel",
      location: "New York",
      star_rating: 4,
      description: "Modern hotel in the heart of Manhattan",
      price_per_night: 299.99,
      available_rooms: 50,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3"
    },
    {
      hotel_name: "Mountain View Lodge",
      location: "Swiss Alps",
      star_rating: 4,
      description: "Cozy mountain retreat with stunning views",
      price_per_night: 399.99,
      available_rooms: 30,
      image: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3"
    }
  ],

  flights: [
    {
      airline_name: "Skyway Airways",
      flight_number: "SK123",
      origin_airport: "JFK",
      destination_airport: "LAX",
      departure_time: new Date("2025-11-01T10:00:00Z"),
      arrival_time: new Date("2025-11-01T13:00:00Z"),
      price: 399.99,
      available_seats: 50,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3"
    },
    {
      airline_name: "Global Airlines",
      flight_number: "GA456",
      origin_airport: "LHR",
      destination_airport: "DXB",
      departure_time: new Date("2025-11-02T15:00:00Z"),
      arrival_time: new Date("2025-11-02T23:00:00Z"),
      price: 799.99,
      available_seats: 30,
      image: "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixlib=rb-4.0.3"
    }
  ],

  rooms: [
    {
      room_type: "suite",
      price: 299.99,
      capacity: 4,
      availability_status: true
    },
    {
      room_type: "double",
      price: 199.99,
      capacity: 2,
      availability_status: true
    },
    {
      room_type: "single",
      price: 149.99,
      capacity: 1,
      availability_status: true
    }
  ],

  insurance: [
    {
      provider_name: "SafeTravel Insurance",
      policy_name: "Premium Coverage",
      coverage_details: "Comprehensive travel insurance including medical, cancellation, and luggage",
      price: 99.99,
      validity_period: "30 days",
      terms_conditions: "Terms and conditions apply"
    },
    {
      provider_name: "Global Protect",
      policy_name: "Basic Coverage",
      coverage_details: "Essential travel insurance with medical and cancellation coverage",
      price: 49.99,
      validity_period: "15 days",
      terms_conditions: "Terms and conditions apply"
    }
  ],

  tourActivities: [
    {
      title: "Historic City Tour",
      location: "Rome, Italy",
      description: "Explore the ancient ruins and historic sites of Rome",
      category: "cultural",
      price_per_person: 89.99,
      available_dates: [
        new Date("2025-11-01"),
        new Date("2025-11-08"),
        new Date("2025-11-15")
      ],
      provider_name: "Italian Heritage Tours",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3"
    },
    {
      title: "Mountain Hiking Adventure",
      location: "Swiss Alps",
      description: "Guided hiking tour through scenic mountain trails",
      category: "adventure",
      price_per_person: 129.99,
      available_dates: [
        new Date("2025-11-02"),
        new Date("2025-11-09"),
        new Date("2025-11-16")
      ],
      provider_name: "Alpine Adventures",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3"
    }
  ],

  users: [
    {
      name: "John Doe",
      email: "john@example.com",
      phone_number: "+1234567890",
      password_hash: "hashed_password_1",
      role: "customer",
      address: "123 Main St, City, Country"
    },
    {
      name: "Admin User",
      email: "admin@example.com",
      phone_number: "+1987654321",
      password_hash: "hashed_password_2",
      role: "admin",
      address: "456 Admin St, City, Country"
    }
  ]
};

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      Car.deleteMany({}),
      Hotel.deleteMany({}),
      Flight.deleteMany({}),
      Room.deleteMany({}),
      Insurance.deleteMany({}),
      Payment.deleteMany({}),
      Booking.deleteMany({}),
      User.deleteMany({}),
      TourActivity.deleteMany({})
    ]);

    // Insert new data
    const insertedHotels = await Hotel.insertMany(sampleData.hotels);
    
    // Add hotel_id to rooms
    const roomsWithHotelId = sampleData.rooms.flatMap(room => 
      insertedHotels.map(hotel => ({
        ...room,
        hotel_id: hotel._id
      }))
    );

    await Promise.all([
      Car.insertMany(sampleData.cars),
      Room.insertMany(roomsWithHotelId),
      Flight.insertMany(sampleData.flights),
      Insurance.insertMany(sampleData.insurance),
      TourActivity.insertMany(sampleData.tourActivities),
      User.insertMany(sampleData.users)
    ]);

    return NextResponse.json({ 
      success: true, 
      message: "Sample data successfully inserted",
      summary: {
        cars: sampleData.cars.length,
        hotels: sampleData.hotels.length,
        flights: sampleData.flights.length,
        rooms: roomsWithHotelId.length,
        insurance: sampleData.insurance.length,
        tourActivities: sampleData.tourActivities.length,
        users: sampleData.users.length
      }
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Error seeding database", 
      error: error.message 
    }, { status: 500 });
  }
}