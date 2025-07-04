import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Users from "@/models/Users";

export async function POST(req: Request) {
  const { name, profile_photo, email, user, password } = await req.json();

  await connectDB();

  const newUser = await Users.create({ name, profile_photo, email, user, password });

  return NextResponse.json({ success: true, new_user: newUser });
}

export async function GET() {
  await connectDB();
  //   const { searchParams } = new URL(req.url);
  //   const type = searchParams.get("type");

  const users = await Users.find().sort({ createdAt: -1 });

  return NextResponse.json(users ?? null);
}
