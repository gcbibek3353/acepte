import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import readingController from '../../reading.controller'
import { auth_middleware } from '@/lib/auth-middleware'
import { NextApiResponse } from 'next'
import { ReorderParagraphPassage } from '@/generated/prisma'

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

        const question = await readingController.getReorderParagraphQuestionById(questionId);

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
        console.error("Error fetching reorder text question:", error);
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
    request: NextRequest,
    { params }: { params: Promise<{ questionId: string }> }
) {
    try {
        const { questionId } = await params

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

        const body = await request.json()
        const { userAnswer } = body

        const authCheck = await auth_middleware(request);
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


        if (!userAnswer) {
            return NextResponse.json({
                success: false,
                message: 'user Answer not provided'
            }, { status: 400 })
        }

        const evaluation = await readingController.postReorderParagraphAnswer(userId, questionId, userAnswer);
        return NextResponse.json(
            {
                success: true,
                message: "Answer submitted successfully",
                data: evaluation
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error submitting reorder answer:', error)
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 })
    }
}