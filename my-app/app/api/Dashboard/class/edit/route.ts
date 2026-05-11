import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Class id is required" },
      { status: 400 }
    );
  }

  const classItem = await prisma.schoolClass.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      teacher: true,
    },
  });

  return Response.json(classItem);
}

export async function PUT(request: Request) {
  const { id, name, teacherId } = await request.json();

  if (!id || !name || !teacherId) {
    return Response.json(
      { error: "Id, name and teacherId are required" },
      { status: 400 }
    );
  }

  const updatedClass = await prisma.schoolClass.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      teacherId: Number(teacherId),
    },
  });

  return Response.json(updatedClass);
}