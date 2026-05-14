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
      faculty: true,
    },
  });

  return Response.json(classItem);
}

export async function PUT(request: Request) {
  try {
    const { id, name, teacherId, facultyId } = await request.json();

    const updatedClass = await prisma.schoolClass.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        teacherId: Number(teacherId),
        facultyId: facultyId ? Number(facultyId) : null,
      },
    });

    return Response.json(updatedClass);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "P2002") {
      return Response.json(
        { error: "This teacher is already assigned to a class" },
        { status: 409 }
      );
    }
    throw error;
  }
}

