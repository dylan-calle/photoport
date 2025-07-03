import { connectDB } from "./mongodb";
import GalleryTypes from "@/models/GalleryTypes";

export async function getGalleryTypes() {
  await connectDB();
  return await GalleryTypes.find().sort({ createdAt: 1 });
}
