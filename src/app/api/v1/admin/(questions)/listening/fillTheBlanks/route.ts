import { admin_auth_middleware } from "@/lib/auth-middleware";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// create a post endpoint which takes all the question data in the body and then saves it to the database
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { blanks, ...passageData } = body;

        await admin_auth_middleware(req);

        const existingQuestion = await prisma.listeningFillBlankPassage.findUnique({
            where: { questionId: passageData.questionId }
        })

        if (existingQuestion) {
            NextResponse.json({ message: 'Question already exists' }, { status: 400 });
        }

        // Create the passage first
        const createdPassage = await prisma.listeningFillBlankPassage.create({
            data: passageData
        })

        for (const blank of blanks) {
            await prisma.listeningFillBlank.create({
                data: {
                    passageId: createdPassage.id,
                    position: blank.position,
                    correctWord: blank.correctWord.trim().toLowerCase() // Store trimmed and lowercased
                }
            })
        }

        return NextResponse.json({ message: 'Question created successfully' }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating question:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}