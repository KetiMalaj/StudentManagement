import { prisma } from "@/app/lib/prisma";


export async function POST(request: Request) {
  const { name, teacherId, facultyId } = await request.json();

  const newClass = await prisma.schoolClass.create({
    data: {
      name,
      teacherId: Number(teacherId),
      facultyId: facultyId ? Number(facultyId) : null,
    },
  });

  return Response.json(newClass, { status: 201 });
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
