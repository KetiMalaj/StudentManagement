import { cookies } from "next/headers";
import { verifyAuth } from "@/app/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ role: null }, { status: 401 });
  }

  const payload = await verifyAuth(token);

  if (!payload) {
    return Response.json({ role: null }, { status: 401 });
  }

  return Response.json({ role: payload.role });
}
