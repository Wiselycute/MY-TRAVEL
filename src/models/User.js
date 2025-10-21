import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone_number: String,
  password_hash: String,
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  address: String,
  date_joined: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
