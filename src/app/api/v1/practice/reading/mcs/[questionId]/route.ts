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

    // Fetch the passage with its options
    const passage = await prisma.multipleChoiceSinglePassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      select: {
        id: true,
        questionId: true,
        title: true,
        content: true,
        difficulty: true,
        questionText: true,
        options: true,
        createdAt: true,
        updatedAt: true
        // Don't include correctOptionIndex to prevent cheating
      }
    })

    if (!passage) {
      return NextResponse.json({
        success: false,
        message: 'Question not found'
      }, { status: 404 })
    }

    // Ensure we have exactly 4 options
    if (passage.options.length !== 4) {
      return NextResponse.json({
        success: false,
        message: 'Invalid question format - must have exactly 4 options'
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
        questionText: passage.questionText,
        options: passage.options.map((option, index) => ({
          index: index,
          text: option
        })),
        instruction: "Read the passage and select the best answer from the options provided.",
        createdAt: passage.createdAt,
        updatedAt: passage.updatedAt
      }
    })

  } catch (error) {
    console.error('Error fetching MCS question:', error)
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
    const { userId, selectedOptionIndex } = body

    if (!questionId || !userId || selectedOptionIndex === undefined) {
      return NextResponse.json({
        success: false,
        message: 'Question ID, user ID, and selected option index are required'
      }, { status: 400 })
    }

    if (typeof selectedOptionIndex !== 'number' || selectedOptionIndex < 0) {
      return NextResponse.json({
        success: false,
        message: 'Selected option index must be a valid non-negative number'
      }, { status: 400 })
    }

    // Fetch the passage with correct answer information
    const passage = await prisma.multipleChoiceSinglePassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      }
    })

    if (!passage) {
      return NextResponse.json({
        success: false,
        message: 'Question not found'
      }, { status: 404 })
    }

    // Validate selected option index
    if (selectedOptionIndex >= passage.options.length) {
      return NextResponse.json({
        success: false,
        message: 'Invalid option index'
      }, { status: 400 })
    }

    // Calculate score (100 for correct, 0 for incorrect)
    const isCorrect = selectedOptionIndex === passage.correctOptionIndex
    const totalScore = isCorrect ? 100 : 0

    // Save the answer
    const answer = await prisma.multipleChoiceSingleAnswer.create({
      data: {
        userId,
        passageId: passage.id,
        selectedOptionIndex,
        totalScore
      }
    })

    // Prepare detailed results
    const results = passage.options.map((option, index) => ({
      index: index,
      text: option,
      isCorrect: index === passage.correctOptionIndex,
      wasSelected: index === selectedOptionIndex,
      status: (() => {
        if (index === passage.correctOptionIndex && index === selectedOptionIndex) {
          return 'correct_selected'
        } else if (index === passage.correctOptionIndex && index !== selectedOptionIndex) {
          return 'correct_not_selected'
        } else if (index !== passage.correctOptionIndex && index === selectedOptionIndex) {
          return 'incorrect_selected'
        } else {
          return 'incorrect_not_selected'
        }
      })()
    }))

    return NextResponse.json({
      success: true,
      message: 'Answer submitted and evaluated successfully',
      data: {
        answerId: answer.id,
        totalScore,
        isCorrect,
        selectedOption: {
          index: selectedOptionIndex,
          text: passage.options[selectedOptionIndex]
        },
        correctOption: {
          index: passage.correctOptionIndex,
          text: passage.options[passage.correctOptionIndex]
        },
        results,
        explanation: {
          scoringMethod: 'Correct answer: 100 points, Incorrect answer: 0 points'
        }
      }
    })

  } catch (error) {
    console.error('Error submitting MCS answer:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}