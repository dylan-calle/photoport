import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import HomeImage from "@/models/HomeImage";

export async function POST(req: Request) {
  const { public_id, url, type } = await req.json();

  await connectDB();

  const newImage = await HomeImage.create({ public_id, url, type });

  return NextResponse.json({ success: true, logo: newImage });
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const images = await HomeImage.find(type ? { type } : {}).sort({ createdAt: -1 });

  return NextResponse.json(images ?? null);
}
