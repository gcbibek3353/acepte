import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import prisma from "@/lib/prisma";
import { MockTestQuestionType } from "@/generated/prisma";

const questionTypeModelMap: Record<MockTestQuestionType, string> = {
  READ_ALOUD:                       "speakingReadAloudQuestion",
  REPEAT_SENTENCE:                  "speakingRepeatSentenceQuestion",
  DESCRIBE_IMAGE:                   "speakingDescribeImageQuestion",
  RETELL_LECTURE:                   "speakingRetellLectureQuestion",
  ANSWER_SHORT_QUESTION:            "speakingAnswerShortQuestion",
  SUMMARIZE_WRITTEN_TEXT:           "summarizeWrittenTextQuestion",
  WRITE_ESSAY:                      "writeEssayQuestion",
  READING_MCM:                      "multipleChoiceMultiplePassage",
  READING_MCS:                      "multipleChoiceSinglePassage",
  REORDER_PARAGRAPHS:               "reorderParagraphPassage",
  READING_FILL_BLANKS_DRAG_DROP:    "fillBlanksDragDropPassage",
  READING_FILL_BLANKS_DROPDOWN:     "fillBlanksDropdownPassage",
  SUMMARIZE_SPOKEN_TEXT:            "summarizeSpokenTextQuestion",
  LISTENING_MCM:                    "listeningMCMPassage",
  LISTENING_MCS:                    "listeningMCSPassage",
  LISTENING_FILL_BLANKS:            "listeningFillBlankPassage",
  LISTENING_HIGHLIGHT_SUMMARY:      "listeningHighlightSummaryPassage",
  LISTENING_SELECT_MISSING_WORD:    "listeningSelectMissingWordPassage",
  LISTENING_HIGHLIGHT_INCORRECT_WORDS: "listeningHighlightIncorrectWordsPassage",
  WRITE_FROM_DICTATION:             "listeningWriteFromDictationPassage",
};

// Models that use a non-standard title field
const titleFieldOverrides: Partial<Record<MockTestQuestionType, string>> = {
  WRITE_ESSAY:            "essayTitle",
  SUMMARIZE_WRITTEN_TEXT: "textTitle",
};

const VALID_TYPES = Object.values(MockTestQuestionType);
const VALID_DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];

// GET /api/v1/admin/questions?type=READ_ALOUD&search=climate&difficulty=MEDIUM&page=1&limit=20
export async function GET(req: NextRequest) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const sp = req.nextUrl.searchParams;
    const type       = sp.get("type") as MockTestQuestionType | null;
    const search     = sp.get("search")?.trim() || null;
    const difficulty = sp.get("difficulty");
    const page       = Math.max(1, parseInt(sp.get("page") || "1"));
    const limit      = Math.min(50, Math.max(1, parseInt(sp.get("limit") || "20")));

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { success: false, message: `type is required and must be one of: ${VALID_TYPES.join(", ")}`, data: null },
        { status: 400 }
      );
    }

    if (difficulty && !VALID_DIFFICULTIES.includes(difficulty)) {
      return NextResponse.json(
        { success: false, message: "difficulty must be EASY, MEDIUM, or HARD", data: null },
        { status: 400 }
      );
    }

    const modelName  = questionTypeModelMap[type];
    const titleField = titleFieldOverrides[type] ?? "title";
    const model      = (prisma as any)[modelName];

    const where: any = {};
    if (difficulty)  where.difficulty = difficulty;
    if (search)      where[titleField] = { contains: search, mode: "insensitive" };

    const skip = (page - 1) * limit;

    const [rows, total] = await prisma.$transaction([
      model.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: { id: true, [titleField]: true, questionId: true, difficulty: true },
      }),
      model.count({ where }),
    ]);

    // Normalize title field to a consistent `title` key
    const questions = rows.map((q: any) => ({
      id:         q.id,
      title:      q[titleField] as string,
      questionId: q.questionId as string,
      difficulty: q.difficulty as string,
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Questions fetched successfully",
        data: {
          questions,
          pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /admin/questions:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
