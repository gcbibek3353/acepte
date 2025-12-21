import { admin_auth_middleware } from "@/lib/auth-middleware";
import { putObject } from "@/lib/s3";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    admin_auth_middleware(request);

    return new Response(JSON.stringify({
        success: true,
        message: "You are Authorized",
        url: putObject('listening-questions')
    }), { status: 200 });
}