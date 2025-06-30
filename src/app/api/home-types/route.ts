import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HomeTypes from "@/models/HomeTypes";

export async function POST(req: Request) {
  const { type, type_show } = await req.json();

  await connectDB();

  const newPhotoType = await HomeTypes.create({ type, type_show });

  return NextResponse.json({ success: true, photo_type: newPhotoType });
}

export async function GET() {
  await connectDB();

  const photoTypes = await HomeTypes.find().sort({ createdAt: -1 }); // get the latest

  return NextResponse.json(photoTypes ?? null);
}
