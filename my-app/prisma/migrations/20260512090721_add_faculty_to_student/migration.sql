-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "facultyId" INTEGER,
    CONSTRAINT "student_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_student" ("id", "name", "surname") SELECT "id", "name", "surname" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_name_surname_key" ON "student"("name", "surname");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
