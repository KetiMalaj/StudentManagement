import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { name, surname } = await request.json();

    try {
        const dean = await prisma.dean.create({
            data: {
                name,
                surname,
            },
        });

        return new Response(JSON.stringify({ message: "Dean created successfully" }), {
            status: 201,
        });
    } catch (error: unknown) {
        if (error instanceof Error && "code" in error && (error as { code: string }).code === "P2002") {
            return new Response(JSON.stringify({ error: "A dean with that name and surname already exists" }), {
                status: 409,
            });
        }
        throw error;
    }
}  