import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { getMockTestOverview } from "../mocktest.user.controller";

// GET /api/v1/mocktest/[testId] — test overview (sections + question counts, no answers)
export async function GET(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const { testId } = await params;
    const test = await getMockTestOverview(testId);

    if (!test) {
      return NextResponse.json({ success: false, message: "Mock test not found", data: null }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Mock test fetched successfully", data: test }, { status: 200 });
  } catch (error) {
    console.error("GET /mocktest/[testId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
