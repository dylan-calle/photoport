import { connectDB } from "./mongodb";
import HomeTypes from "@/models/HomeTypes";

export async function getHomeTypes() {
  await connectDB();
  return await HomeTypes.find().sort({ createdAt: -1 });
}
