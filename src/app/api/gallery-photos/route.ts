import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import GalleryPhotos from "@/models/GalleryPhotos";

export async function POST(req: Request) {
  const { type, title, code_title, main_photo, s_photo, t_photo, orientation } = await req.json();

  await connectDB();

  const newImage = await GalleryPhotos.create({ type, title, code_title, main_photo, s_photo, t_photo, orientation });

  return NextResponse.json({ success: true, logo: newImage });
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const images = await GalleryPhotos.find(type ? { type } : {}).sort({ createdAt: -1 });

  return NextResponse.json(images ?? null);
}
