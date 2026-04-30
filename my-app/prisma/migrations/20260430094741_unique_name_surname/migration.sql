/*
  Warnings:

  - A unique constraint covering the columns `[name,surname]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_name_surname_key" ON "Student"("name", "surname");
