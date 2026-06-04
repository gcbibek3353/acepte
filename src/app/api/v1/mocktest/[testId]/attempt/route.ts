import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { startAttempt } from "@/app/api/v1/mocktest/mocktest.user.controller";

// POST /api/v1/mocktest/[testId]/attempt — start a new attempt
export async function POST(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const { testId } = await params;
    const attempt = await startAttempt(authCheck.user.id, testId);

    return NextResponse.json({ success: true, message: "Attempt started", data: attempt }, { status: 201 });
  } catch (error: any) {
    if (error.message === "Mock test not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message === "This test is not available") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 403 });
    }
    if (error.message?.startsWith("You already have")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("POST /mocktest/[testId]/attempt:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
