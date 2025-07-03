import { connectDB } from "./mongodb";
import Logo from "@/models/Logo";

export async function getLogo() {
  await connectDB();
  return await Logo.findOne().sort({ createdAt: -1 }).lean();
}
