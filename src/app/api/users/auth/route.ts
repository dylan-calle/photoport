import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/auth/auth";
import Users from "@/models/Users";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    const { user, password } = await req.json();

    await connectDB();

    const foundUser = await Users.findOne({ user }).sort({ createdAt: -1 });

    if (!foundUser) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 404 });
    }

    const isValid = await verifyPassword(password, foundUser.password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }
    const token = jwt.sign(
      { id: foundUser._id, user: foundUser.user, name: foundUser.name, email: foundUser.email },
      JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log("Login successful for user:", foundUser.username);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  //   const { searchParams } = new URL(req.url);
  //   const type = searchParams.get("type");

  const users = await Users.find({ user: "dylan" }).sort({ createdAt: -1 });

  return NextResponse.json(users ?? null);
}
