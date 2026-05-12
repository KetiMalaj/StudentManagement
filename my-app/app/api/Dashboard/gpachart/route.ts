import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const classes = await prisma.schoolClass.findMany({
    include: {
      students: {
        include: {
          student: true,
        },
      },
    },
  });

  const data = classes.map((c) => {
    const gpas = c.students
      .map((sc) => sc.student.gpa)
      .filter((gpa): gpa is number => gpa !== null);

    const avgGpa =
      gpas.length > 0
        ? Math.round((gpas.reduce((sum, g) => sum + g, 0) / gpas.length) * 100) / 100
        : 0;

    return {
      class: c.name,
      gpa: avgGpa,
    };
  });

  return Response.json(data);
}
