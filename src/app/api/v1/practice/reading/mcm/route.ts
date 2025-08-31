import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const difficulty = searchParams.get('difficulty') as 'EASY' | 'MEDIUM' | 'HARD' | null
    
    const skip = (page - 1) * limit

    // Build where clause
    const whereClause: {
      isActive: boolean
      difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
    } = {
      isActive: true
    }

    if (difficulty) {
      whereClause.difficulty = difficulty
    }

    // Get total count for pagination
    const totalCount = await prisma.multipleChoiceMultiplePassage.count({
      where: whereClause
    })

    // Fetch passages
    const passages = await prisma.multipleChoiceMultiplePassage.findMany({
      where: whereClause,
      select: {
        id: true,
        questionId: true,
        title: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true,
        question: {
          select: {
            prompt: true,
            options: {
              select: {
                id: true,
                text: true
                // Don't include isCorrect to prevent cheating
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      message: 'Questions retrieved successfully',
      data: {
        questions: passages.map(passage => ({
          id: passage.id,
          questionId: passage.questionId,
          title: passage.title,
          difficulty: passage.difficulty,
          prompt: passage.question?.prompt || '',
          optionsCount: passage.question?.options.length || 0,
          createdAt: passage.createdAt,
          updatedAt: passage.updatedAt
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    })

  } catch (error) {
    console.error('Error fetching MCM questions:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
