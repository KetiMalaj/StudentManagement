import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create teachers
  const t1 = await prisma.teacher.create({ data: { name: "John", surname: "Smith" } });
  const t2 = await prisma.teacher.create({ data: { name: "Maria", surname: "Johnson" } });
  const t3 = await prisma.teacher.create({ data: { name: "David", surname: "Brown" } });
  const t4 = await prisma.teacher.create({ data: { name: "Elena", surname: "Davis" } });

  // Create classes
  const math = await prisma.schoolClass.create({ data: { name: "Mathematics", teacherId: t1.id } });
  const physics = await prisma.schoolClass.create({ data: { name: "Physics", teacherId: t2.id } });
  const cs = await prisma.schoolClass.create({ data: { name: "Computer Science", teacherId: t3.id } });
  const english = await prisma.schoolClass.create({ data: { name: "English", teacherId: t4.id } });

  // Create faculty
  const faculty = await prisma.faculty.create({
    data: { facultyName: "Engineering", facultyHead: "Dr. Wilson" },
  });

  // Create students
  const students = await Promise.all([
    prisma.student.create({ data: { name: "Alice", surname: "Taylor", gpa: 3.8, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Bob", surname: "Anderson", gpa: 3.2, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Charlie", surname: "Wilson", gpa: 2.9, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Diana", surname: "Martinez", gpa: 3.6, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Ethan", surname: "Garcia", gpa: 3.1, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Fiona", surname: "Lee", gpa: 3.9, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "George", surname: "Clark", gpa: 2.7, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Hannah", surname: "Lewis", gpa: 3.4, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Ivan", surname: "Walker", gpa: 3.0, facultyId: faculty.id } }),
    prisma.student.create({ data: { name: "Julia", surname: "Hall", gpa: 3.7, facultyId: faculty.id } }),
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

  console.log("Seeded: 4 teachers, 4 classes, 1 faculty, 10 students, 22 enrollments");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
