import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  hotel_name: { type: String, required: true },
  location: { type: String, required: true },
  star_rating: { type: Number, min: 1, max: 5 },
  description: String,
  price_per_night: Number,
  available_rooms: Number,
  image: String,
});

export default mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
