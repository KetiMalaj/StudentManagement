import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const classes = await prisma.schoolClass.findMany({
    include: {
      teacher: true,
      faculty: true,
      students: {
        include: {
          student: true,
        },
      },
    },
  });

  return Response.json(classes);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const deletedClass = await prisma.schoolClass.delete({
    where: {
      id: Number(id),
    },
  });

  return Response.json(deletedClass);
}