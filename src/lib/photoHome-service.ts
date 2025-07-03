import { connectDB } from "./mongodb";
import HomeImage from "@/models/HomeImage";

export async function getPhotoHome(type_: string) {
  await connectDB();
  return await HomeImage.find(type_ ? { type: type_ } : {}).sort({ createdAt: -1 });
}
