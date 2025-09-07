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
    const totalCount = await prisma.fillBlanksDragDropPassage.count({
      where: whereClause
    })

    // Fetch passages
    const passages = await prisma.fillBlanksDragDropPassage.findMany({
      where: whereClause,
      select: {
        id: true,
        questionId: true,
        title: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true,
        blanks: {
          select: {
            id: true,
            position: true
          }
        },
        options: {
          select: {
            id: true,
            text: true
            // Don't include blankPosition to prevent revealing answers
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
      message: 'FibDD questions retrieved successfully',
      data: {
        questions: passages.map(passage => ({
          id: passage.id,
          questionId: passage.questionId,
          title: passage.title,
          difficulty: passage.difficulty,
          blanksCount: passage.blanks.length,
          optionsCount: passage.options.length,
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
    console.error('Error fetching FibDD questions:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}