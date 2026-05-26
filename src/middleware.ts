// Next.js middleware runs in Edge Runtime — Prisma/Better Auth (Prisma adapter)
// cannot run here. Auth is handled per route handler via auth_middleware.ts.
// Session performance is handled by cookieCache in src/lib/auth.ts.

import { NextRequest, NextResponse } from 'next/server';

export function middleware(_request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [], // no routes intercepted
};
