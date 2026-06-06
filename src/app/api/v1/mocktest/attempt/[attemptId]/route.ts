import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { getAttemptState } from "@/app/api/v1/mocktest/mocktest.user.controller";

// GET /api/v1/mocktest/attempt/[attemptId] — get current attempt state (for resume)
export async function GET(req: NextRequest, { params }: { params: Promise<{ attemptId: string }> }) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const { attemptId } = await params;
    const attempt = await getAttemptState(authCheck.user.id, attemptId);

    return NextResponse.json({ success: true, message: "Attempt state fetched", data: attempt }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Attempt not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message === "Forbidden") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 403 });
    }
    console.error("GET /mocktest/attempt/[attemptId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
