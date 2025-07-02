import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PricingTypes from "@/models/PricingTypes";

export async function POST(req: Request) {
  const { type, type_show } = await req.json();

  await connectDB();

  const newPricingType = await PricingTypes.create({ type, type_show });

  return NextResponse.json({ success: true, pricing_type: newPricingType });
}

export async function GET() {
  await connectDB();

  const pricingTypes = await PricingTypes.find().sort({ createdAt: -1 }); // get the latest

  return NextResponse.json(pricingTypes ?? null);
}
