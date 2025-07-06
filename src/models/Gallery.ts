import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  public_id: String,
  url: String,
  caption: String,
  order: Number,
});
const GallerySchema = new mongoose.Schema({
  title: String,
  type: String,
  code: { type: String, unique: true },
  photos: [photoSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema, "gallery");
