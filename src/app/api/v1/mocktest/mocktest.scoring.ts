import prisma from "@/lib/prisma";
import { MockTestQuestionType } from "@/generated/prisma";
import {
  evaluateWriteEssay,
  evalueteSummarizationWrittenText,
  evaluateSummarizeSpokenTextAnswer,
} from "@/lib/ai/google";
import {
  evaluateReadALoud,
  evaluateAudioWithAudio,
  evaluateAudioWithImage,
} from "@/lib/ai/google-voice";

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

// ── AI-scored (subjective) types — speaking & writing ──────────────────────────
// These mirror the per-question evaluation used in practice mode. Returns the
// total plus whatever sub-scores apply, or null if it cannot be evaluated
// (missing answer/question, or the AI call fails — caller keeps isEvaluated=false).

export interface AiScoreResult {
  totalScore: number;
  contentScore?: number | null;
  formScore?: number | null;
  grammarScore?: number | null;
  vocabularyScore?: number | null;
  spellingScore?: number | null;
  oralFluencyScore?: number | null;
  pronunciationScore?: number | null;
}

// Speaking tasks all return { contentScore, fluencyScore, pronunciationScore }
function speakingResult(s: { contentScore: number; fluencyScore: number; pronunciationScore: number }): AiScoreResult {
  return {
    totalScore: (s.contentScore + s.fluencyScore + s.pronunciationScore) / 3,
    contentScore: s.contentScore,
    oralFluencyScore: s.fluencyScore,
    pronunciationScore: s.pronunciationScore,
  };
}

export async function aiScore(
  questionType: MockTestQuestionType,
  questionId: string,
  answerData: any,
  audioUrl?: string | null
): Promise<AiScoreResult | null> {
  try {
    switch (questionType) {
      // ── Speaking ──────────────────────────────────────────────────────────
      case "READ_ALOUD": {
        if (!audioUrl) return null;
        const q = await prisma.speakingReadAloudQuestion.findUnique({ where: { id: questionId }, select: { passage: true } });
        if (!q) return null;
        return speakingResult(await evaluateReadALoud(audioUrl, q.passage));
      }
      case "REPEAT_SENTENCE": {
        if (!audioUrl) return null;
        const q = await prisma.speakingRepeatSentenceQuestion.findUnique({ where: { id: questionId }, select: { audioUrl: true } });
        if (!q?.audioUrl) return null;
        return speakingResult(await evaluateAudioWithAudio(audioUrl, q.audioUrl));
      }
      case "DESCRIBE_IMAGE": {
        if (!audioUrl) return null;
        const q = await prisma.speakingDescribeImageQuestion.findUnique({ where: { id: questionId }, select: { imageUrl: true } });
        if (!q?.imageUrl) return null;
        return speakingResult(await evaluateAudioWithImage(audioUrl, q.imageUrl));
      }
      case "RETELL_LECTURE": {
        if (!audioUrl) return null;
        const q = await prisma.speakingRetellLectureQuestion.findUnique({ where: { id: questionId }, select: { audioUrl: true } });
        if (!q?.audioUrl) return null;
        return speakingResult(await evaluateAudioWithAudio(audioUrl, q.audioUrl));
      }
      case "ANSWER_SHORT_QUESTION": {
        if (!audioUrl) return null;
        const q = await prisma.speakingAnswerShortQuestion.findUnique({ where: { id: questionId }, select: { audioUrl: true } });
        if (!q?.audioUrl) return null;
        return speakingResult(await evaluateAudioWithAudio(audioUrl, q.audioUrl));
      }

      // ── Writing ───────────────────────────────────────────────────────────
      case "WRITE_ESSAY": {
        const text = answerData?.text;
        if (!text) return null;
        const q = await prisma.writeEssayQuestion.findUnique({ where: { id: questionId }, select: { essay_description: true } });
        if (!q) return null;
        const e = await evaluateWriteEssay(text, q.essay_description);
        return {
          totalScore: e.totalScore,
          contentScore: e.contentScore,
          formScore: e.formScore,
          grammarScore: e.grammarScore,
          vocabularyScore: e.vocabScore,
          spellingScore: e.spellingScore,
        };
      }
      case "SUMMARIZE_WRITTEN_TEXT": {
        const text = answerData?.text;
        if (!text) return null;
        const q = await prisma.summarizeWrittenTextQuestion.findUnique({ where: { id: questionId }, select: { passage: true } });
        if (!q) return null;
        const e = await evalueteSummarizationWrittenText(text, q.passage);
        return {
          totalScore: e.totalScore,
          contentScore: e.contentScore,
          formScore: e.formScore,
          vocabularyScore: e.vocabScore,
        };
      }

      // ── Listening (AI-scored summary) ────────────────────────────────────
      case "SUMMARIZE_SPOKEN_TEXT": {
        const text = answerData?.text;
        if (!text) return null;
        const q = await prisma.summarizeSpokenTextQuestion.findUnique({ where: { id: questionId }, select: { audioTranscribedText: true } });
        if (!q) return null;
        const e = await evaluateSummarizeSpokenTextAnswer(text, q.audioTranscribedText);
        return {
          totalScore: e.totalScore,
          contentScore: e.contentScore,
          formScore: e.formScore,
          grammarScore: e.grammarScore,
          vocabularyScore: e.vocabularyScore,
          spellingScore: e.spellingScore,
        };
      }

      default:
        return null;
    }
  } catch (err) {
    console.error(`aiScore failed for ${questionType} (${questionId}):`, err);
    return null;
  }
}
