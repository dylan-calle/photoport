import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  public_id: String,
  url: String,
  title: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
