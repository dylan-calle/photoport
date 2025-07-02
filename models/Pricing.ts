import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({
  name: String,
  price: Number,
  currency_abrv: String,
  label: String,
  benefits: [String],
  popular: Boolean,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema, "pricing");
