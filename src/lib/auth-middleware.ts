import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function auth_middleware(req: Request) {
    // cookieCache in auth.ts makes this fast after the first request —
    // session is validated from a signed cookie instead of a DB lookup.
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
        return { authenticated: false, user: null };
    }
    return {
        authenticated: true,
        user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
        }
    };
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