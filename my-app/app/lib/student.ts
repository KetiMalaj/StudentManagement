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

export async function lowerStudentGPA(studentName: string, amount: number) {
  const student = await prisma.student.findFirst({
    where: { name: studentName },
  });

  if (!student) {
    throw new Error(`Student "${studentName}" not found`);
  }

  const newGpa = Math.max((student.gpa || 0) - amount, 0);

  const updated = await prisma.student.update({
    where: { id: student.id },
    data: { gpa: newGpa },
  });

  return updated;
}

export async function addStudent(name: string, surname: string, gpa?: number) {
  const student = await prisma.student.create({
    data: {
      name,
      surname,
      gpa: gpa ?? null,
    },
  });

  return student;
}

export async function editStudent(
  id: number,
  name: string,
  surname: string,
  gpa?: number
) {
  const student = await prisma.student.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      surname,
      gpa: gpa ?? null,
    },
  });

  return student;
}

export async function deleteStudent(id: number) {
  const student = await prisma.student.delete({
    where: {
      id: Number(id),
    },
  });

  return student;
}
