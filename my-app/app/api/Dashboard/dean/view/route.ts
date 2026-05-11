import { prisma } from "@/app/lib/prisma";

export async function GET() {
    const deans = await prisma.dean.findMany();
    return Response.json(deans);
};

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