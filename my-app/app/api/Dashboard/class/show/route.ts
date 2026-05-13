import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Class id is required" },
      { status: 400 }
    );
  }

  const classDetails = await prisma.schoolClass.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      teacher: true,
      students: {
        include: {
          student: {
            include: {
              faculty: true,
            },
          },
        },
      },
    },
  });

  return Response.json(classDetails);
}