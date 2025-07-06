import { connectDB } from "./mongodb";
import Gallery from "@/models/Gallery";

export async function getGalleryByCode(code: string) {
  await connectDB();
  return await Gallery.findOne({ code });
}
