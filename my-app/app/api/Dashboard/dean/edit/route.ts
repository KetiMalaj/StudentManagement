import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ error: "Id is required" }, { status: 400 });
    }

    const dean = await prisma.dean.findUnique({
        where: { id: Number(id) },
    });

    if (!dean) {
        return Response.json({ error: "Dean not found" }, { status: 404 });
    }

    return Response.json(dean);
};

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

