import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Faculty id is required" },
      { status: 400 }
    );
  }

  const faculty = await prisma.faculty.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      classes: {
        include: {
          teacher: true,
          students: {
            include: {
              student: true,
            },
          },
        },
      },
    },
  });

  return Response.json(faculty);
}