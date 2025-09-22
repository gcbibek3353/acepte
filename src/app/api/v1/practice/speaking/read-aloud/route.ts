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
      difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
    } = {}

    if (difficulty) {
      whereClause.difficulty = difficulty
    }

    // Get total count for pagination
    const totalCount = await prisma.speakingReadAloudQuestion.count({
      where: whereClause
    })

    // Fetch questions
    const questions = await prisma.speakingReadAloudQuestion.findMany({
      where: whereClause,
      select: {
        id: true,
        questionId: true,
        title: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true,
        passage: true
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
      message: 'Read Aloud questions retrieved successfully',
      data: {
        questions: questions.map(question => ({
          id: question.id,
          questionId: question.questionId,
          title: question.title,
          difficulty: question.difficulty,
          wordCount: question.passage.split(' ').length,
          passagePreview: question.passage.substring(0, 100) + (question.passage.length > 100 ? '...' : ''),
          createdAt: question.createdAt,
          updatedAt: question.updatedAt
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
    console.error('Error fetching Read Aloud questions:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}