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