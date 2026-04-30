/*
  Warnings:

  - A unique constraint covering the columns `[name,surname]` on the table `Dean` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dean_name_surname_key" ON "Dean"("name", "surname");
