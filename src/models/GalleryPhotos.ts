import mongoose from "mongoose";

const GalleryPhotosSchema = new mongoose.Schema({
  type: String,
  title: String,
  code_title: String,
  main_photo: String,
  s_photo: String,
  t_photo: String,
  orientation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.GalleryPhotos || mongoose.model("GalleryPhotos", GalleryPhotosSchema, "gallery_photos");
