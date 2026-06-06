import prisma from "@/lib/prisma";
import { MockTestQuestionType } from "@/generated/prisma";

// Maps each question type to its PTE section for score aggregation
export const questionTypeToSection: Record<MockTestQuestionType, string> = {
  READ_ALOUD: "SPEAKING",
  REPEAT_SENTENCE: "SPEAKING",
  DESCRIBE_IMAGE: "SPEAKING",
  RETELL_LECTURE: "SPEAKING",
  ANSWER_SHORT_QUESTION: "SPEAKING",
  SUMMARIZE_WRITTEN_TEXT: "WRITING",
  WRITE_ESSAY: "WRITING",
  READING_MCM: "READING",
  READING_MCS: "READING",
  REORDER_PARAGRAPHS: "READING",
  READING_FILL_BLANKS_DRAG_DROP: "READING",
  READING_FILL_BLANKS_DROPDOWN: "READING",
  SUMMARIZE_SPOKEN_TEXT: "LISTENING",
  LISTENING_MCM: "LISTENING",
  LISTENING_MCS: "LISTENING",
  LISTENING_FILL_BLANKS: "LISTENING",
  LISTENING_HIGHLIGHT_SUMMARY: "LISTENING",
  LISTENING_SELECT_MISSING_WORD: "LISTENING",
  LISTENING_HIGHLIGHT_INCORRECT_WORDS: "LISTENING",
  WRITE_FROM_DICTATION: "LISTENING",
};

// Returns null for AI-scored types (speaking/writing subjective tasks)
export async function autoScore(
  questionType: MockTestQuestionType,
  questionId: string,
  answerData: any
): Promise<number | null> {
  switch (questionType) {
    case "READING_MCS":      return scoreReadingMCS(questionId, answerData);
    case "LISTENING_MCS":    return scoreListeningMCS(questionId, answerData);
    case "READING_MCM":      return scoreReadingMCM(questionId, answerData);
    case "LISTENING_MCM":    return scoreListeningMCM(questionId, answerData);
    case "REORDER_PARAGRAPHS":             return scoreReorderParagraphs(questionId, answerData);
    case "READING_FILL_BLANKS_DRAG_DROP":  return scoreFillBlanksDragDrop(questionId, answerData);
    case "READING_FILL_BLANKS_DROPDOWN":   return scoreFillBlanksDropdown(questionId, answerData);
    case "LISTENING_FILL_BLANKS":          return scoreListeningFillBlanks(questionId, answerData);
    case "LISTENING_HIGHLIGHT_SUMMARY":    return scoreHighlightSummary(questionId, answerData);
    case "LISTENING_SELECT_MISSING_WORD":  return scoreSelectMissingWord(questionId, answerData);
    case "LISTENING_HIGHLIGHT_INCORRECT_WORDS": return scoreHighlightIncorrectWords(questionId, answerData);
    case "WRITE_FROM_DICTATION":           return scoreWriteFromDictation(questionId, answerData);
    // AI-scored types — scored asynchronously after evaluation
    default: return null;
  }
}

// ── Scoring implementations ────────────────────────────────────────────────────

async function scoreReadingMCS(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.multipleChoiceSinglePassage.findUnique({
    where: { id: questionId },
    select: { correctOptionIndex: true },
  });
  if (!q) return 0;
  return answerData?.selectedOptionIndex === q.correctOptionIndex ? 1 : 0;
}

async function scoreListeningMCS(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.listeningMCSPassage.findUnique({
    where: { id: questionId },
    select: { correctOptionIndex: true },
  });
  if (!q) return 0;
  return answerData?.selectedOptionIndex === q.correctOptionIndex ? 1 : 0;
}

// PTE MCM scoring: +1 correct, -1 incorrect, minimum 0
async function scoreReadingMCM(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.multipleChoiceMultiplePassage.findUnique({
    where: { id: questionId },
    include: { options: { select: { id: true, isCorrect: true } } },
  });
  if (!q) return 0;

  const selected: string[] = answerData?.selectedOptions ?? [];
  const correctIds = new Set(q.options.filter((o) => o.isCorrect).map((o) => o.id));

  let score = 0;
  for (const id of selected) {
    score += correctIds.has(id) ? 1 : -1;
  }
  return Math.max(0, score);
}

async function scoreListeningMCM(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.listeningMCMPassage.findUnique({
    where: { id: questionId },
    include: { options: { select: { id: true, isCorrect: true } } },
  });
  if (!q) return 0;

  const selected: string[] = answerData?.selectedOptions ?? [];
  const correctIds = new Set(q.options.filter((o) => o.isCorrect).map((o) => o.id));

  let score = 0;
  for (const id of selected) {
    score += correctIds.has(id) ? 1 : -1;
  }
  return Math.max(0, score);
}

// PTE reorder scoring: +1 per correct adjacent pair
async function scoreReorderParagraphs(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.reorderParagraphPassage.findUnique({
    where: { id: questionId },
    include: { paragraphs: { select: { id: true, correctOrder: true } } },
  });
  if (!q) return 0;

  const userOrder: string[] = answerData?.order ?? [];
  const correctOrder = [...q.paragraphs]
    .sort((a, b) => a.correctOrder - b.correctOrder)
    .map((p) => p.id);

  let score = 0;
  for (let i = 0; i < userOrder.length - 1; i++) {
    const ci = correctOrder.indexOf(userOrder[i]);
    const cj = correctOrder.indexOf(userOrder[i + 1]);
    if (ci !== -1 && cj !== -1 && cj === ci + 1) score++;
  }
  return score;
}

// answerData format: [{ pos: string, index: number }]
async function scoreFillBlanksDragDrop(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.fillBlanksDragDropPassage.findUnique({
    where: { id: questionId },
    include: { blanks: { select: { position: true, correctOptionIndex: true } } },
  });
  if (!q) return 0;

  const userAnswers: { pos: string; index: number }[] = answerData ?? [];
  let correct = 0;
  for (const blank of q.blanks) {
    const ua = userAnswers.find((a) => String(a.pos) === String(blank.position));
    if (ua?.index === blank.correctOptionIndex) correct++;
  }
  return correct;
}

// answerData format: [{ pos: string, index: string }]
async function scoreFillBlanksDropdown(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.fillBlanksDropdownPassage.findUnique({
    where: { id: questionId },
    include: { blanks: { select: { position: true, correctIndex: true } } },
  });
  if (!q) return 0;

  const userAnswers: { pos: string; index: string }[] = answerData ?? [];
  let correct = 0;
  for (const blank of q.blanks) {
    const ua = userAnswers.find((a) => String(a.pos) === String(blank.position));
    if (ua && Number(ua.index) === blank.correctIndex) correct++;
  }
  return correct;
}

// answerData format: { "1": "word1", "2": "word2", ... }
async function scoreListeningFillBlanks(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.listeningFillBlankPassage.findUnique({
    where: { id: questionId },
    include: { blanks: { select: { position: true, correctWord: true } } },
  });
  if (!q) return 0;

  const userAnswers: Record<string, string> = answerData ?? {};
  let correct = 0;
  for (const blank of q.blanks) {
    const userWord = (userAnswers[String(blank.position)] ?? "").trim().toLowerCase();
    if (userWord === blank.correctWord.trim().toLowerCase()) correct++;
  }
  return correct;
}

async function scoreHighlightSummary(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.listeningHighlightSummaryPassage.findUnique({
    where: { id: questionId },
    select: { correctOptionIndex: true },
  });
  if (!q) return 0;
  return answerData?.selectedOptionIndex === q.correctOptionIndex ? 1 : 0;
}

async function scoreSelectMissingWord(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.listeningSelectMissingWordPassage.findUnique({
    where: { id: questionId },
    select: { correctOptionIndex: true },
  });
  if (!q) return 0;
  return answerData?.selectedOptionIndex === q.correctOptionIndex ? 1 : 0;
}

// PTE highlight incorrect words: +1 correct hit, -1 false positive, min 0
// answerData format: [{ word: string, position: number }]
async function scoreHighlightIncorrectWords(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.listeningHighlightIncorrectWordsPassage.findUnique({
    where: { id: questionId },
    include: { incorrectWords: { select: { position: true } } },
  });
  if (!q) return 0;

  const correctPositions = new Set(q.incorrectWords.map((w) => w.position));
  const selected: { word: string; position: number }[] = answerData ?? [];

  let score = 0;
  for (const sw of selected) {
    score += correctPositions.has(sw.position) ? 1 : -1;
  }
  return Math.max(0, score);
}

// answerData format: { text: string }
async function scoreWriteFromDictation(questionId: string, answerData: any): Promise<number> {
  const q = await prisma.listeningWriteFromDictationPassage.findUnique({
    where: { id: questionId },
    select: { transcript: true },
  });
  if (!q) return 0;

  const userWords = (answerData?.text ?? "").trim().toLowerCase().split(/\s+/);
  const correctWords = q.transcript.trim().toLowerCase().split(/\s+/);

  let correct = 0;
  for (let i = 0; i < Math.min(userWords.length, correctWords.length); i++) {
    if (userWords[i] === correctWords[i]) correct++;
  }
  return correct;
}
