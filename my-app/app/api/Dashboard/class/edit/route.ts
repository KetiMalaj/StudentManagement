import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  const { id, name, teacherId } = await request.json();

  if (!id || !name || !teacherId) {
    return Response.json(
      { error: "Id, name and teacherId are required" },
      { status: 400 }
    );
  }

  try {
    const updatedClass = await prisma.schoolClass.update({
      where: { id: Number(id) },
      data: {
        name,
        teacherId: Number(teacherId),
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

export async function GET(request: Request) {
  try {
    const classId = new URL(request.url).searchParams.get("classId");

    if (!classId) {
      return Response.json({ error: "classId is required" }, { status: 400 });
    }

    const schoolClass = await prisma.schoolClass.findUnique({
      where: { id: Number(classId) },
    });

    const availableTeachers = await prisma.teacher.findMany({
      where: {
        OR: [
          { class: null },
          ...(schoolClass ? [{ id: schoolClass.teacherId }] : []),
        ],
      },
    });

    return Response.json({ schoolClass, availableTeachers });
  } catch (error: unknown) {
    throw error;
  }
}
