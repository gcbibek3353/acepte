import { NextRequest, NextResponse } from "next/server";
import listeningController from "../../listening.controller";
import { SummarizeSpokenTextQuestion } from "@/generated/prisma";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
): Promise<NextResponse<ApiResponse<SummarizeSpokenTextQuestion | null>>> {
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

    const question = await listeningController.getSummarizeSpokenTextQuestionById(questionId);

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
    const { summarizedText } = body;
    const userId = "6I7UHDZKl7XMaNAbV0g6pOKTdTzGeOj3"; // TODO : Replace with actual user ID from auth middleware

    if (!summarizedText) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the summarized text",
          data: null
        },
        { status: 400 }
      );
    }

    const evaluation = await listeningController.postSummarizeSpokenTextAnswer(userId, questionId, summarizedText);

    return NextResponse.json(
      {
        success: true,
        message: "Answer submitted successfully",
        data: evaluation
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting summarize spoken text answer:", error);
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