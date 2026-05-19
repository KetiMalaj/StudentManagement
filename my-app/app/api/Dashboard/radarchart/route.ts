import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const faculties = await prisma.faculty.findMany({
    include: {
      students: true,
      classes: {
        include: {
          teacher: true,
          students: {
            include: { student: true },
          },
        },
      },
    },
  });

  const data = faculties.map((faculty) => {
    const allStudents = faculty.students;
    const gpas = allStudents.map((s) => s.gpa).filter((g): g is number => g !== null);
    const avgGpa = gpas.length > 0 ? gpas.reduce((a, b) => a + b, 0) / gpas.length : 0;

    const teacherIds = new Set(faculty.classes.map((c) => c.teacherId));

    return {
      faculty: faculty.facultyName,
      students: allStudents.length,
      classes: faculty.classes.length,
      teachers: teacherIds.size,
      avgGpa: Math.round(avgGpa * 100) / 100,
    };
  });

  return Response.json(data);
}
