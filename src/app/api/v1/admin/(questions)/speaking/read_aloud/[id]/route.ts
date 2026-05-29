import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { title, passage, difficulty } = await req.json();

    const question = await prisma.speakingReadAloudQuestion.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(passage !== undefined && { passage }),
        ...(difficulty !== undefined && { difficulty }),
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.speakingReadAloudQuestion.delete({ where: { id } });

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
  }
}
