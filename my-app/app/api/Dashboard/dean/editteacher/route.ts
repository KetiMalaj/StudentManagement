import { prisma } from "@/app/lib/prisma";

export async function DELETE(request: Request){
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
