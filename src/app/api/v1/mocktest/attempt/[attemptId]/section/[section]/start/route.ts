import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { startSection } from "@/app/api/v1/mocktest/mocktest.user.controller";
import { PteSection } from "@/generated/prisma";

const VALID_SECTIONS: PteSection[] = ["SPEAKING", "WRITING", "READING", "LISTENING"];

// POST /api/v1/mocktest/attempt/[attemptId]/section/[section]/start
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ attemptId: string; section: string }> }
) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const { attemptId, section } = await params;

    if (!VALID_SECTIONS.includes(section as PteSection)) {
      return NextResponse.json(
        { success: false, message: `section must be one of: ${VALID_SECTIONS.join(", ")}`, data: null },
        { status: 400 }
      );
    }

    const result = await startSection(authCheck.user.id, attemptId, section as PteSection);

    return NextResponse.json({ success: true, message: `${section} section started`, data: result }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Attempt not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message === "Forbidden") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 403 });
    }
    if (error.message?.startsWith("This attempt") || error.message?.startsWith("This section")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("POST /mocktest/attempt/[attemptId]/section/[section]/start:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
