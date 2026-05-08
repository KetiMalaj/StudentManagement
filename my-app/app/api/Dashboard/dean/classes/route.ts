import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { name, teacherId, students } = await request.json();

    const schoolClass = await prisma.schoolClass.create({
        data: {
            name,
            teacherId,
        },
    });

    await prisma.studentClass.createMany({
        data: students.map((studentId: number) => ({ studentId, classId: schoolClass.id 
        })),
    });

    return new Response(JSON.stringify({ message: "Class created successfully" }), {
        status: 201,
    })
}

export async function GET() {
    const schoolClasses = await prisma.schoolClass.findMany();
    return Response.json(schoolClasses);
}

export async function PUT(request: Request) {
    const { id, name, students } = await request.json();

    if (!id || !name ) {
        return new Response(JSON.stringify({ error: "Id and name are required" }),{
            status: 400,    
        })
    }

    const updatedClass = await prisma.schoolClass.update({
        where: {
            id
        },
        data: {
            name
        }
    });

    if (students) {
        await prisma.studentClass.deleteMany({
            where: {
                classId: id,
            },
        });

        await prisma.studentClass.createMany({
            data: students.map((studentId: number) => ({ studentId, classId: id })),
        });
    }
    return new Response(JSON.stringify(updatedClass), {
        status: 200,
    });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    await prisma.studentClass.deleteMany({
        where: {
            classId: id,
        },
    });

    const deletedClass = await prisma.schoolClass.delete({
        where: {
            id
        },
    });

    return new Response(JSON.stringify(deletedClass), {
        status: 200,
    });
}



