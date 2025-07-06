import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Gallery from "@/models/Gallery";
import GalleryPhotos from "@/models/GalleryPhotos";
import { connectDB } from "@/lib/mongodb"; // your mongo connection util
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("photos") as File[];
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;

  await connectDB();

  const code =
    title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "_") +
    "_" +
    uuidv4().slice(0, 3);
  const uploadedPhotos = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64String, {
      folder: `gallery/${code}`,
    });

    uploadedPhotos.push({
      public_id: result.public_id,
      url: result.secure_url,
      caption: `Photo ${i + 1}`,
      order: i + 1,
    });
  }

  const newGallery = new Gallery({
    title,
    type,
    code,
    photos: uploadedPhotos,
  });

  //update mongodb (gallery)
  await newGallery.save();

  //upload mongodb so that it cna appear in the preview of the photoshot (gallery_photos)
  const newImageThree = await GalleryPhotos.create({
    type,
    title,
    code_title: code,
    main_photo: uploadedPhotos[0].url,
    s_photo: uploadedPhotos[1]?.url || null,
    t_photo: uploadedPhotos[2]?.url || null,
    orientation: "landscape",
  });

  return NextResponse.json({ success: true, gallery: newGallery, galleryThree: newImageThree });
}
