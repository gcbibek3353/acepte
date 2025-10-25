import { auth_middleware } from "@/lib/auth-middleware";
import { NextRequest, NextResponse } from "next/server";
import readingController from "../reading.controller";

interface QuestionQuery {
    page?: number;       // default 1
    limit?: number;      // default 10
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    answered?: boolean;  // true = answered, false = unanswered
    bookmarked?: boolean; // true = bookmarked, false = unbookmarked
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const authCheck = await auth_middleware(request);
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

        const result = await readingController.getFibDropdownQuestions(userId, queryParams);

        return NextResponse.json(
            {
                success: true,
                message: "Questions fetched successfully",
                data: result,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching fill blanks dropdown questions:", error);
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