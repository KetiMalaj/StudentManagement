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


