import { NextRequest, NextResponse } from 'next/server'
import { auth_middleware } from '@/lib/auth-middleware';
import speakingController from '../speaking.controller';

interface QuestionQuery {
  page?: number;       // default 1
  limit?: number;      // default 10
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  answered?: boolean;  // true = answered, false = unanswered
  bookmarked?: boolean; // true = bookmarked, false = unbookmarked
}

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const page = parseInt(searchParams.get('page') || '1')
//     const limit = parseInt(searchParams.get('limit') || '10')
//     const difficulty = searchParams.get('difficulty') as 'EASY' | 'MEDIUM' | 'HARD' | null

//     const skip = (page - 1) * limit

//     // Build where clause
//     const whereClause: {
//       difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
//     } = {}

//     if (difficulty) {
//       whereClause.difficulty = difficulty
//     }

//     // Get total count for pagination
//     const totalCount = await prisma.speakingReadAloudQuestion.count({
//       where: whereClause
//     })

//     // Fetch questions
//     const questions = await prisma.speakingReadAloudQuestion.findMany({
//       where: whereClause,
//       select: {
//         id: true,
//         questionId: true,
//         title: true,
//         difficulty: true,
//         createdAt: true,
//         updatedAt: true,
//         passage: true
//       },
//       orderBy: {
//         createdAt: 'desc'
//       },
//       skip,
//       take: limit
//     })

//     const totalPages = Math.ceil(totalCount / limit)

//     return NextResponse.json({
//       success: true,
//       message: 'Read Aloud questions retrieved successfully',
//       data: {
//         questions: questions.map(question => ({
//           id: question.id,
//           questionId: question.questionId,
//           title: question.title,
//           difficulty: question.difficulty,
//           wordCount: question.passage.split(' ').length,
//           passagePreview: question.passage.substring(0, 100) + (question.passage.length > 100 ? '...' : ''),
//           createdAt: question.createdAt,
//           updatedAt: question.updatedAt
//         })),
//         pagination: {
//           currentPage: page,
//           totalPages,
//           totalCount,
//           hasNext: page < totalPages,
//           hasPrev: page > 1
//         }
//       }
//     })

//   } catch (error) {
//     console.error('Error fetching Read Aloud questions:', error)
//     return NextResponse.json({
//       success: false,
//       message: 'Internal server error'
//     }, { status: 500 })
//   }
// }

export async function GET(request: NextRequest) {
  try {
    const t0 = performance.now();
    const { searchParams } = new URL(request.url);

    const authCheck = await auth_middleware(request);
    const tAuth = performance.now();

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

    // Parse query parameters with defaults
    const queryParams: QuestionQuery = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      difficulty: searchParams.get('difficulty') as "EASY" | "MEDIUM" | "HARD" || undefined,
      answered: searchParams.get('answered') ? searchParams.get('answered') === 'true' : undefined,
      bookmarked: searchParams.get('bookmarked') ? searchParams.get('bookmarked') === 'true' : undefined,
    };
    // Validate parameters
    if (queryParams.page && queryParams.page < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Page must be greater than 0",
          data: null
        },
        { status: 400 }
      );
    }

    if (queryParams.limit && (queryParams.limit < 1 || queryParams.limit > 100)) {
      return NextResponse.json(
        {
          success: false,
          message: "Limit must be between 1 and 100",
          data: null
        },
        { status: 400 }
      );
    }

    const result = await speakingController.getReadAloudQuestions(userId, queryParams);
    const tDB = performance.now();

    console.log(`[read-aloud GET] auth: ${(tAuth - t0).toFixed(1)}ms | db: ${(tDB - tAuth).toFixed(1)}ms | total: ${(tDB - t0).toFixed(1)}ms`);
    return NextResponse.json(
      {
        success: true,
        message: "Questions fetched successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching read aloud questions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        data: null
      },
      { status: 500 }
    );
  }
}