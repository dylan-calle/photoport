import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Pricing from "@/models/Pricing";

export async function POST(req: Request) {
  const { name, price, currency_abrv, label, benefits, popular, type } = await req.json();

  await connectDB();
  const newPricing = await Pricing.create({
    name,
    price,
    currency_abrv,
    label,
    benefits,
    popular,
    type,
  });

  return NextResponse.json({ success: true, pricing: newPricing });
}
export async function GET() {
  await connectDB();

  const pricingList = await Pricing.find().sort({ createdAt: 1 }); // get the latest

  return NextResponse.json(pricingList ?? null);
}
