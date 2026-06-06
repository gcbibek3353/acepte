import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import { addQuestion, reorderQuestions } from "@/app/api/v1/admin/mocktest/mocktest.admin.controller";
import { MockTestQuestionType } from "@/generated/prisma";

const VALID_QUESTION_TYPES = Object.values(MockTestQuestionType);

// POST /api/v1/admin/mocktest/[testId]/sections/[sectionId]/questions
// Body: { questionType, questionId }
// Appends to end of section; validates questionId exists in the source model.
export async function POST(req: NextRequest, { params }: { params: Promise<{ sectionId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { sectionId } = await params;
    const body = await req.json();
    const { questionType, questionId } = body;

    if (!questionType || !VALID_QUESTION_TYPES.includes(questionType)) {
      return NextResponse.json(
        { success: false, message: `questionType must be one of: ${VALID_QUESTION_TYPES.join(", ")}`, data: null },
        { status: 400 }
      );
    }
    if (!questionId || typeof questionId !== "string") {
      return NextResponse.json(
        { success: false, message: "questionId is required and must be a string", data: null },
        { status: 400 }
      );
    }

    const result = await addQuestion(sectionId, { questionType, questionId });

    return NextResponse.json({ success: true, message: "Question added to section", data: result }, { status: 201 });
  } catch (error: any) {
    if (error.message === "Section not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Question not found")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot modify")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("POST /admin/mocktest/.../questions:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}

// PUT /api/v1/admin/mocktest/[testId]/sections/[sectionId]/questions
// Body: { orderedIds: string[] } — array of MockTestQuestion.id in desired order
export async function PUT(req: NextRequest, { params }: { params: Promise<{ sectionId: string }> }) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { sectionId } = await params;
    const body = await req.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "orderedIds must be a non-empty array of question ids", data: null },
        { status: 400 }
      );
    }

    const result = await reorderQuestions(sectionId, orderedIds);

    return NextResponse.json({ success: true, message: "Questions reordered successfully", data: result }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Section not found") {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 404 });
    }
    if (error.message?.startsWith("Cannot modify")) {
      return NextResponse.json({ success: false, message: error.message, data: null }, { status: 409 });
    }
    console.error("PUT /admin/mocktest/.../questions:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
