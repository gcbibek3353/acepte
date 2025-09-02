import { NextRequest, NextResponse } from "next/server";
import listeningController from "../../../listening.controller";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ questionId: string }> }
) {
    try {
        const { questionId } = await params;
        const userId = "6I7UHDZKl7XMaNAbV0g6pOKTdTzGeOj3"
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

        const result = await listeningController.addOrRemoveHCSBookmark(userId, questionId);
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
        console.error("Error bookmarking highlight correct summary question:", error);
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