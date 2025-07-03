import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema({
  public_id: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Logo || mongoose.model("Logo", LogoSchema);
