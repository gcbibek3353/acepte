import prisma from "@/lib/prisma";
import { MockTestQuestionType, MockTestStatus, PteSection } from "@/generated/prisma";

// Maps each question type to its Prisma model name
const questionTypeModelMap: Record<MockTestQuestionType, string> = {
  READ_ALOUD: "speakingReadAloudQuestion",
  REPEAT_SENTENCE: "speakingRepeatSentenceQuestion",
  DESCRIBE_IMAGE: "speakingDescribeImageQuestion",
  RETELL_LECTURE: "speakingRetellLectureQuestion",
  ANSWER_SHORT_QUESTION: "speakingAnswerShortQuestion",
  SUMMARIZE_WRITTEN_TEXT: "summarizeWrittenTextQuestion",
  WRITE_ESSAY: "writeEssayQuestion",
  READING_MCM: "multipleChoiceMultiplePassage",
  READING_MCS: "multipleChoiceSinglePassage",
  REORDER_PARAGRAPHS: "reorderParagraphPassage",
  READING_FILL_BLANKS_DRAG_DROP: "fillBlanksDragDropPassage",
  READING_FILL_BLANKS_DROPDOWN: "fillBlanksDropdownPassage",
  SUMMARIZE_SPOKEN_TEXT: "summarizeSpokenTextQuestion",
  LISTENING_MCM: "listeningMCMPassage",
  LISTENING_MCS: "listeningMCSPassage",
  LISTENING_FILL_BLANKS: "listeningFillBlankPassage",
  LISTENING_HIGHLIGHT_SUMMARY: "listeningHighlightSummaryPassage",
  LISTENING_SELECT_MISSING_WORD: "listeningSelectMissingWordPassage",
  LISTENING_HIGHLIGHT_INCORRECT_WORDS: "listeningHighlightIncorrectWordsPassage",
  WRITE_FROM_DICTATION: "listeningWriteFromDictationPassage",
};

// Some models use a non-standard title field
const titleFieldOverrides: Partial<Record<MockTestQuestionType, string>> = {
  WRITE_ESSAY: "essayTitle",
  SUMMARIZE_WRITTEN_TEXT: "textTitle",
};

async function validateQuestionExists(questionType: MockTestQuestionType, questionId: string): Promise<boolean> {
  const modelName = questionTypeModelMap[questionType];
  const record = await (prisma as any)[modelName].findUnique({ where: { id: questionId }, select: { id: true } });
  return record !== null;
}

async function getQuestionPreview(questionType: MockTestQuestionType, questionId: string) {
  const modelName = questionTypeModelMap[questionType];
  const titleField = titleFieldOverrides[questionType] ?? "title";
  const record = await (prisma as any)[modelName].findUnique({
    where: { id: questionId },
    select: { id: true, [titleField]: true, questionId: true },
  });
  if (!record) return null;
  return { id: record.id, title: record[titleField] as string, questionId: record.questionId as string };
}

// ── Mock Test CRUD ─────────────────────────────────────────────────────────────

async function createMockTest(data: { title: string; description?: string; totalTime: number }) {
  return prisma.mockTest.create({
    data: {
      title: data.title,
      description: data.description,
      totalTime: data.totalTime,
    },
  });
}

async function getAllMockTests(params: { page: number; limit: number; status?: MockTestStatus }) {
  const skip = (params.page - 1) * params.limit;
  const where = params.status ? { status: params.status } : {};

  const [tests, total] = await prisma.$transaction([
    prisma.mockTest.findMany({
      where,
      skip,
      take: params.limit,
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { attempts: true } },
        sections: {
          orderBy: { order: "asc" },
          include: { _count: { select: { questions: true } } },
        },
      },
    }),
    prisma.mockTest.count({ where }),
  ]);

  return {
    tests,
    pagination: {
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    },
  };
}

async function getMockTestById(testId: string) {
  const test = await prisma.mockTest.findUnique({
    where: { id: testId },
    include: {
      _count: { select: { attempts: true } },
      sections: {
        orderBy: { order: "asc" },
        include: {
          questions: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!test) return null;

  // Enrich each question with a title preview from its source model
  const enrichedSections = await Promise.all(
    test.sections.map(async (section) => {
      const enrichedQuestions = await Promise.all(
        section.questions.map(async (q) => {
          const preview = await getQuestionPreview(q.questionType, q.questionId);
          return { ...q, questionPreview: preview };
        })
      );
      return { ...section, questions: enrichedQuestions };
    })
  );

  return { ...test, sections: enrichedSections };
}

async function updateMockTest(testId: string, data: { title?: string; description?: string; totalTime?: number }) {
  const test = await prisma.mockTest.findUnique({ where: { id: testId }, select: { id: true } });
  if (!test) throw new Error("Mock test not found");

  return prisma.mockTest.update({
    where: { id: testId },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.totalTime !== undefined && { totalTime: data.totalTime }),
    },
  });
}

async function deleteMockTest(testId: string) {
  const test = await prisma.mockTest.findUnique({
    where: { id: testId },
    include: { _count: { select: { attempts: true } } },
  });

  if (!test) throw new Error("Mock test not found");
  if (test.status === "PUBLISHED") throw new Error("Cannot delete a published test. Archive it first.");
  if (test._count.attempts > 0) throw new Error("Cannot delete a test that already has attempts.");

  return prisma.mockTest.delete({ where: { id: testId } });
}

// ── Publish / Status ───────────────────────────────────────────────────────────

async function updateMockTestStatus(testId: string, status: MockTestStatus) {
  const test = await prisma.mockTest.findUnique({
    where: { id: testId },
    include: {
      sections: { include: { _count: { select: { questions: true } } } },
    },
  });

  if (!test) throw new Error("Mock test not found");

  if (status === "PUBLISHED") {
    if (test.sections.length === 0) throw new Error("Cannot publish: test has no sections.");
    const emptySections = test.sections.filter((s) => s._count.questions === 0);
    if (emptySections.length > 0) {
      throw new Error(
        `Cannot publish: the following sections have no questions: ${emptySections.map((s) => s.section).join(", ")}`
      );
    }
  }

  return prisma.mockTest.update({ where: { id: testId }, data: { status } });
}

// ── Sections ───────────────────────────────────────────────────────────────────

async function addSection(
  testId: string,
  data: { section: PteSection; order: number; timeLimit: number; instructions?: string }
) {
  const test = await prisma.mockTest.findUnique({ where: { id: testId }, select: { id: true, status: true } });
  if (!test) throw new Error("Mock test not found");
  if (test.status === "PUBLISHED") throw new Error("Cannot modify a published test.");

  return prisma.mockTestSection.create({
    data: {
      mockTestId: testId,
      section: data.section,
      order: data.order,
      timeLimit: data.timeLimit,
      instructions: data.instructions,
    },
  });
}

async function updateSection(sectionId: string, data: { timeLimit?: number; instructions?: string; order?: number }) {
  const section = await prisma.mockTestSection.findUnique({
    where: { id: sectionId },
    select: { mockTest: { select: { status: true } } },
  });
  if (!section) throw new Error("Section not found");
  if (section.mockTest.status === "PUBLISHED") throw new Error("Cannot modify a published test.");

  return prisma.mockTestSection.update({
    where: { id: sectionId },
    data: {
      ...(data.timeLimit !== undefined && { timeLimit: data.timeLimit }),
      ...(data.instructions !== undefined && { instructions: data.instructions }),
      ...(data.order !== undefined && { order: data.order }),
    },
  });
}

async function deleteSection(sectionId: string) {
  const section = await prisma.mockTestSection.findUnique({
    where: { id: sectionId },
    select: { mockTest: { select: { status: true } } },
  });
  if (!section) throw new Error("Section not found");
  if (section.mockTest.status === "PUBLISHED") throw new Error("Cannot modify a published test.");

  return prisma.mockTestSection.delete({ where: { id: sectionId } });
}

// ── Questions ──────────────────────────────────────────────────────────────────

async function addQuestion(sectionId: string, data: { questionType: MockTestQuestionType; questionId: string }) {
  const section = await prisma.mockTestSection.findUnique({
    where: { id: sectionId },
    include: {
      mockTest: { select: { status: true } },
      _count: { select: { questions: true } },
    },
  });
  if (!section) throw new Error("Section not found");
  if (section.mockTest.status === "PUBLISHED") throw new Error("Cannot modify a published test.");

  const exists = await validateQuestionExists(data.questionType, data.questionId);
  if (!exists) {
    throw new Error(`Question not found: no ${data.questionType} record with id "${data.questionId}"`);
  }

  const nextOrder = section._count.questions + 1;

  return prisma.mockTestQuestion.create({
    data: {
      sectionId,
      order: nextOrder,
      questionType: data.questionType,
      questionId: data.questionId,
    },
  });
}

async function reorderQuestions(sectionId: string, orderedIds: string[]) {
  const section = await prisma.mockTestSection.findUnique({
    where: { id: sectionId },
    select: { mockTest: { select: { status: true } } },
  });
  if (!section) throw new Error("Section not found");
  if (section.mockTest.status === "PUBLISHED") throw new Error("Cannot modify a published test.");

  const updates = orderedIds.map((id, index) =>
    prisma.mockTestQuestion.update({ where: { id }, data: { order: index + 1 } })
  );
  return prisma.$transaction(updates);
}

async function removeQuestion(mqId: string) {
  const mq = await prisma.mockTestQuestion.findUnique({
    where: { id: mqId },
    include: { section: { include: { mockTest: { select: { status: true } } } } },
  });
  if (!mq) throw new Error("Question not found in this test");
  if (mq.section.mockTest.status === "PUBLISHED") throw new Error("Cannot modify a published test.");

  return prisma.mockTestQuestion.delete({ where: { id: mqId } });
}

// ── Exports ────────────────────────────────────────────────────────────────────

export {
  createMockTest,
  getAllMockTests,
  getMockTestById,
  updateMockTest,
  deleteMockTest,
  updateMockTestStatus,
  addSection,
  updateSection,
  deleteSection,
  addQuestion,
  reorderQuestions,
  removeQuestion,
};
