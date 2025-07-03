import { connectDB } from "./mongodb";
import GalleryPhotos from "@/models/GalleryPhotos";

export async function getGalleryPhotos(type_: string) {
  await connectDB();
  return await GalleryPhotos.find(type_ ? { type: type_ } : {}).sort({ createdAt: 1 });
}
