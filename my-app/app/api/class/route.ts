import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const { name } = await request.json();

    if (!name) {
        return new Response(JSON.stringify({ error: "Class name is required" }), {
            status: 400,
        });
    }

    const class = await prisma.class.create({
        data: {
            name,
        }
    });
    return new Response(JSON.stringify({ message : "Class created successfully" }), {
        status: 201,
    });

    export async function GET() {
        const fetchclasses = await prisma.class.findMany();
        return Response.json(fetchclasses);
    }

    export async function PUT(request: Request) {
        const { id, name } = await request.json();

        if (!id || !name ) {
            return new Response(JSON.stringify({ error: "Id, name of the class are required" }), {
            status: 400,
        });
      }
    }

    const updatedClass = await prisma.class.update({
        where : {
            id : Number(id),
        },
        data : {
            name,       
        }
    })

    return new Response(JSON.stringify(updatedClass), {
        status: 200,
    });

    export async function DELETE(request: Request) {
        const { id } = await request.json();    

        const deletedClass = await prisma.class.delete({
            where : {
                id : Number(id),
            },
        });

        return new Response(JSON.stringify(deletedClass), {
            status: 200,
        });
    }
    
}