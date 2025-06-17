import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function POST(req: Request) {
  const { file, title } = await req.json();

  const uploadRes = await cloudinary.uploader.upload(file, {
    folder: "portfolio",
  });

  await connectDB();
  const newImage = await Image.create({
    public_id: uploadRes.public_id,
    url: uploadRes.secure_url,
    title,
  });

  return NextResponse.json({ success: true, image: newImage });
}
