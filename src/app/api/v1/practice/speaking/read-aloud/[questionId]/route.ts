// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'
// import { evaluateUsingAI } from '@/lib/ai/google-voice'

import { NextRequest, NextResponse } from "next/server";
import speakingController from "../../speaking.controller";
import { SpeakingReadAloudQuestion } from "@/generated/prisma";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { questionId: string } }
// ) {
//   try {
//     const { questionId } = await params

//     if (!questionId) {
//       return NextResponse.json({
//         success: false,
//         message: 'Question ID is required'
//       }, { status: 400 })
//     }

//     // Fetch the question
//     const question = await prisma.speakingReadAloudQuestion.findUnique({
//       where: {
//         questionId: questionId
//       },
//       select: {
//         id: true,
//         questionId: true,
//         title: true,
//         passage: true,
//         difficulty: true,
//         createdAt: true,
//         updatedAt: true
//       }
//     })

//     if (!question) {
//       return NextResponse.json({
//         success: false,
//         message: 'Question not found'
//       }, { status: 404 })
//     }

//     // Calculate reading statistics
//     const wordCount = question.passage.split(' ').length
//     const estimatedReadingTime = Math.ceil(wordCount / 150) // Assuming 150 words per minute

//     return NextResponse.json({
//       success: true,
//       message: 'Question retrieved successfully',
//       data: {
//         id: question.id,
//         questionId: question.questionId,
//         title: question.title,
//         passage: question.passage,
//         difficulty: question.difficulty,
//         wordCount,
//         estimatedReadingTime,
//         instruction: "Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
//         preparationTime: 40, // seconds
//         createdAt: question.createdAt,
//         updatedAt: question.updatedAt
//       }
//     })

//   } catch (error) {
//     console.error('Error fetching Read Aloud question:', error)
//     return NextResponse.json({
//       success: false,
//       message: 'Internal server error'
//     }, { status: 500 })
//   }
// }

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { questionId: string } }
// ) {
//   try {
//     const { questionId } = await params
//     const body = await request.json()
//     const { userId, audioUrl, duration } = body

//     if (!questionId || !userId || !audioUrl) {
//       return NextResponse.json({
//         success: false,
//         message: 'Question ID, user ID, and audio URL are required'
//       }, { status: 400 })
//     }

//     // Validate audio URL format (basic validation)
//     if (typeof audioUrl !== 'string' || audioUrl.trim() === '') {
//       return NextResponse.json({
//         success: false,
//         message: 'Valid audio URL is required'
//       }, { status: 400 })
//     }

//     // Validate duration if provided
//     if (duration !== undefined && (typeof duration !== 'number' || duration <= 0)) {
//       return NextResponse.json({
//         success: false,
//         message: 'Duration must be a positive number'
//       }, { status: 400 })
//     }

//     // Fetch the question to ensure it exists
//     const question = await prisma.speakingReadAloudQuestion.findUnique({
//       where: {
//         questionId: questionId
//       }
//     })

//     if (!question) {
//       return NextResponse.json({
//         success: false,
//         message: 'Question not found'
//       }, { status: 404 })
//     }

//     // check user answer using AI
//     const ai_response = await evaluateUsingAI(audioUrl, question.passage)

//     // Save the answer
//     const answer = await prisma.speakingReadAloudAnswer.create({
//       data: {
//         userId,
//         questionId: question.id,
//         audioUrl: audioUrl.trim(),
//         duration,
//         contentScore: ai_response.contentScore,
//         oralFluencyScore: ai_response.oralFluency,
//         pronunciationScore: ai_response.pronunciation,
//         totalScore: ai_response.totalScore
//       }
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Audio recording submitted successfully',
//       data: {
//         answerId: answer.id,
//         questionId: question.questionId,
//         title: question.title,
//         audioUrl: answer.audioUrl,
//         duration: answer.duration,
//         submittedAt: answer.createdAt,
//         status: 'submitted',
//         note: 'Your recording has been submitted for evaluation. Scoring will be available after processing.'
//       }
//     })

//   } catch (error) {
//     console.error('Error submitting Read Aloud answer:', error)
//     return NextResponse.json({
//       success: false,
//       message: 'Internal server error'
//     }, { status: 500 })
//   }
// }

// // Optional: GET method to retrieve user's previous answers
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { questionId: string } }
// ) {
//   try {
//     const { questionId } = await params
//     const { searchParams } = new URL(request.url)
//     const userId = searchParams.get('userId')

//     if (!questionId || !userId) {
//       return NextResponse.json({
//         success: false,
//         message: 'Question ID and user ID are required'
//       }, { status: 400 })
//     }

//     // Fetch the question
//     const question = await prisma.speakingReadAloudQuestion.findUnique({
//       where: {
//         questionId: questionId
//       }
//     })

//     if (!question) {
//       return NextResponse.json({
//         success: false,
//         message: 'Question not found'
//       }, { status: 404 })
//     }

//     // Fetch user's answers for this question
//     const answers = await prisma.speakingReadAloudAnswer.findMany({
//       where: {
//         userId,
//         questionId: question.id
//       },
//       orderBy: {
//         createdAt: 'desc'
//       },
//       select: {
//         id: true,
//         audioUrl: true,
//         duration: true,
//         contentScore: true,
//         oralFluencyScore: true,
//         pronunciationScore: true,
//         totalScore: true,
//         createdAt: true
//       }
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'User answers retrieved successfully',
//       data: {
//         questionId: question.questionId,
//         title: question.title,
//         attempts: answers.length,
//         answers: answers.map(answer => ({
//           id: answer.id,
//           audioUrl: answer.audioUrl,
//           duration: answer.duration,
//           scores: {
//             content: answer.contentScore,
//             oralFluency: answer.oralFluencyScore,
//             pronunciation: answer.pronunciationScore,
//             total: answer.totalScore
//           },
//           submittedAt: answer.createdAt,
//           isEvaluated: answer.totalScore !== null
//         }))
//       }
//     })

//   } catch (error) {
//     console.error('Error fetching user answers:', error)
//     return NextResponse.json({
//       success: false,
//       message: 'Internal server error'
//     }, { status: 500 })
//   }
// }

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ questionId: string }> }
): Promise<NextResponse<ApiResponse<SpeakingReadAloudQuestion | null>>> {
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

        const question = await speakingController.getReadAloudQuestionById(questionId);

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