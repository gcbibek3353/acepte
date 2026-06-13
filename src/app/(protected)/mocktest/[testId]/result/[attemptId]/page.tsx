"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle, Clock, CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";

interface Score {
  speakingScore:  number | null;
  writingScore:   number | null;
  readingScore:   number | null;
  listeningScore: number | null;
  overallScore:   number | null;
}

interface Response {
  id: string;
  mockTestQuestionId: string;
  totalScore: number | null;
  isEvaluated: boolean;
  mockTestQuestion: { questionType: string; order: number; sectionId: string };
}

interface SectionAttempt {
  section: PteSection;
  status: string;
  timeSpent: number | null;
}

interface AttemptResult {
  id: string;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  score: Score | null;
  sectionAttempts: SectionAttempt[];
  responses: Response[];
}

const sectionColors: Record<PteSection, string> = {
  SPEAKING:  "border-l-blue-500",
  WRITING:   "border-l-violet-500",
  READING:   "border-l-emerald-500",
  LISTENING: "border-l-amber-500",
};

const sectionPills: Record<PteSection, string> = {
  SPEAKING:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  WRITING:   "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  READING:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  LISTENING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

function ScoreChip({ label, score, colorClass }: { label: string; score: number | null; colorClass: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-card shadow-sm p-5 border-l-4", colorClass)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      {score !== null ? (
        <p className="mt-2 text-3xl font-bold text-foreground">{score.toFixed(1)}</p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1.5">
          <Loader size={13} className="animate-spin" /> Pending
        </p>
      )}
    </div>
  );
}

function formatTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatDuration(seconds: number | null) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function ResultPage() {
  const { testId, attemptId } = useParams<{ testId: string; attemptId: string }>();
  const [result, setResult]   = useState<AttemptResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/v1/mocktest/attempt/${attemptId}/result`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setResult(json.data);
        else setError(json.message ?? "Failed to load result");
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-3 text-muted-foreground">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading your results...</span>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <AlertCircle size={32} className="text-destructive opacity-70" />
        <p className="text-sm text-destructive">{error ?? "Result not found"}</p>
        <Link href={`/mocktest/${testId}`}><Button variant="secondary">Back to Test</Button></Link>
      </div>
    );
  }

  const { score, sectionAttempts, responses } = result;
  const pending = responses.filter((r) => !r.isEvaluated);
  const hasPending = pending.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">

        {/* Back */}
        <Link href={`/mocktest/${testId}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to Test
        </Link>

        {/* Hero */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Results</h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Completed {formatTime(result.completedAt)}
            </p>
          </div>
          {score?.overallScore != null && (
            <div className="rounded-xl bg-primary px-6 py-4 text-center shrink-0">
              <p className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wide">Overall</p>
              <p className="text-4xl font-bold text-primary-foreground mt-1">{score.overallScore.toFixed(1)}</p>
            </div>
          )}
        </div>

        {/* AI evaluation pending banner */}
        {hasPending && (
          <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 p-4 flex items-start gap-3">
            <Loader size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 animate-spin" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                {pending.length} response{pending.length !== 1 ? "s" : ""} still being evaluated
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                Speaking and writing responses are scored by AI. Scores will update once evaluation is complete.
              </p>
            </div>
          </div>
        )}

        {/* Skill scores */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Communicative Skills</h2>
          {score === null ? (
            <div className="rounded-lg border border-border bg-card shadow-sm p-6 flex flex-col items-center gap-3 text-center">
              <AlertCircle size={28} className="text-muted-foreground opacity-60" />
              <p className="text-sm font-medium text-foreground">Scores not available yet</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                Your responses are still being processed. Please check back in a few minutes.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <ScoreChip label="Speaking"  score={score.speakingScore}  colorClass="border-l-blue-500" />
              <ScoreChip label="Writing"   score={score.writingScore}   colorClass="border-l-violet-500" />
              <ScoreChip label="Reading"   score={score.readingScore}   colorClass="border-l-emerald-500" />
              <ScoreChip label="Listening" score={score.listeningScore} colorClass="border-l-amber-500" />
            </div>
          )}
        </div>

        {/* Section timing */}
        {sectionAttempts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Section Summary</h2>
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Section</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Time Spent</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Answered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sectionAttempts.map((sa) => {
                    const sectionResps = responses.filter((r) => {
                      // responses don't carry section directly, use type prefix
                      const type = r.mockTestQuestion.questionType;
                      const sectionMap: Record<string, PteSection> = {
                        READ_ALOUD: "SPEAKING", REPEAT_SENTENCE: "SPEAKING", DESCRIBE_IMAGE: "SPEAKING",
                        RETELL_LECTURE: "SPEAKING", ANSWER_SHORT_QUESTION: "SPEAKING",
                        WRITE_ESSAY: "WRITING", SUMMARIZE_WRITTEN_TEXT: "WRITING",
                        READING_MCM: "READING", READING_MCS: "READING", REORDER_PARAGRAPHS: "READING",
                        READING_FILL_BLANKS_DRAG_DROP: "READING", READING_FILL_BLANKS_DROPDOWN: "READING",
                        SUMMARIZE_SPOKEN_TEXT: "LISTENING", LISTENING_MCM: "LISTENING", LISTENING_MCS: "LISTENING",
                        LISTENING_FILL_BLANKS: "LISTENING", LISTENING_HIGHLIGHT_SUMMARY: "LISTENING",
                        LISTENING_SELECT_MISSING_WORD: "LISTENING", LISTENING_HIGHLIGHT_INCORRECT_WORDS: "LISTENING",
                        WRITE_FROM_DICTATION: "LISTENING",
                      };
                      return sectionMap[type] === sa.section;
                    });
                    return (
                      <tr key={sa.section} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3">
                          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", sectionPills[sa.section])}>
                            {sa.section.charAt(0) + sa.section.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground flex items-center gap-1.5">
                          <Clock size={13} /> {formatDuration(sa.timeSpent)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {sectionResps.length} question{sectionResps.length !== 1 ? "s" : ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/mocktest">
            <Button variant="secondary" className="gap-2">Browse More Tests</Button>
          </Link>
          <Link href={`/mocktest/${testId}`}>
            <Button className="gap-2">
              <CheckCircle size={15} /> Retake This Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
