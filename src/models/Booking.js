import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  booking_type: { type: String, enum: ["flight", "hotel", "car", "activity", "insurance", "package"] },
  booking_date: { type: Date, default: Date.now },
  status: { type: String, enum: ["confirmed", "cancelled", "pending"], default: "pending" },
  total_amount: Number,
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
