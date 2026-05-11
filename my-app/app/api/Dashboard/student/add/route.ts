import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { name, surname } = await request.json();

    if (!name || !surname) {
        return new Response(JSON.stringify({ error: "Name and surname are required" }), {
            status: 400,
        });
    }

    try {
        const student = await prisma.student.create({
            data: {
                name,
                surname,
            },
        });

        return new Response(JSON.stringify({ message: "Student created successfully" }), {
            status: 201,
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