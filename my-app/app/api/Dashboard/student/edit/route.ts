import { prisma } from "@/app/lib/prisma";

export async function GET() {
    const fetchstudents = await prisma.student.findMany();
    return Response.json(fetchstudents);
}

export async function PUT(request: Request) {
    const { id, name, surname } = await request.json();

    if (!id || !name || !surname) {
        return new Response(JSON.stringify({ error: "Id, name and surname are required" }), {
            status: 400,
        });
    }

    const updatedStudent = await prisma.student.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            surname,
        },
    });

    return new Response(JSON.stringify(updatedStudent), {
        status: 200,
    });
}

