import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Logo from "@/models/Logo";

export async function POST(req: Request) {
  const { public_id, url } = await req.json();

  await connectDB();

  const newLogo = await Logo.create({ public_id, url });

  return NextResponse.json({ success: true, logo: newLogo });
}

export async function GET() {
  await connectDB();

  const logo = await Logo.findOne().sort({ createdAt: -1 }); // get the latest

  return NextResponse.json(logo);
}
