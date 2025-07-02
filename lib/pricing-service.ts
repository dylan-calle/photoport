import { connectDB } from "./mongodb";
import Pricing from "@/models/Pricing";

export async function getPricing(type_: string) {
  await connectDB();
  return await Pricing.find(type_ ? { type: type_ } : {}).sort({ createdAt: 1 });
}
