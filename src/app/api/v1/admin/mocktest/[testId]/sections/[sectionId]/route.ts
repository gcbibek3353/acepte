import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import { updateSection, deleteSection } from "@/app/api/v1/admin/mocktest/mocktest.admin.controller";

// PATCH /api/v1/admin/mocktest/[testId]/sections/[sectionId]
// Body: { timeLimit?, instructions?, order? }
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ sectionId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { sectionId } = await params;
    const body = await req.json();
    const { timeLimit, instructions, order } = body;

    if (timeLimit !== undefined && (typeof timeLimit !== "number" || timeLimit <= 0)) {
      return NextResponse.json(
        { success: false, message: "timeLimit must be a positive number (minutes)", data: null },
        { status: 400 }
      );
    }
    if (order !== undefined && (typeof order !== "number" || order < 1)) {
      return NextResponse.json(
        { success: false, message: "order must be a positive integer", data: null },
        { status: 400 }
      );
    }

    const result = await updateSection(sectionId, { timeLimit, instructions, order });

    return NextResponse.json({ success: true, message: "Section updated successfully", data: result }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Section not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot modify")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("PATCH /admin/mocktest/[testId]/sections/[sectionId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}

// DELETE /api/v1/admin/mocktest/[testId]/sections/[sectionId]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ sectionId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { sectionId } = await params;
    await deleteSection(sectionId);

    return NextResponse.json({ success: true, message: "Section deleted successfully", data: null }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Section not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot modify")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("DELETE /admin/mocktest/[testId]/sections/[sectionId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
