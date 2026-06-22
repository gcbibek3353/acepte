import { NextRequest, NextResponse } from "next/server";
import speakingController from "../../speaking.controller";
import { auth_middleware } from "@/lib/auth-middleware";
import { AnswerShortDetail } from "@/types/speaking";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ questionId: string }> }
): Promise<NextResponse<ApiResponse<AnswerShortDetail | null>>> {
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

        const question = await speakingController.getAnswerShortQuestionById(questionId);

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
        console.error("Error fetching FIB question:", error);
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

export async function POST(req: NextRequest,
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
        const { audioUrl } = body;

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
        if (!userId || !audioUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid request body",
                    data: null
                },
                { status: 400 }
            );
        }

        const evaluation = await speakingController.postAnswerShortAnswer(userId, questionId, audioUrl);
        return NextResponse.json(
            {
                success: true,
                message: "Answer submitted successfully",
                data: evaluation
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error submitting FIB answer:", error);
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