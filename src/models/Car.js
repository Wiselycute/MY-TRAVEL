import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  provider_name: String,
  model: String,
  category: { type: String, enum: ["economy", "SUV", "luxury"] },
  seats: Number,
  price_per_day: Number,
  availability_status: { type: Boolean, default: true },
  image: String,
});

export default mongoose.models.Car || mongoose.model("Car", carSchema);
