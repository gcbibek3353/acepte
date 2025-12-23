import { admin_auth_middleware } from "@/lib/auth-middleware";
import { putObject } from "@/lib/s3";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // admin_auth_middleware(request); // Only while adding Listening Questions Audio by admin.
    const preSignedUrl = await putObject('listening-questions');
    return new Response(JSON.stringify({
        success: true,
        message: "You are Authorized",
        url: preSignedUrl
    }), { status: 200 });
}