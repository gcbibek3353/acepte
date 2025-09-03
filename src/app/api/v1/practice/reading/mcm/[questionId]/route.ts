import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const { questionId } = await params

    if (!questionId) {
      return NextResponse.json({
        success: false,
        message: 'Question ID is required'
      }, { status: 400 })
    }

    // Fetch the passage with its question and options
    const passage = await prisma.multipleChoiceMultiplePassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        options: {
          select: {
            id: true,
            text: true,
            // Don't include isCorrect in the response to prevent cheating
          }
        }

      }
    })

    if (!passage) {
      return NextResponse.json({
        success: false,
        message: 'Question not found'
      }, { status: 404 })
    }

    // Ensure we have exactly 5 options
    if (passage.options.length !== 5) {
      return NextResponse.json({
        success: false,
        message: 'Invalid question format - must have exactly 5 options'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Question retrieved successfully',
      data: {
        id: passage.id,
        questionId: passage.questionId,
        title: passage.title,
        content: passage.content,
        difficulty: passage.difficulty,
        prompt: passage.questionText,
        options: passage.options,
        createdAt: passage.createdAt,
        updatedAt: passage.updatedAt
      }
    })

  } catch (error) {
    console.error('Error fetching MCM question:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const { questionId } = await params
    const body = await request.json()
    const { userId, selectedOptions } = body

    if (!questionId || !userId || !selectedOptions) {
      return NextResponse.json({
        success: false,
        message: 'Question ID, user ID, and selected options are required'
      }, { status: 400 })
    }

    if (!Array.isArray(selectedOptions)) {
      return NextResponse.json({
        success: false,
        message: 'Selected options must be an array'
      }, { status: 400 })
    }

    // Fetch the passage with correct answers
    const passage = await prisma.multipleChoiceMultiplePassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        options: true
      }
    })

    if (!passage) {
      return NextResponse.json({
        success: false,
        message: 'Question not found'
      }, { status: 404 })
    }

    // Get correct option IDs
    const correctOptionIds = passage.options
      .filter(option => option.isCorrect)
      .map(option => option.id)

    // Calculate score
    const totalCorrect = correctOptionIds.length
    const userCorrect = selectedOptions.filter(optionId =>
      correctOptionIds.includes(optionId)
    ).length
    const userIncorrect = selectedOptions.filter(optionId =>
      !correctOptionIds.includes(optionId)
    ).length

    // Scoring: +1 for each correct selection, -1 for each incorrect selection
    // Minimum score is 0
    const rawScore = userCorrect - userIncorrect
    const totalScore = Math.max(0, rawScore) / totalCorrect * 100

    // Save the answer
    const answer = await prisma.multipleChoiceMultipleAnswer.create({
      data: {
        userId,
        passageId: passage.id,
        selectedOptions,
        totalScore
      }
    })

    // Prepare detailed results
    const results = passage.options.map(option => ({
      id: option.id,
      text: option.text,
      isCorrect: option.isCorrect,
      wasSelected: selectedOptions.includes(option.id),
      status: option.isCorrect
        ? (selectedOptions.includes(option.id) ? 'correct_selected' : 'correct_not_selected')
        : (selectedOptions.includes(option.id) ? 'incorrect_selected' : 'incorrect_not_selected')
    }))

    return NextResponse.json({
      success: true,
      message: 'Answer submitted and evaluated successfully',
      data: {
        answerId: answer.id,
        totalScore: Math.round(totalScore * 100) / 100,
        correctAnswers: totalCorrect,
        userCorrectSelections: userCorrect,
        userIncorrectSelections: userIncorrect,
        results,
        explanation: {
          correctOptionIds,
          scoringMethod: 'Each correct selection: +1 point, Each incorrect selection: -1 points, Minimum: 0 points'
        }
      }
    })

  } catch (error) {
    console.error('Error submitting MCM answer:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}