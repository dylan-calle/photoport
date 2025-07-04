import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const cookieStore = req.cookies;
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ msg: "No token provided" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ msg: "Success", data: decoded });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Invalid token" }, { status: 401 });
  }
}
