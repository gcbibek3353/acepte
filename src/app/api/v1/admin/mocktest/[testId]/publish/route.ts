import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import { updateMockTestStatus } from "../../mocktest.admin.controller";
import { MockTestStatus } from "@/generated/prisma";

const VALID_STATUSES: MockTestStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

// PATCH /api/v1/admin/mocktest/[testId]/publish
// Body: { status: "PUBLISHED" | "DRAFT" | "ARCHIVED" }
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { testId } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: `status must be one of: ${VALID_STATUSES.join(", ")}`, data: null },
        { status: 400 }
      );
    }

    const test = await updateMockTestStatus(testId, status as MockTestStatus);

    return NextResponse.json(
      { success: true, message: `Mock test status updated to ${status}`, data: test },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.message === "Mock test not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot publish")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 422 });
    }
    console.error("PATCH /admin/mocktest/[testId]/publish:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
