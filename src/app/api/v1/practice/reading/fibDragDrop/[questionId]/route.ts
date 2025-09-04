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

    // Fetch the passage with its blanks and options
    const passage = await prisma.fillBlanksDragDropPassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        blanks: {
          select: {
            position: true
            // Don't include correctOptionId to prevent cheating
          },
          orderBy: {
            position: 'asc'
          }
        },
        options: {
          select: {
            id: true,
            text: true
            // Don't include blankPosition or correctForBlank to prevent cheating
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

    // Validate that we have blanks and options
    if (passage.blanks.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Question has no blanks'
      }, { status: 500 })
    }

    if (passage.options.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Question has no options'
      }, { status: 500 })
    }

    // Shuffle the options to randomize their order
    const shuffledOptions = [...passage.options].sort(() => Math.random() - 0.5)

    return NextResponse.json({
      success: true,
      message: 'Question retrieved successfully',
      data: {
        id: passage.id,
        questionId: passage.questionId,
        title: passage.title,
        content: passage.content,
        difficulty: passage.difficulty,
        blanks: passage.blanks.map(blank => ({
          position: blank.position
        })),
        options: shuffledOptions,
        instruction: "Drag and drop the words/phrases from the box below to fill in the blanks in the passage.",
        createdAt: passage.createdAt,
        updatedAt: passage.updatedAt
      }
    })

  } catch (error) {
    console.error('Error fetching FibDD question:', error)
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
    const { userId, answers } = body

    if (!questionId || !userId || !answers) {
      return NextResponse.json({
        success: false,
        message: 'Question ID, user ID, and answers are required'
      }, { status: 400 })
    }

    if (typeof answers !== 'object' || Array.isArray(answers)) {
      return NextResponse.json({
        success: false,
        message: 'Answers must be an object with position-optionId pairs'
      }, { status: 400 })
    }

    // Fetch the passage with correct answers
    const passage = await prisma.fillBlanksDragDropPassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        blanks: {
          include: {
            correctOption: true
          },
          orderBy: {
            position: 'asc'
          }
        },
        options: true
      }
    })

    if (!passage) {
      return NextResponse.json({
        success: false,
        message: 'Question not found'
      }, { status: 404 })
    }

    // Validate that all blanks have answers
    const requiredPositions = passage.blanks.map(blank => blank.position.toString())
    const providedPositions = Object.keys(answers)
    
    for (const pos of requiredPositions) {
      if (!providedPositions.includes(pos)) {
        return NextResponse.json({
          success: false,
          message: `Answer missing for blank position ${pos}`
        }, { status: 400 })
      }
    }

    // Validate that all provided option IDs exist
    const validOptionIds = passage.options.map(opt => opt.id)
    const providedOptionIds = Object.values(answers) as string[]
    
    for (const optionId of providedOptionIds) {
      if (!validOptionIds.includes(optionId)) {
        return NextResponse.json({
          success: false,
          message: 'Invalid option ID provided'
        }, { status: 400 })
      }
    }

    // Calculate score
    let correctCount = 0
    const totalBlanks = passage.blanks.length

    const results = passage.blanks.map(blank => {
      const userOptionId = answers[blank.position.toString()]
      const isCorrect = userOptionId === blank.correctOptionId
      
      if (isCorrect) {
        correctCount++
      }

      const userOption = passage.options.find(opt => opt.id === userOptionId)
      
      return {
        position: blank.position,
        correctOption: {
          id: blank.correctOption.id,
          text: blank.correctOption.text
        },
        userOption: {
          id: userOptionId,
          text: userOption?.text || ''
        },
        isCorrect
      }
    })

    // Calculate percentage score
    const totalScore = (correctCount / totalBlanks) * 100

    // Save the answer
    const answer = await prisma.fillBlanksDragDropAnswer.create({
      data: {
        userId,
        passageId: passage.id,
        answers,
        totalScore
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Answer submitted and evaluated successfully',
      data: {
        answerId: answer.id,
        totalScore: Math.round(totalScore * 100) / 100,
        correctCount,
        totalBlanks,
        results,
        explanation: {
          scoringMethod: 'Each correct blank: 1 point. Total score = (correct answers / total blanks) × 100'
        }
      }
    })

  } catch (error) {
    console.error('Error submitting FibDD answer:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}