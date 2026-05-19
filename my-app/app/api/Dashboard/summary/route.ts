import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalStudents = await prisma.student.count();
  const totalTeachers = await prisma.teacher.count();
  const totalClasses = await prisma.schoolClass.count();
  const totalFaculties = await prisma.faculty.count();
  const totalDeans = await prisma.dean.count();

  const students = await prisma.student.findMany({
    select: {
      gpa: true,
    },
  });

  const studentsWithGpa = students.filter(
    (student) => student.gpa !== null && student.gpa !== undefined
  );

  const averageGpa =
    studentsWithGpa.length > 0
      ? studentsWithGpa.reduce(
          (sum, student) => sum + (student.gpa || 0),
          0
        ) / studentsWithGpa.length
      : 0;

  return NextResponse.json({
    totalStudents,
    totalTeachers,
    totalClasses,
    totalFaculties,
    totalDeans,
    averageGpa: averageGpa.toFixed(2),
  });
}