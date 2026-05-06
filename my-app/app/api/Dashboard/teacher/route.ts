import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { name, surname } = await request.json();

    if (!name || !surname) {
        return new Response(JSON.stringify({ error: "Name and surname are required" }), {
            status: 400,
        });
    }

    const teacher = await prisma.teacher.create({
        data: {
            name,
            surname
        },
    });

    return new Response(JSON.stringify({ message: "Teacher created successfully" }), {
        status: 201,
    });
}

export async function GET() {
        const fetchteachers = await prisma.teacher.findMany();
        return Response.json(fetchteachers);
};

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
