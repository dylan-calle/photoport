import mongoose from "mongoose";

const PricingTypesSchema = new mongoose.Schema({
  type: String,
  type_show: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PricingTypes || mongoose.model("PricingTypes", PricingTypesSchema, "types_pricing");
