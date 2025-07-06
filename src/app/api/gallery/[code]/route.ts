import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/models/Gallery";
import { connectDB } from "@/lib/mongodb";

type Params = {
  params: {
    code: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  await connectDB();
  const code = params.code;
  const gallery = await Gallery.findOne({ code });

  if (!gallery) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }

  return NextResponse.json(gallery);
}
