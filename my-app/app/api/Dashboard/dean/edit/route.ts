import { prisma } from "@/app/lib/prisma";

export async function PUT(request: Request) {
    const { id, name, surname } = await request.json(); 

    if (!id || !name || !surname) {
        return new Response(JSON.stringify({ error: "Id, name and surname are required" }), {
            status: 400,
        });
    }

    const updatedDean = await prisma.dean.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            surname,
        },
    });
    return new Response(JSON.stringify(updatedDean), {
        status: 200,
    });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const deletedDean = await prisma.dean.delete({
        where: {
            id: Number(id),
        },
    });

    return new Response(JSON.stringify(deletedDean), {
        status: 200,
    });
}
