import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { completeAttempt } from "@/app/api/v1/mocktest/mocktest.user.controller";

// POST /api/v1/mocktest/attempt/[attemptId]/complete
// Marks attempt as COMPLETED and aggregates scores from all evaluated responses.
export async function POST(req: NextRequest, { params }: { params: Promise<{ attemptId: string }> }) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const { attemptId } = await params;
    const result = await completeAttempt(authCheck.user.id, attemptId);

    return NextResponse.json({ success: true, message: "Attempt completed", data: result }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Attempt not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message === "Forbidden") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 403 });
    }
    if (
      error.message === "Attempt is not in progress" ||
      error.message?.startsWith("Complete all sections first")
    ) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("POST /mocktest/attempt/[attemptId]/complete:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
