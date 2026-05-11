import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ error: "Id is required" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
        where: { id: Number(id) },
    });

    if (!student) {
        return Response.json({ error: "Student not found" }, { status: 404 });
    }

    return Response.json(student);
}

export async function PUT(request: Request) {
    const { id, name, surname } = await request.json();

    if (!id || !name || !surname) {
        return new Response(JSON.stringify({ error: "Id, name and surname are required" }), {
            status: 400,
        });
    }

    try {
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
    } catch (error: unknown) {
        if (error instanceof Error && "code" in error && (error as { code: string }).code === "P2002") {
            return new Response(JSON.stringify({ error: "A student with that name and surname already exists" }), {
                status: 409,
            });
        }
        throw error;
    }
}

