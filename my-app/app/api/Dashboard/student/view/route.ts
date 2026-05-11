import { prisma } from "@/app/lib/prisma";

export async function GET() {
    const fetchstudents = await prisma.student.findMany();
    return Response.json(fetchstudents);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const deletedStudent = await prisma.student.delete({
        where: {
            id: Number(id),
        },
    });

    return new Response(JSON.stringify(deletedStudent), {
        status: 200,
    });
}