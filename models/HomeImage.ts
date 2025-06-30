import mongoose from "mongoose";

const HomeImageSchema = new mongoose.Schema({
  public_id: String,
  url: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.HomeImage || mongoose.model("HomeImage", HomeImageSchema, "home_photos");
