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

    const question = await exportFunctions.getSummarizeWrittenTextQuestionById(questionId);

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
        message : "Question fetched successfully",
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

    const { summarizedText } = await req.json(); 
     const userId = "6I7UHDZKl7XMaNAbV0g6pOKTdTzGeOj3" // TODO : get this from middleware
    if (!summarizedText) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get the summarized text",
          data: null
        },
        { status: 400 }
      );
    }

    const evaluation = await exportFunctions.postSummarizeWrittenTextAnswer(questionId , summarizedText , userId);

    return NextResponse.json(
      {
        success: true,
        message: "Evaluation completed successfully",
        data: evaluation
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error evaluating summarized text:", error);
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