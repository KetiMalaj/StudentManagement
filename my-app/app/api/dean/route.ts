import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { name, surname } = await request.json();

    const dean = await prisma.dean.create({
        data: {
            name,
            surname,
        },
    });

    return new Response(JSON.stringify({ message: "Dean created successfully" }), {
        status: 201,
    });
}  
export async function GET() {
    const deans = await prisma.dean.findMany();
    return Response.json(deans);
};