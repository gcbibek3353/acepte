import { FibDropdownDetail } from "@/types/reading";
import { auth_middleware } from "@/lib/auth-middleware";
import { NextRequest, NextResponse } from "next/server";
import readingController from "../../reading.controller";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
): Promise<NextResponse<ApiResponse<FibDropdownDetail | null>>> {
  try {
    const { questionId } = await params;

    if (!questionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get the question Id",
          data: null
        },
        { status: 400 }
      );
    }

    const question = await readingController.getFibDropdownQuestionById(questionId);

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get the question",
          data: null
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Question fetched successfully",
        data: question
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching summarize spoken text question:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: null
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;

    if (!questionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get the question Id",
          data: null
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { answer } = body;

    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          data: null
        },
        { status: 401 }
      );
    }
    const userId = authCheck.user.id;

    if (!answer) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the answer",
          data: null
        },
        { status: 400 }
      );
    }

    const evaluation = await readingController.postFibDropdownPassageAnswer(userId, questionId, answer);

    return NextResponse.json(
      {
        success: true,
        message: "Answer submitted successfully",
        data: evaluation
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting fib dropdown answer:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: null
      },
      { status: 500 }
    );
  }
}