import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { name, surname } = await request.json();

    if (!name || !surname) {
        return new Response(JSON.stringify({ error: "Name and surname are required" }), {
            status: 400,
        });
    }

    const student = await prisma.student.create({
        data: {
            name,
            surname,
        },
    });

    return new Response(JSON.stringify({ message: "Student created successfully" }), {
        status: 201,
    });
}

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
