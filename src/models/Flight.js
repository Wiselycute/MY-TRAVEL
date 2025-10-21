import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline_name: String,
  flight_number: String,
  origin_airport: String,
  destination_airport: String,
  departure_time: Date,
  arrival_time: Date,
  price: Number,
  available_seats: Number,
   image: String,
});

export default mongoose.models.Flight || mongoose.model("Flight", flightSchema);
