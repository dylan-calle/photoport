import { connectDB } from "./mongodb";
import PricingTypes from "@/models/PricingTypes";

export async function getPricingTypes() {
  await connectDB();
  return await PricingTypes.find().sort({ createdAt: -1 });
}
