import prisma from "@/lib/prisma";
import { PteSection } from "@/generated/prisma";
import { autoScore, aiScore, questionTypeToSection, type AiScoreResult } from "./mocktest.scoring";

// ── List & Overview ────────────────────────────────────────────────────────────

async function getPublishedMockTests(userId: string, params: { page: number; limit: number }) {
  const skip = (params.page - 1) * params.limit;
  const where = { status: "PUBLISHED" as const, isActive: true };

  const [tests, total] = await prisma.$transaction([
    prisma.mockTest.findMany({
      where,
      skip,
      take: params.limit,
      orderBy: { createdAt: "desc" },
      include: {
        sections: {
          orderBy: { order: "asc" },
          include: { _count: { select: { questions: true } } },
        },
      },
    }),
    prisma.mockTest.count({ where }),
  ]);

  // Attach the user's own attempt count per test
  const testIds = tests.map((t) => t.id);
  const userAttemptCounts = await prisma.mockTestAttempt.groupBy({
    by: ["mockTestId"],
    where: { userId, mockTestId: { in: testIds } },
    _count: { id: true },
  });

  const countMap = new Map(userAttemptCounts.map((a) => [a.mockTestId, a._count.id]));

  return {
    tests: tests.map((t) => ({ ...t, userAttemptCount: countMap.get(t.id) ?? 0 })),
    pagination: { total, page: params.page, limit: params.limit, totalPages: Math.ceil(total / params.limit) },
  };
}

async function getMockTestOverview(testId: string) {
  return prisma.mockTest.findUnique({
    where: { id: testId, status: "PUBLISHED", isActive: true },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: { _count: { select: { questions: true } } },
      },
    },
  });
}

// ── Attempt lifecycle ──────────────────────────────────────────────────────────

async function startAttempt(userId: string, testId: string) {
  const test = await prisma.mockTest.findUnique({
    where: { id: testId },
    select: { id: true, status: true },
  });

  if (!test) throw new Error("Mock test not found");
  if (test.status !== "PUBLISHED") throw new Error("This test is not available");

  const existing = await prisma.mockTestAttempt.findFirst({
    where: { userId, mockTestId: testId, status: "IN_PROGRESS" },
  });
  if (existing) throw new Error("You already have an in-progress attempt for this test");

  return prisma.mockTestAttempt.create({
    data: { userId, mockTestId: testId, status: "NOT_STARTED" },
  });
}

async function getAttemptState(userId: string, attemptId: string) {
  const attempt = await prisma.mockTestAttempt.findUnique({
    where: { id: attemptId },
    include: {
      mockTest: {
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: { questions: { orderBy: { order: "asc" } } },
          },
        },
      },
      sectionAttempts: true,
      responses: {
        select: { mockTestQuestionId: true, isEvaluated: true, totalScore: true },
      },
    },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.userId !== userId) throw new Error("Forbidden");

  return attempt;
}

// ── Section flow ───────────────────────────────────────────────────────────────

async function startSection(userId: string, attemptId: string, section: PteSection) {
  const attempt = await prisma.mockTestAttempt.findUnique({
    where: { id: attemptId },
    select: { userId: true, status: true },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.userId !== userId) throw new Error("Forbidden");
  if (attempt.status === "COMPLETED" || attempt.status === "TIMED_OUT") {
    throw new Error("This attempt is already completed");
  }

  const existing = await prisma.mockTestSectionAttempt.findUnique({
    where: { attemptId_section: { attemptId, section } },
  });

  if (existing?.status === "COMPLETED") throw new Error("This section is already completed");

  // Transition attempt from NOT_STARTED → IN_PROGRESS on first section start
  if (attempt.status === "NOT_STARTED") {
    await prisma.mockTestAttempt.update({
      where: { id: attemptId },
      data: { status: "IN_PROGRESS", startedAt: new Date() },
    });
  }

  if (existing) {
    return prisma.mockTestSectionAttempt.update({
      where: { attemptId_section: { attemptId, section } },
      data: { status: "IN_PROGRESS" },
    });
  }

  return prisma.mockTestSectionAttempt.create({
    data: { attemptId, section, status: "IN_PROGRESS", startedAt: new Date() },
  });
}

async function completeSection(userId: string, attemptId: string, section: PteSection) {
  const attempt = await prisma.mockTestAttempt.findUnique({
    where: { id: attemptId },
    select: { userId: true },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.userId !== userId) throw new Error("Forbidden");

  const sectionAttempt = await prisma.mockTestSectionAttempt.findUnique({
    where: { attemptId_section: { attemptId, section } },
  });

  if (!sectionAttempt) throw new Error("Section has not been started");
  if (sectionAttempt.status === "COMPLETED") throw new Error("Section is already completed");

  const now = new Date();
  const timeSpent = sectionAttempt.startedAt
    ? Math.floor((now.getTime() - sectionAttempt.startedAt.getTime()) / 1000)
    : null;

  return prisma.mockTestSectionAttempt.update({
    where: { attemptId_section: { attemptId, section } },
    data: { status: "COMPLETED", completedAt: now, timeSpent },
  });
}

// ── Response submission ────────────────────────────────────────────────────────

async function submitResponse(
  userId: string,
  attemptId: string,
  data: {
    mockTestQuestionId: string;
    answerData?: any;
    audioUrl?: string;
    duration?: number;
  }
) {
  const attempt = await prisma.mockTestAttempt.findUnique({
    where: { id: attemptId },
    select: { userId: true, status: true, mockTestId: true },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.userId !== userId) throw new Error("Forbidden");
  if (attempt.status !== "IN_PROGRESS") throw new Error("Attempt is not in progress");

  const mqQuestion = await prisma.mockTestQuestion.findUnique({
    where: { id: data.mockTestQuestionId },
    include: { section: { select: { section: true, mockTestId: true } } },
  });

  if (!mqQuestion) throw new Error("Question not found");
  if (mqQuestion.section.mockTestId !== attempt.mockTestId) {
    throw new Error("Question does not belong to this test");
  }

  const sectionAttempt = await prisma.mockTestSectionAttempt.findUnique({
    where: { attemptId_section: { attemptId, section: mqQuestion.section.section } },
  });

  if (!sectionAttempt || sectionAttempt.status !== "IN_PROGRESS") {
    throw new Error("Start the section before submitting answers");
  }

  // Objective types score instantly; subjective (speaking/writing) types are
  // sent through the AI evaluators. AI failures fall back to isEvaluated=false
  // so the answer is still saved and can be re-evaluated later.
  const objectiveScore = await autoScore(mqQuestion.questionType, mqQuestion.questionId, data.answerData);

  let scores: AiScoreResult | { totalScore: number } | null =
    objectiveScore !== null ? { totalScore: objectiveScore } : null;

  if (objectiveScore === null) {
    scores = await aiScore(mqQuestion.questionType, mqQuestion.questionId, data.answerData, data.audioUrl);
  }

  const isEvaluated = scores !== null;
  const scoreFields = {
    totalScore: scores?.totalScore ?? null,
    contentScore: (scores as AiScoreResult)?.contentScore ?? null,
    formScore: (scores as AiScoreResult)?.formScore ?? null,
    grammarScore: (scores as AiScoreResult)?.grammarScore ?? null,
    vocabularyScore: (scores as AiScoreResult)?.vocabularyScore ?? null,
    spellingScore: (scores as AiScoreResult)?.spellingScore ?? null,
    oralFluencyScore: (scores as AiScoreResult)?.oralFluencyScore ?? null,
    pronunciationScore: (scores as AiScoreResult)?.pronunciationScore ?? null,
    isEvaluated,
    evaluatedAt: isEvaluated ? new Date() : null,
  };

  return prisma.mockTestResponse.upsert({
    where: { attemptId_mockTestQuestionId: { attemptId, mockTestQuestionId: data.mockTestQuestionId } },
    create: {
      attemptId,
      mockTestQuestionId: data.mockTestQuestionId,
      answerData: data.answerData ?? null,
      audioUrl: data.audioUrl,
      duration: data.duration,
      ...scoreFields,
    },
    update: {
      answerData: data.answerData ?? null,
      audioUrl: data.audioUrl,
      duration: data.duration,
      ...scoreFields,
    },
  });
}

// ── Complete attempt & scoring ─────────────────────────────────────────────────

async function completeAttempt(userId: string, attemptId: string) {
  const attempt = await prisma.mockTestAttempt.findUnique({
    where: { id: attemptId },
    include: { sectionAttempts: true },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.userId !== userId) throw new Error("Forbidden");
  if (attempt.status !== "IN_PROGRESS") throw new Error("Attempt is not in progress");

  const incomplete = attempt.sectionAttempts.filter((s) => s.status !== "COMPLETED");
  if (incomplete.length > 0) {
    throw new Error(
      `Complete all sections first. Pending: ${incomplete.map((s) => s.section).join(", ")}`
    );
  }

  await prisma.mockTestAttempt.update({
    where: { id: attemptId },
    data: { status: "COMPLETED", completedAt: new Date() },
  });

  await saveAggregatedScore(attemptId);

  return prisma.mockTestAttempt.findUnique({
    where: { id: attemptId },
    include: { score: true, sectionAttempts: true },
  });
}

async function saveAggregatedScore(attemptId: string) {
  const responses = await prisma.mockTestResponse.findMany({
    where: { attemptId, isEvaluated: true },
    include: { mockTestQuestion: { select: { questionType: true } } },
  });

  const buckets: Record<string, number[]> = { SPEAKING: [], WRITING: [], READING: [], LISTENING: [] };

  for (const r of responses) {
    if (r.totalScore === null) continue;
    const section = questionTypeToSection[r.mockTestQuestion.questionType];
    buckets[section]?.push(r.totalScore);
  }

  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);

  const speakingScore  = avg(buckets.SPEAKING);
  const writingScore   = avg(buckets.WRITING);
  const readingScore   = avg(buckets.READING);
  const listeningScore = avg(buckets.LISTENING);

  const sectionScores = [speakingScore, writingScore, readingScore, listeningScore].filter(
    (s): s is number => s !== null
  );
  const overallScore = avg(sectionScores);

  return prisma.mockTestScore.upsert({
    where: { attemptId },
    create: { attemptId, speakingScore, writingScore, readingScore, listeningScore, overallScore },
    update: { speakingScore, writingScore, readingScore, listeningScore, overallScore },
  });
}

// ── Results ────────────────────────────────────────────────────────────────────

async function getAttemptResult(userId: string, attemptId: string) {
  const attempt = await prisma.mockTestAttempt.findUnique({
    where: { id: attemptId },
    include: {
      score: true,
      sectionAttempts: true,
      responses: {
        include: {
          mockTestQuestion: { select: { questionType: true, order: true, sectionId: true } },
        },
      },
    },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.userId !== userId) throw new Error("Forbidden");
  if (attempt.status !== "COMPLETED") throw new Error("Attempt is not yet completed");

  return attempt;
}

async function getUserAttempts(userId: string, params: { page: number; limit: number }) {
  const skip = (params.page - 1) * params.limit;

  const [attempts, total] = await prisma.$transaction([
    prisma.mockTestAttempt.findMany({
      where: { userId },
      skip,
      take: params.limit,
      orderBy: { createdAt: "desc" },
      include: {
        mockTest: { select: { id: true, title: true, totalTime: true } },
        score: {
          select: { overallScore: true, speakingScore: true, writingScore: true, readingScore: true, listeningScore: true },
        },
      },
    }),
    prisma.mockTestAttempt.count({ where: { userId } }),
  ]);

  return {
    attempts,
    pagination: { total, page: params.page, limit: params.limit, totalPages: Math.ceil(total / params.limit) },
  };
}

// ── Exports ────────────────────────────────────────────────────────────────────

export {
  getPublishedMockTests,
  getMockTestOverview,
  startAttempt,
  getAttemptState,
  startSection,
  completeSection,
  submitResponse,
  completeAttempt,
  getAttemptResult,
  getUserAttempts,
};
