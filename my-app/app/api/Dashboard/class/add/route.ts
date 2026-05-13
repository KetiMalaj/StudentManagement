import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  const { name, teacherId } = await request.json();

  if (!name || !teacherId) {
    return Response.json(
      { error: "Name and teacherId are required" },
      { status: 400 }
    );
  }

  try {
    const newClass = await prisma.schoolClass.create({
      data: {
        name,
        teacherId: Number(teacherId),
      },
    });

return Response.json(newClass, { status: 201 });
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

export async function GET() {
  try {
    const assignedTeacherIds = await prisma.teacher.findMany({
      where: {
        class: null
      }
    })
  
    return Response.json(assignedTeacherIds);
  } catch (error: unknown) {
    throw error;
  }
}
