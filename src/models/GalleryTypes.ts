import mongoose from "mongoose";

const GalleryTypesSchema = new mongoose.Schema({
  type: String,
  type_show: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.GalleryTypes || mongoose.model("GalleryTypes", GalleryTypesSchema, "types_gallery");
