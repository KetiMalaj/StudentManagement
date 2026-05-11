import { prisma } from "@/app/lib/prisma";

export async function GET() {
    const deans = await prisma.dean.findMany();
    return Response.json(deans);
};