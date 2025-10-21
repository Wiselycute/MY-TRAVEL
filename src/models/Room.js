import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  room_type: { type: String, enum: ["single", "double", "suite"], required: true },
  price: { type: Number, required: true },
  capacity: Number,
  availability_status: { type: Boolean, default: true },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
