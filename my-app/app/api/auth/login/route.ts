import { prisma } from "@/app/lib/prisma";
import { signToken } from "@/app/lib/auth";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return Response.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        if (user.password !== password) {
            return Response.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = await signToken({ email: user.email, id: user.id, role: user.role });

        return Response.json({ token, role: user.role });
    } catch (error) {
        console.error("Login error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
