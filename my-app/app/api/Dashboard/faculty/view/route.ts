import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const faculties = await prisma.faculty.findMany();

  return Response.json(faculties);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const deletedFaculty = await prisma.faculty.delete({
    where: {
      id: Number(id),
    },
  });

  return Response.json(deletedFaculty);
}