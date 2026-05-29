import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { questionId, title, passage, difficulty } = await req.json();

    if (!questionId || !title || !passage || !difficulty) {
      return NextResponse.json(
        { error: "questionId, title, passage, and difficulty are required" },
        { status: 400 }
      );
    }

    const question = await prisma.speakingReadAloudQuestion.create({
      data: { questionId, title, passage, difficulty },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}