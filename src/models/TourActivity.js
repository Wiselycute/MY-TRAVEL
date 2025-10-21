import mongoose from "mongoose";

const tourActivitySchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  category: { type: String, enum: ["sightseeing", "adventure", "cultural", "food", "other"] },
  price_per_person: Number,
  available_dates: [Date],
  provider_name: String,
  image: String,
});

export default mongoose.models.TourActivity || mongoose.model("TourActivity", tourActivitySchema);
