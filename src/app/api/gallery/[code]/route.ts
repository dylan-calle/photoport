import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/models/Gallery";
import GalleryPhotos from "@/models/GalleryPhotos";
import { connectDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";

type Params = Promise<{ code: string }>;

export async function GET(req: NextRequest, segmentData: { params: Params }) {
  await connectDB();
  const params = await segmentData.params;
  const code = params.code;
  const gallery = await Gallery.findOne({ code });

  if (!gallery) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }

  return NextResponse.json(gallery);
}

export async function DELETE(req: NextRequest, segmentData: { params: Params }) {
  await connectDB();
  const params = await segmentData.params;
  const code = params.code;

  const collection = await Gallery.findOne({ code });
  if (!collection) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }

  for (const photo of collection.photos) {
    try {
      await cloudinary.uploader.destroy(photo.public_id);
    } catch (error) {
      console.error(`Failed to delete Cloudinary photo: ${photo.public_id}`, error);
    }
  }

  await Gallery.findOneAndDelete({ code });
  await GalleryPhotos.findOneAndDelete({ code_title: code });

  return NextResponse.json({ success: true, message: "Collection deleted." }, { status: 200 });
}
