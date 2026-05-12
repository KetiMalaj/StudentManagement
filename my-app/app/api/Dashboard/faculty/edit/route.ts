import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Faculty id is required" },
      { status: 400 }
    );
  }

  const faculty = await prisma.faculty.findUnique({
    where: {
      id: Number(id),
    },
  });

  return Response.json(faculty);
}

export async function PUT(request: Request) {
  const { id, facultyName, facultyHead } = await request.json();

  if (!id || !facultyName || !facultyHead) {
    return Response.json(
      { error: "Id, faculty name and faculty head are required" },
      { status: 400 }
    );
  }

  const updatedFaculty = await prisma.faculty.update({
    where: {
      id: Number(id),
    },
    data: {
      facultyName,
      facultyHead,
    },
  });

  return Response.json(updatedFaculty);
}