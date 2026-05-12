import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Student id is required" },
      { status: 400 }
    );
  }

  const foundStudent = await prisma.student.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      faculty: true,
      classes: {
        include: {
          class: true,
        },
      },
    },
  });

  return Response.json(foundStudent);
}

export async function PUT(request: Request) {
  const { id, name, surname, facultyId, classId } = await request.json();

  const updatedStudent = await prisma.student.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      surname,
      facultyId: facultyId ? Number(facultyId) : null,
    },
  });

  if (classId) {
    await prisma.studentClass.deleteMany({
      where: {
        studentId: Number(id),
      },
    });

    await prisma.studentClass.create({
      data: {
        studentId: Number(id),
        classId: Number(classId),
      },
    });
  }

  return Response.json(updatedStudent);
}