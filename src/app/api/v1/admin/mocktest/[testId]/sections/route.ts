import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import { addSection } from "@/app/api/v1/admin/mocktest/mocktest.admin.controller";
import { PteSection } from "@/generated/prisma";

const VALID_SECTIONS: PteSection[] = ["SPEAKING", "WRITING", "READING", "LISTENING"];

// POST /api/v1/admin/mocktest/[testId]/sections
// Body: { section, order, timeLimit, instructions? }
export async function POST(req: NextRequest, { params }: { params: Promise<{ testId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { testId } = await params;
    const body = await req.json();
    const { section, order, timeLimit, instructions } = body;

    if (!section || !VALID_SECTIONS.includes(section)) {
      return NextResponse.json(
        { success: false, message: `section must be one of: ${VALID_SECTIONS.join(", ")}`, data: null },
        { status: 400 }
      );
    }
    if (!order || typeof order !== "number" || order < 1) {
      return NextResponse.json(
        { success: false, message: "order must be a positive integer", data: null },
        { status: 400 }
      );
    }
    if (!timeLimit || typeof timeLimit !== "number" || timeLimit <= 0) {
      return NextResponse.json(
        { success: false, message: "timeLimit must be a positive number (minutes)", data: null },
        { status: 400 }
      );
    }

    const result = await addSection(testId, { section, order, timeLimit, instructions });

    return NextResponse.json({ success: true, message: "Section added successfully", data: result }, { status: 201 });
  } catch (error: any) {
    if (error.message === "Mock test not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot modify")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "This section already exists in the test", data: null },
        { status: 409 }
      );
    }
    console.error("POST /admin/mocktest/[testId]/sections:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
