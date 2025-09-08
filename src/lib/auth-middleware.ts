import { NextResponse } from "next/server";
import { auth } from "./auth"; // path to your Better Auth server instance

export async function auth_middleware(req: Request) {
    const session = await auth.api.getSession({
        headers: req.headers
    })

    if (!session || !session.user) {
        return {
            authenticated: true,
            user : null
        }
    }
    return {
        authenticated: true,
        user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            image: session.user.image
        }
    }

}