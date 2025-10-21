import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  payment_date: { type: Date, default: Date.now },
  payment_method: { type: String, enum: ["card", "paypal", "mobile_money"] },
  payment_status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
});

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
