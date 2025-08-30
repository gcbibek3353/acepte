import { NextRequest, NextResponse } from "next/server";
import exportFunctions from "../../writing.controller";

export async function GET(
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

    const question = await exportFunctions.getWriteEssayQuestionById(questionId);

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
    console.error("Error fetching write essay question:", error);
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
    const { essay } = body;

    if (!essay) {
      return NextResponse.json(
        {
          success: false,
          message: "Essay content is required",
          data: null
        },
        { status: 400 }
      );
    }

    const evaluation = await exportFunctions.postWriteEssayAnswer(questionId , essay);

    return NextResponse.json(
      {
        success: true,
        message: "Essay evaluated successfully",
        data: evaluation
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error evaluating essay:", error);
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