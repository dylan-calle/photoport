import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromToken() {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch {
    return null;
  }
}
