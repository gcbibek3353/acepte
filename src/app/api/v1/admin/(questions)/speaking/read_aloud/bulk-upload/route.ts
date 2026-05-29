import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

// Expected columns: questionId | title | passage | difficulty
interface RowData {
  questionId: string;
  title: string;
  passage: string;
  difficulty: string;
}

interface FailedRow {
  row: number;
  error: string;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<RowData>(sheet, { defval: "" });

    if (rows.length === 0) {
      return NextResponse.json({ error: "Excel sheet is empty" }, { status: 400 });
    }

    const failed: FailedRow[] = [];
    let created = 0;

    for (let i = 0; i < rows.length; i++) {
      const rowNumber = i + 2; // row 1 is the header
      const { questionId, title, passage, difficulty } = rows[i];

      if (!questionId || !title || !passage || !difficulty) {
        failed.push({
          row: rowNumber,
          error: `Missing required fields: ${[
            !questionId && "questionId",
            !title && "title",
            !passage && "passage",
            !difficulty && "difficulty",
          ]
            .filter(Boolean)
            .join(", ")}`,
        });
        continue;
      }

      try {
        await prisma.speakingReadAloudQuestion.create({
          data: {
            questionId: String(questionId),
            title: String(title),
            passage: String(passage),
            difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
          },
        });
        created++;
      } catch (err) {
        failed.push({
          row: rowNumber,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      total: rows.length,
      created,
      failedCount: failed.length,
      failed,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
  }
}
