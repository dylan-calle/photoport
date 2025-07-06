import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/models/Gallery";
//import GalleryPhotos from "@/models/GalleryPhotos";
import { connectDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";

type Params = Promise<{ code: string }>;
type Photo = {
  url: string;
  order: number;
  public_id: string;
};

export async function POST(req: NextRequest, segmentData: { params: Params }) {
  await connectDB();
  const params = await segmentData.params;
  const code = params.code;

  const body = await req.json();
  const { public_id } = body;

  if (!public_id) {
    return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
  }

  const collection = await Gallery.findOne({ code });
  if (!collection) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Cloudinary delete failed", error);
    return NextResponse.json({ error: "Failed to delete photo from Cloudinary" }, { status: 500 });
  }

  collection.photos = collection.photos.filter((photo: Photo) => photo.public_id !== public_id);
  await collection.save();

  return NextResponse.json({ success: true, message: "Photo deleted" });
}
