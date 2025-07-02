import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import GalleryTypes from "@/models/GalleryTypes";

export async function POST(req: Request) {
  const { type, type_show } = await req.json();

  await connectDB();

  const newGalleryType = await GalleryTypes.create({ type, type_show });

  return NextResponse.json({ success: true, gallery_type: newGalleryType });
}

export async function GET() {
  await connectDB();

  const galleryTypes = await GalleryTypes.find().sort({ createdAt: 1 });
  return NextResponse.json(galleryTypes ?? null);
}
