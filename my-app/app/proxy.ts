import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.headers.get("Authorization")?.split(" ")[1];
  const verified = token ? await verifyAuth(token) : false;

  if (pathname.startsWith("/auth")) {
    if (verified) {
      return NextResponse.redirect(new URL("/Student", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (!verified) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
