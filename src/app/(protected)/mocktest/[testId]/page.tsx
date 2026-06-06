"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Clock, Mic, PenLine, BookOpen, Headphones,
  ChevronRight, Loader2, AlertCircle, History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";
type AttemptStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "ABANDONED" | "TIMED_OUT";

interface Section {
  id: string;
  section: PteSection;
  order: number;
  timeLimit: number;
  instructions: string | null;
  _count: { questions: number };
}

interface MockTest {
  id: string;
  title: string;
  description: string | null;
  totalTime: number;
  sections: Section[];
}

interface Attempt {
  id: string;
  status: AttemptStatus;
  startedAt: string | null;
  completedAt: string | null;
  score: { overallScore: number | null } | null;
}

// ── Section config ────────────────────────────────────────────────────────────

const sectionMeta: Record<PteSection, { label: string; icon: React.ElementType; accent: string; pill: string }> = {
  SPEAKING: {
    label: "Speaking",
    icon: Mic,
    accent: "border-l-blue-500",
    pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  WRITING: {
    label: "Writing",
    icon: PenLine,
    accent: "border-l-violet-500",
    pill: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  },
  READING: {
    label: "Reading",
    icon: BookOpen,
    accent: "border-l-emerald-500",
    pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  LISTENING: {
    label: "Listening",
    icon: Headphones,
    accent: "border-l-amber-500",
    pill: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
};

const statusLabels: Record<AttemptStatus, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  ABANDONED: "Abandoned",
  TIMED_OUT: "Timed out",
};

const statusColors: Record<AttemptStatus, string> = {
  NOT_STARTED: "text-muted-foreground",
  IN_PROGRESS: "text-amber-600 dark:text-amber-400",
  COMPLETED: "text-emerald-600 dark:text-emerald-400",
  ABANDONED: "text-muted-foreground",
  TIMED_OUT: "text-destructive",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MockTestOverviewPage() {
  const { testId } = useParams<{ testId: string }>();
  const router = useRouter();

  const [test, setTest]           = useState<MockTest | null>(null);
  const [attempts, setAttempts]   = useState<Attempt[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [starting, setStarting]   = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [testRes, attemptsRes] = await Promise.all([
          fetch(`/api/v1/mocktest/${testId}`),
          fetch(`/api/v1/mocktest/attempts?limit=5`),
        ]);
        const testJson = await testRes.json();
        if (!testRes.ok) { setError(testJson.message ?? "Test not found"); return; }
        setTest(testJson.data);

        const attJson = await attemptsRes.json();
        if (attJson.success) {
          // Filter to only attempts for this test
          const filtered = (attJson.data.attempts as Attempt[]).filter(
            (a: any) => a.mockTestId === testId || a.mockTest?.id === testId
          );
          setAttempts(filtered);
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [testId]);

  async function handleStart() {
    setStarting(true);
    setStartError(null);
    try {
      const res  = await fetch(`/api/v1/mocktest/${testId}/attempt`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) { setStartError(json.message ?? "Failed to start test"); return; }
      // Navigate to exam once it's built
      router.push(`/mocktest/${testId}/exam?attemptId=${json.data.id}`);
    } catch {
      setStartError("Network error. Please try again.");
    } finally {
      setStarting(false);
    }
  }

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-3 text-muted-foreground">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading test details...</span>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <AlertCircle size={32} className="text-destructive opacity-70" />
        <p className="text-sm text-destructive">{error ?? "Test not found"}</p>
        <Link href="/mocktest"><Button variant="secondary">Back to Mock Tests</Button></Link>
      </div>
    );
  }

  const sortedSections = [...test.sections].sort((a, b) => a.order - b.order);
  const totalQuestions = test.sections.reduce((s, sec) => s + sec._count.questions, 0);
  const inProgressAttempt = attempts.find((a) => a.status === "IN_PROGRESS");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">

        {/* Back */}
        <Link
          href="/mocktest"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> All Mock Tests
        </Link>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{test.title}</h1>
          {test.description && (
            <p className="mt-2 text-muted-foreground">{test.description}</p>
          )}

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary inline-flex items-center gap-1.5">
              <Clock size={13} /> {test.totalTime} min
            </div>
            <div className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground inline-flex items-center gap-1.5">
              <BookOpen size={13} /> {totalQuestions} questions
            </div>
            <div className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {test.sections.length} section{test.sections.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* In-progress banner */}
        {inProgressAttempt && (
          <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 p-4 flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">You have an unfinished attempt</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                Started {formatDate(inProgressAttempt.startedAt)}. You can resume from where you left off.
              </p>
              <button
                onClick={() => router.push(`/mocktest/${testId}/exam?attemptId=${inProgressAttempt.id}`)}
                className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-200 underline underline-offset-2"
              >
                Resume attempt →
              </button>
            </div>
          </div>
        )}

        {/* Section breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">What's in this test</h2>
          <div className="space-y-3">
            {sortedSections.map((section) => {
              const meta = sectionMeta[section.section];
              const Icon = meta.icon;
              return (
                <div
                  key={section.id}
                  className={cn(
                    "rounded-lg border border-border bg-card shadow-sm border-l-4 p-4 flex items-center gap-4",
                    meta.accent
                  )}
                >
                  <div className={cn("rounded-full p-2", meta.pill.split(" ").slice(0, 2).join(" "))}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{meta.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {section._count.questions} question{section._count.questions !== 1 ? "s" : ""}
                      {section.instructions ? ` · ${section.instructions}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">{section.timeLimit} min</p>
                    <p className="text-xs text-muted-foreground">time limit</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-3">Before you begin</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Find a quiet place with a stable internet connection.</li>
            <li>Use headphones with a microphone for Speaking and Listening sections.</li>
            <li>Each section has its own time limit — you cannot go back to a previous section.</li>
            <li>For Reading, the timer runs for the entire section, not per question.</li>
            <li>Speaking answers are recorded automatically — ensure microphone access is allowed in your browser.</li>
            <li>Do not close or refresh the browser during the exam — your progress is saved.</li>
          </ul>
        </div>

        {/* Start CTA */}
        <div className="mb-10">
          {startError && (
            <div className="mb-3 rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {startError}
            </div>
          )}
          <Button
            onClick={handleStart}
            disabled={starting || !!inProgressAttempt}
            className="w-full sm:w-auto gap-2 px-8 py-3 text-base"
            size="lg"
          >
            {starting ? (
              <><Loader2 size={16} className="animate-spin" /> Starting test...</>
            ) : (
              <>Start Mock Test <ChevronRight size={16} /></>
            )}
          </Button>
          {inProgressAttempt && (
            <p className="mt-2 text-xs text-muted-foreground">
              Complete or abandon your current attempt before starting a new one.
            </p>
          )}
        </div>

        {/* Previous attempts */}
        {attempts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <History size={18} /> Previous Attempts
            </h2>
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Score</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {attempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-foreground">{formatDate(attempt.startedAt)}</td>
                      <td className="px-4 py-3">
                        <span className={cn("text-sm font-medium", statusColors[attempt.status])}>
                          {statusLabels[attempt.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {attempt.score?.overallScore != null ? (
                          <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                            {attempt.score.overallScore.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {attempt.status === "COMPLETED" && (
                          <Link
                            href={`/mocktest/${testId}/result/${attempt.id}`}
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            View result
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
