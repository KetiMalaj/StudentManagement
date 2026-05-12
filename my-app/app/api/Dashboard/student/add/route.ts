import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  const { name, surname, gpa, facultyId, classId } = await request.json();

  const newStudent = await prisma.student.create({
    data: {
      name,
      surname,
      gpa: gpa ? Number(gpa) : null,
      facultyId: facultyId ? Number(facultyId) : null,

      classes: classId
        ? {
            create: {
              classId: Number(classId),
            },
          }
        : undefined,
    },
  });

  return Response.json(newStudent, { status: 201 });
}