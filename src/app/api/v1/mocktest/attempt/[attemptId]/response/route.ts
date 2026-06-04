import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { submitResponse } from "@/app/api/v1/mocktest/mocktest.user.controller";

// POST /api/v1/mocktest/attempt/[attemptId]/response
// Body: { mockTestQuestionId, answerData?, audioUrl?, duration? }
// Auto-scores objective questions immediately; AI-scored types stored with isEvaluated=false.
export async function POST(req: NextRequest, { params }: { params: Promise<{ attemptId: string }> }) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const { attemptId } = await params;
    const body = await req.json();
    const { mockTestQuestionId, answerData, audioUrl, duration } = body;

    if (!mockTestQuestionId) {
      return NextResponse.json(
        { success: false, message: "mockTestQuestionId is required", data: null },
        { status: 400 }
      );
    }

    const response = await submitResponse(authCheck.user.id, attemptId, {
      mockTestQuestionId,
      answerData,
      audioUrl,
      duration,
    });

    return NextResponse.json({ success: true, message: "Response submitted", data: response }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Attempt not found" || error.message === "Question not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message === "Forbidden") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 403 });
    }
    if (
      error.message === "Attempt is not in progress" ||
      error.message === "Start the section before submitting answers" ||
      error.message === "Question does not belong to this test"
    ) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("POST /mocktest/attempt/[attemptId]/response:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
