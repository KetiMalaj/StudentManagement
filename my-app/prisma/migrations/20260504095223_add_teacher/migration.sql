-- CreateTable
CREATE TABLE "Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_name_surname_key" ON "Teacher"("name", "surname");
