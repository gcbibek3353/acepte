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

    // Fetch the passage with its blanks
    const passage = await prisma.fillBlanksDropdownPassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        blanks: {
          select: {
            position: true,
            options: true
            // Don't include correctIndex to prevent cheating
          },
          orderBy: {
            position: 'asc'
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

    // Validate that we have blanks
    if (passage.blanks.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Question has no blanks'
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
        blanks: passage.blanks.map(blank => ({
          position: blank.position,
          options: blank.options.map((option, index) => ({
            index: index,
            text: option
          }))
        })),
        instruction: "Select the most appropriate word or phrase from the dropdown menu to complete each blank in the passage.",
        createdAt: passage.createdAt,
        updatedAt: passage.updatedAt
      }
    })

  } catch (error) {
    console.error('Error fetching FibDropdown question:', error)
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
        message: 'Answers must be an object with position-index pairs'
      }, { status: 400 })
    }

    // Fetch the passage with correct answers
    const passage = await prisma.fillBlanksDropdownPassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        blanks: {
          orderBy: {
            position: 'asc'
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

    // Validate that all provided indices are valid
    for (const [position, selectedIndex] of Object.entries(answers)) {
      const blank = passage.blanks.find(b => b.position.toString() === position)
      if (!blank) {
        return NextResponse.json({
          success: false,
          message: `Invalid blank position: ${position}`
        }, { status: 400 })
      }
      
      const index = parseInt(selectedIndex as string)
      if (isNaN(index) || index < 0 || index >= blank.options.length) {
        return NextResponse.json({
          success: false,
          message: `Invalid option index ${selectedIndex} for blank position ${position}`
        }, { status: 400 })
      }
    }

    // Calculate score
    let correctCount = 0
    const totalBlanks = passage.blanks.length

    const results = passage.blanks.map(blank => {
      const userSelectedIndex = parseInt(answers[blank.position.toString()])
      const isCorrect = userSelectedIndex === blank.correctIndex
      
      if (isCorrect) {
        correctCount++
      }

      return {
        position: blank.position,
        correctOption: {
          index: blank.correctIndex,
          text: blank.options[blank.correctIndex]
        },
        userOption: {
          index: userSelectedIndex,
          text: blank.options[userSelectedIndex]
        },
        allOptions: blank.options.map((option, index) => ({
          index: index,
          text: option,
          isCorrect: index === blank.correctIndex,
          wasSelected: index === userSelectedIndex
        })),
        isCorrect
      }
    })

    // Calculate percentage score
    const totalScore = (correctCount / totalBlanks) * 100

    // Save the answer
    const answer = await prisma.fillBlanksDropdownAnswer.create({
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
          scoringMethod: 'Each correct dropdown selection: 1 point. Total score = (correct answers / total blanks) × 100'
        }
      }
    })

  } catch (error) {
    console.error('Error submitting FibDropdown answer:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}