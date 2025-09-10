import { NextRequest, NextResponse } from "next/server";
import listeningController from "../../listening.controller";
import { ListeningHighlightIncorrectWordsAnswer, ListeningHighlightIncorrectWordsPassage, ListeningHighlightSummaryPassage } from "@/generated/prisma";
import { auth_middleware } from "@/lib/auth-middleware";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ questionId: string }> }
): Promise<NextResponse<ApiResponse<ListeningHighlightIncorrectWordsPassage | null>>> {
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

        const question = await listeningController.getHIWQuestionById(questionId);

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
        console.error("Error fetching HIW question:", error);
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
): Promise<NextResponse<ApiResponse<ListeningHighlightIncorrectWordsAnswer | null>>> {
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
        const { answers }: { answers: { word: string, position: number }[] } = body;
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

        if (!answers || answers.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Answers are required",
                    data: null
                },
                { status: 400 }
            );
        }

        const evaluation = await listeningController.postHIWAnswer(userId, questionId, answers);

        return NextResponse.json(
            {
                success: true,
                message: "Answer evaluated successfully",
                data: evaluation
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creating HIW question:", error);
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