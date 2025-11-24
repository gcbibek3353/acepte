import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import speakingController from "../../../speaking.controller";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ questionId: string }> }
) {
    try {
        const { questionId } = await params;

        const authCheck = await auth_middleware(req);
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

        if (!questionId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to get the question Id",
                    data: null
                },
                { status: 400 }
            );
        }

        const result = await speakingController.addOrRemoveSummarizeGroupDiscussionBookmark(userId, questionId);
        return NextResponse.json(
            {
                success: true,
                message: `Bookmark ${result === null ? 'removed' : 'added'} successfully`,
                data: result
            },
            { status: 200 }
        );

    }
    catch (error) {
        console.error("Error bookmarking summarize group discussion question:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                data: null
            },
            { status: 500 }
        );
    }
}   