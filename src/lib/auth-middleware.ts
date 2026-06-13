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
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user || (session.user as any).role !== "admin") {
        return NextResponse.json(
            { success: false, message: "Unauthorized", data: null },
            { status: 401 }
        );
    }
    return { authenticated: true };
}