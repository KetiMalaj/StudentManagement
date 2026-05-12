import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  const { facultyName, facultyHead } = await request.json();

  if (!facultyName || !facultyHead) {
    return Response.json(
      { error: "Faculty name and faculty head are required" },
      { status: 400 }
    );
  }

  const faculty = await prisma.faculty.create({
    data: {
      facultyName,
      facultyHead,
    },
  });

  return Response.json(faculty, { status: 201 });
}