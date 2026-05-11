import { prisma } from "@/app/lib/prisma";

export async function GET() {
    const fetchteachers = await prisma.teacher.findMany();
    return Response.json(fetchteachers);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const deletedTeacher = await prisma.teacher.delete({
        where: {
            id: Number(id),
        },
    });

    return new Response(JSON.stringify(deletedTeacher), {
        status: 200,
    });
}
