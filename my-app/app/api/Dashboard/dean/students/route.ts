import { prisma } from "@/app/lib/prisma";

export async function GET() {
    const students = await prisma.student.findMany();
    return Response.json(students);
}