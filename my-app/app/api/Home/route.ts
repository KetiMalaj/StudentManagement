// import { prisma } from "@/app/lib/prisma";


// export async function POST(request: Request) {
//     try {
//         const { name, surname } = await request.json();

//         const student = await prisma.student.create({
//             data: { name, surname}
//         });
//         return Response.json(student);
//     }catch(error: any)
//     {
//          if (error.code === "P2002") {
//       return Response.json(
//         { error: "A student with this name and surname already exists" },
//         { status: 400 }
//       );
//     }

//     console.error(error);

//     return Response.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
    

// }