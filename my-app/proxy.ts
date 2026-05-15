import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/app/lib/auth";

const adminOnlyPaths = [
  "/Dashboard/Teacher/edit",
  "/Dashboard/Teacher/add",
  "/Dashboard/Student/edit",
  "/Dashboard/Student/add",
  "/Dashboard/dean/edit",
  "/Dashboard/dean/add",
  "/Dashboard/faculty/edit",
  "/Dashboard/faculty/add",
  "/Dashboard/class/edit",
  "/Dashboard/class/add",
];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;
  const verified = token ? await verifyAuth(token) : null;

  if (pathname.startsWith("/auth")) {
    if (verified) {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (!verified) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const isAdminOnly = adminOnlyPaths.some((path) => pathname.startsWith(path));
  if (isAdminOnly && verified.role !== "admin") {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
