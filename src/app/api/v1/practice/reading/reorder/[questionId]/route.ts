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

    // Fetch the passage with its paragraphs
    const passage = await prisma.reorderParagraphPassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        paragraphs: {
          select: {
            id: true,
            text: true
            // Don't include correctOrder in the response to prevent cheating
          },
          // Randomize the order of paragraphs for the user
          orderBy: {
            id: 'asc' // You might want to randomize this differently
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

    // Shuffle paragraphs to present them in random order
    const shuffledParagraphs = [...passage.paragraphs].sort(() => Math.random() - 0.5)

    return NextResponse.json({
      success: true,
      message: 'Question retrieved successfully',
      data: {
        id: passage.id,
        questionId: passage.questionId,
        title: passage.title,
        difficulty: passage.difficulty,
        paragraphs: shuffledParagraphs,
        instruction: "Drag and drop the paragraphs to arrange them in the correct order.",
        createdAt: passage.createdAt,
        updatedAt: passage.updatedAt
      }
    })

  } catch (error) {
    console.error('Error fetching reorder question:', error)
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
    const { userId, userOrder } = body

    if (!questionId || !userId || !userOrder) {
      return NextResponse.json({
        success: false,
        message: 'Question ID, user ID, and user order are required'
      }, { status: 400 })
    }

    if (!Array.isArray(userOrder)) {
      return NextResponse.json({
        success: false,
        message: 'User order must be an array'
      }, { status: 400 })
    }

    // Fetch the passage with correct order information
    const passage = await prisma.reorderParagraphPassage.findUnique({
      where: {
        questionId: questionId,
        isActive: true
      },
      include: {
        paragraphs: {
          orderBy: {
            correctOrder: 'asc'
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

    // Validate that all paragraph IDs are provided
    const correctParagraphIds = passage.paragraphs.map(p => p.id)
    const userParagraphIds = userOrder

    if (correctParagraphIds.length !== userParagraphIds.length) {
      return NextResponse.json({
        success: false,
        message: 'Invalid number of paragraphs in user order'
      }, { status: 400 })
    }

    // Check if all paragraph IDs are valid
    const invalidIds = userParagraphIds.filter(id => !correctParagraphIds.includes(id))
    if (invalidIds.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid paragraph IDs provided'
      }, { status: 400 })
    }

    // Calculate score
    const correctOrder = passage.paragraphs.map(p => p.id)
    let correctPositions = 0

    for (let i = 0; i < userOrder.length; i++) {
      if (userOrder[i] === correctOrder[i]) {
        correctPositions++
      }
    }

    // Calculate score as percentage
    const totalScore = (correctPositions / correctOrder.length) * 100

    // Save the answer
    const answer = await prisma.reorderParagraphAnswer.create({
      data: {
        userId,
        passageId: passage.id,
        userOrder,
        totalScore
      }
    })

    // Prepare detailed results
    const results = passage.paragraphs.map((paragraph, index) => ({
      id: paragraph.id,
      text: paragraph.text,
      correctPosition: paragraph.correctOrder,
      userPosition: userOrder.indexOf(paragraph.id) + 1,
      isCorrect: userOrder[index] === paragraph.id
    }))

    return NextResponse.json({
      success: true,
      message: 'Answer submitted and evaluated successfully',
      data: {
        answerId: answer.id,
        totalScore: Math.round(totalScore * 100) / 100,
        correctPositions,
        totalParagraphs: correctOrder.length,
        results,
        correctOrder: passage.paragraphs.map((p, index) => ({
          id: p.id,
          text: p.text,
          correctPosition: p.correctOrder
        })),
        explanation: {
          scoringMethod: 'Each paragraph in correct position: 1 point. Total score = (correct positions / total paragraphs) × 100'
        }
      }
    })

  } catch (error) {
    console.error('Error submitting reorder answer:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}