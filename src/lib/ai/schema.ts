import z from "zod";

export const writeEssayAnswerScoreSchema = z.object({
  totalScore: z.number().min(0).max(15),
  contentScore: z.number().min(0).max(3),
  formScore: z.number().min(0).max(2),
  grammarScore: z.number().min(0).max(2),
  spellingScore: z.number().min(0).max(2),
  vocabScore: z.number().min(0).max(2),
  DSCScore: z.number().min(0).max(2),
  GLRScore: z.number().min(0).max(2),
});

export type WriteEssayAnswerScore = z.infer<typeof writeEssayAnswerScoreSchema>;

export const SummarizeWrittenTextAnswerScoreSchema = z.object({
  totalScore: z.number().min(0).max(7),
  contentScore: z.number().min(0).max(2),
  formScore: z.number().min(0).max(1),
  grammerScore: z.number().min(0).max(2),
  vocabScore: z.number().min(0).max(2),
});

export type SummarizeWrittenTextAnswerScore = z.infer<typeof SummarizeWrittenTextAnswerScoreSchema>;