import { admin_auth_middleware } from "@/lib/auth-middleware";
import { putObject } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const subdir = url.searchParams.get('subdir') ?? 'speaking-read-aloud';

    // admin_auth_middleware(request); // Only while adding Listening Questions Audio by admin.
    const presignedData = await putObject(subdir);

    return NextResponse.json({
        success: true,
        message: "Presigned URL generated successfully",
        url: presignedData.signedUrl,
        objectUrl: presignedData.objectUrl,
        key: presignedData.key,
    });
}