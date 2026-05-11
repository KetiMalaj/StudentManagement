    import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { name, teacherId } = await request.json();

    if (!name || !teacherId) {
        return new Response(JSON.stringify({ error: "Class name and teacher ID are required" }), {
            status: 400,
        });
    }

    const newClass = await prisma.schoolClass.create({

        data: {
            name,
            teacherId : Number(teacherId),
        }
    });
    return new Response(JSON.stringify({ message : "Class created successfully" }), {
        status: 201,
    });
}

export async function GET() {
    const fetchclasses = await prisma.schoolClass.findMany();
    return Response.json(fetchclasses);
    }

export async function PUT(request: Request) {
    const { id, name, teacherId } = await request.json();

    if (!id || !name || !teacherId) {
        return new Response(JSON.stringify({ error: "Id, name, and teacher ID of the class are required" }), {
         status: 400,
        });
      }
    
    const updatedClass = await prisma.schoolClass.update({
    where : {
        id : Number(id),
    },
    data : {
        name,
        teacherId : Number(teacherId),
    }
});

    return new Response(JSON.stringify(updatedClass), {
        status: 200,
    });
}

    export async function DELETE(request: Request) {
        const { id } = await request.json();    

        const deletedClass = await prisma.schoolClass.delete({
            where : {
                id : Number(id),
            },
        });

        return new Response(JSON.stringify(deletedClass), {
            status: 200,
        });
    }
    
