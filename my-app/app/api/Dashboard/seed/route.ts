import { prisma } from "@/app/lib/prisma";

export async function POST() {
  // Clear all existing data (order matters due to foreign keys)
  await prisma.studentClass.deleteMany();
  await prisma.student.deleteMany();
  await prisma.schoolClass.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.dean.deleteMany();
  await prisma.faculty.deleteMany();

  // Create deans
  const dean1 = await prisma.dean.create({ data: { name: "Robert", surname: "Williams" } });
  const dean2 = await prisma.dean.create({ data: { name: "Sarah", surname: "Thompson" } });

  // Create teachers
  const t1 = await prisma.teacher.create({ data: { name: "John", surname: "Smith" } });
  const t2 = await prisma.teacher.create({ data: { name: "Maria", surname: "Johnson" } });
  const t3 = await prisma.teacher.create({ data: { name: "David", surname: "Brown" } });
  const t4 = await prisma.teacher.create({ data: { name: "Elena", surname: "Davis" } });

  // Create faculties
  const engineering = await prisma.faculty.create({
    data: { facultyName: "Engineering", facultyHead: "Dr. Wilson" },
  });
  const science = await prisma.faculty.create({
    data: { facultyName: "Science", facultyHead: "Dr. Adams" },
  });

  // Create classes
  const math = await prisma.schoolClass.create({
    data: { name: "Mathematics", teacherId: t1.id, facultyId: engineering.id },
  });
  const physics = await prisma.schoolClass.create({
    data: { name: "Physics", teacherId: t2.id, facultyId: science.id },
  });
  const cs = await prisma.schoolClass.create({
    data: { name: "Computer Science", teacherId: t3.id, facultyId: engineering.id },
  });
  const english = await prisma.schoolClass.create({
    data: { name: "English", teacherId: t4.id, facultyId: science.id },
  });

  // Create students
  const students = await Promise.all([
    prisma.student.create({ data: { name: "Alice", surname: "Taylor", gpa: 3.8, facultyId: engineering.id } }),
    prisma.student.create({ data: { name: "Bob", surname: "Anderson", gpa: 3.2, facultyId: engineering.id } }),
    prisma.student.create({ data: { name: "Charlie", surname: "Wilson", gpa: 2.9, facultyId: science.id } }),
    prisma.student.create({ data: { name: "Diana", surname: "Martinez", gpa: 3.6, facultyId: engineering.id } }),
    prisma.student.create({ data: { name: "Ethan", surname: "Garcia", gpa: 3.1, facultyId: science.id } }),
    prisma.student.create({ data: { name: "Fiona", surname: "Lee", gpa: 3.9, facultyId: engineering.id } }),
    prisma.student.create({ data: { name: "George", surname: "Clark", gpa: 2.7, facultyId: science.id } }),
    prisma.student.create({ data: { name: "Hannah", surname: "Lewis", gpa: 3.4, facultyId: engineering.id } }),
    prisma.student.create({ data: { name: "Ivan", surname: "Walker", gpa: 3.0, facultyId: science.id } }),
    prisma.student.create({ data: { name: "Julia", surname: "Hall", gpa: 3.7, facultyId: engineering.id } }),
  ]);

  // Enroll students in classes
  await Promise.all([
    // Math: 6 students
    prisma.studentClass.create({ data: { studentId: students[0].id, classId: math.id } }),
    prisma.studentClass.create({ data: { studentId: students[1].id, classId: math.id } }),
    prisma.studentClass.create({ data: { studentId: students[2].id, classId: math.id } }),
    prisma.studentClass.create({ data: { studentId: students[3].id, classId: math.id } }),
    prisma.studentClass.create({ data: { studentId: students[7].id, classId: math.id } }),
    prisma.studentClass.create({ data: { studentId: students[9].id, classId: math.id } }),

    // Physics: 4 students
    prisma.studentClass.create({ data: { studentId: students[0].id, classId: physics.id } }),
    prisma.studentClass.create({ data: { studentId: students[4].id, classId: physics.id } }),
    prisma.studentClass.create({ data: { studentId: students[5].id, classId: physics.id } }),
    prisma.studentClass.create({ data: { studentId: students[8].id, classId: physics.id } }),

    // CS: 7 students
    prisma.studentClass.create({ data: { studentId: students[0].id, classId: cs.id } }),
    prisma.studentClass.create({ data: { studentId: students[1].id, classId: cs.id } }),
    prisma.studentClass.create({ data: { studentId: students[3].id, classId: cs.id } }),
    prisma.studentClass.create({ data: { studentId: students[5].id, classId: cs.id } }),
    prisma.studentClass.create({ data: { studentId: students[6].id, classId: cs.id } }),
    prisma.studentClass.create({ data: { studentId: students[8].id, classId: cs.id } }),
    prisma.studentClass.create({ data: { studentId: students[9].id, classId: cs.id } }),

    // English: 5 students
    prisma.studentClass.create({ data: { studentId: students[2].id, classId: english.id } }),
    prisma.studentClass.create({ data: { studentId: students[4].id, classId: english.id } }),
    prisma.studentClass.create({ data: { studentId: students[6].id, classId: english.id } }),
    prisma.studentClass.create({ data: { studentId: students[7].id, classId: english.id } }),
    prisma.studentClass.create({ data: { studentId: students[9].id, classId: english.id } }),
  ]);

  return Response.json({
    message: "Database seeded successfully",
    data: {
      deans: 2,
      teachers: 4,
      faculties: 2,
      classes: 4,
      students: 10,
      enrollments: 22,
    },
  });
}
