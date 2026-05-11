import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), {
            status: 400,
        });
    }

    const teacher = await prisma.teacher.findUnique({
        where: { id: Number(id) },
    });

    return Response.json(teacher);
}

export async function PUT(request: Request) {
    const { id, name, surname } = await request.json();

    if (!id || !name || !surname) {
        return new Response(JSON.stringify({ error: "Id, name and surname are required" }), {
            status: 400,
        });
    }

    const updatedTeacher = await prisma.teacher.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            surname,
        },
    });

    return new Response(JSON.stringify(updatedTeacher), {
        status: 200,
    });
}
