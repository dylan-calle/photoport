import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "accessToken",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
