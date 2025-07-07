import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Pricing from "@/models/Pricing";
import PricingTypes from "@/models/PricingTypes";
import { v4 as uuidv4 } from "uuid";

type Block = {
  name: string;
  price: string;
  currency_abrv: string;
  label: string;
  popular: boolean;
  benefits: string[];
};

type Data = {
  type_show: string;
  type: string;
  blocks: Block[];
};

export async function POST(req: Request) {
  const { type_show, blocks }: Data = await req.json();
  const newType =
    type_show
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "_") +
    "_" +
    uuidv4().slice(0, 3);

  await connectDB();

  const newPricingType = await PricingTypes.create({ type: newType, type_show });

  const newPricings = await Promise.all(
    blocks.map((block) =>
      Pricing.create({
        name: block.name,
        price: block.price,
        currency_abrv: block.currency_abrv,
        label: block.label,
        benefits: block.benefits,
        popular: block.popular,
        type: newType,
      })
    )
  );

  return NextResponse.json({ success: true, pricingType: newPricingType, pricings: newPricings });
}

export async function GET() {
  await connectDB();

  const pricingList = await Pricing.find().sort({ createdAt: 1 }); // get the latest

  return NextResponse.json(pricingList ?? null);
}
