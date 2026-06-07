import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import { getMockTestById, updateMockTest, deleteMockTest } from "../mocktest.admin.controller";

// GET /api/v1/admin/mocktest/[testId] — get full test with sections and questions
export async function GET(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { testId } = await params;
    const test = await getMockTestById(testId);

    if (!test) {
      return NextResponse.json({ success: false, message: "Mock test not found", data: null }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Mock test fetched successfully", data: test }, { status: 200 });
  } catch (error) {
    console.error("GET /admin/mocktest/[testId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}

// PATCH /api/v1/admin/mocktest/[testId] — update title, description, or totalTime
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { testId } = await params;
    const body = await req.json();
    const { title, description } = body;

    const test = await updateMockTest(testId, { title, description });

    return NextResponse.json({ success: true, message: "Mock test updated successfully", data: test }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Mock test not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    console.error("PATCH /admin/mocktest/[testId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}

// DELETE /api/v1/admin/mocktest/[testId] — delete a DRAFT test with no attempts
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { testId } = await params;
    await deleteMockTest(testId);

    return NextResponse.json({ success: true, message: "Mock test deleted successfully", data: null }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Mock test not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot delete")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("DELETE /admin/mocktest/[testId]:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
