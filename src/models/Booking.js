import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  booking_type: { 
    type: String, 
    enum: ["flight", "hotel", "car", "activity", "insurance", "package"], 
    required: true 
  },
  booking_date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ["confirmed", "cancelled", "pending", "paid"], 
    default: "pending" 
  },
  total_amount: Number,

  // Link payment
  payment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },

  // car details
  car_details: {
    model: String,
    category: String,
    price_per_day: Number,
    number_of_days: Number,
    image: String,
  },
  // hotel details
  hotel_details: {
    name: String,
    room_type: String,
    price_per_night: Number,
    number_of_nights: Number,
    image: String,
  },
  // flight details
  flight_details: {
    airline: String,
    destination: String,
    departure: String,
    ticket_price: Number,
    image: String,
  },
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
