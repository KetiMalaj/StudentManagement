import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const classes = await prisma.schoolClass.findMany({
    include: {
      _count: {
        select: { students: true },
      },
    },
  });

  const data = classes.map((c) => ({
    class: c.name,
    students: c._count.students,
  }));

  return Response.json(data);
}
