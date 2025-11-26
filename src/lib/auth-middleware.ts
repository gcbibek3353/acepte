import { NextResponse } from "next/server";
import { auth } from "./auth"; // path to your Better Auth server instance

export async function auth_middleware(req: Request) {
    const session = await auth.api.getSession({
        headers: req.headers
    })

    return {
        authenticated: true,
        user: { id: "US1mNvXDg8dhQzsCAH3h6NXob17JXHz7" }
    }

    // if (!session || !session.user) {
    //     return {
    //         authenticated: true,
    //         user: null
    //     }
    // }
    // return {
    //     authenticated: true,
    //     user: {
    //         id: session.user.id,
    //         email: session.user.email,
    //         name: session.user.name,
    //         image: session.user.image
    //     }
    // }

}

export async function admin_auth_middleware(req: Request) {
    const { email, password } = await req.json();

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({
            success: false,
            message: "You are Unauthorized",
            url: null
        }, { status: 401 });
    }
    else {
        return {
            authenticated: true,
        }
    }
}