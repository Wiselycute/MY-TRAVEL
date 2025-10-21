import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  provider_name: String,
  policy_name: String,
  coverage_details: String,
  price: Number,
  validity_period: String,
  terms_conditions: String,
});

export default mongoose.models.Insurance || mongoose.model("Insurance", insuranceSchema);
