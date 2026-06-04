import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { getAttemptResult } from "@/app/api/v1/mocktest/mocktest.user.controller";

// GET /api/v1/mocktest/attempt/[attemptId]/result
// Returns final scores and per-question responses. Attempt must be COMPLETED.
export async function GET(req: NextRequest, { params }: { params: Promise<{ attemptId: string }> }) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const { attemptId } = await params;
    const result = await getAttemptResult(authCheck.user.id, attemptId);

    return NextResponse.json({ success: true, message: "Result fetched successfully", data: result }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Attempt not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message === "Forbidden") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 403 });
    }
    if (error.message === "Attempt is not yet completed") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("GET /mocktest/attempt/[attemptId]/result:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
