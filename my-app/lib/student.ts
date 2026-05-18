import { prisma } from "@/app/lib/prisma";

  export async function raiseStudentGPA(studentName: string, amount: number) {
    const student = await prisma.student.findFirst({
      where: { name: studentName },
    });

    if (!student) {
      throw new Error(`Student "${studentName}" not found`);
    }

    const updated = await prisma.student.update({
      where: { id: student.id },
      data: { gpa: (student.gpa || 0) + amount },
    });

    return updated;
  }