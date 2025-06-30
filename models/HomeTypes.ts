import mongoose from "mongoose";

const HomeTypesSchema = new mongoose.Schema({
  type: String,
  type_show: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.HomeTypes || mongoose.model("HomeTypes", HomeTypesSchema, "types_home");
