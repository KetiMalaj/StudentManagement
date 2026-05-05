/*
  Warnings:

  - You are about to drop the column `surname` on the `Student` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentClass" (
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    PRIMARY KEY ("studentId", "classId"),
    CONSTRAINT "StudentClass_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Student" ("id", "name") SELECT "id", "name" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Class_teacherId_key" ON "Class"("teacherId");
