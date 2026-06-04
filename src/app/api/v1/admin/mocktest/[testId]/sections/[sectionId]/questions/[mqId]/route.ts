import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import { removeQuestion } from "@/app/api/v1/admin/mocktest/mocktest.admin.controller";

// DELETE /api/v1/admin/mocktest/[testId]/sections/[sectionId]/questions/[mqId]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ mqId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { mqId } = await params;
    await removeQuestion(mqId);

    return NextResponse.json({ success: true, message: "Question removed from section", data: null }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Question not found in this test") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot modify")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("DELETE /admin/mocktest/.../questions/[mqId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
