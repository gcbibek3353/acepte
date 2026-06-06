"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, BookOpen, ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Attempt {
  id: string;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  mockTest: { id: string; title: string; totalTime: number };
  score: { overallScore: number | null; speakingScore: number | null; writingScore: number | null; readingScore: number | null; listeningScore: number | null } | null;
}

const statusColors: Record<string, string> = {
  COMPLETED:   "text-emerald-600 dark:text-emerald-400",
  IN_PROGRESS: "text-amber-600 dark:text-amber-400",
  NOT_STARTED: "text-muted-foreground",
  ABANDONED:   "text-muted-foreground",
  TIMED_OUT:   "text-destructive",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function ScorePill({ label, score }: { label: string; score: number | null }) {
  if (score === null) return null;
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{score.toFixed(1)}</p>
    </div>
  );
}

export default function AttemptsPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/mocktest/attempts?page=${page}&limit=10`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setAttempts(json.data.attempts);
          setTotalPages(json.data.pagination.totalPages);
        } else {
          setError(json.message ?? "Failed to load attempts");
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">

        <Link href="/mocktest"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> All Mock Tests
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Attempts</h1>
          <p className="mt-1 text-muted-foreground">All your mock test attempts and scores.</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
        )}

        {!loading && !error && attempts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-2">
            <BookOpen size={32} className="opacity-30" />
            <p className="text-sm">You haven't taken any mock tests yet.</p>
            <Link href="/mocktest" className="text-sm text-primary hover:underline">Browse available tests →</Link>
          </div>
        )}

        {!loading && attempts.length > 0 && (
          <>
            <div className="space-y-3">
              {attempts.map((attempt) => (
                <div key={attempt.id} className="rounded-lg border border-border bg-card shadow-sm p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate">{attempt.mockTest.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>Started {formatDate(attempt.startedAt)}</span>
                        {attempt.completedAt && <span>· Completed {formatDate(attempt.completedAt)}</span>}
                        <span className={cn("font-medium", statusColors[attempt.status])}>
                          · {attempt.status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </div>
                    </div>

                    {attempt.score?.overallScore != null && (
                      <div className="shrink-0 rounded-lg bg-primary/10 px-3 py-2 text-center">
                        <p className="text-xs font-medium text-muted-foreground">Overall</p>
                        <p className="text-xl font-bold text-primary">{attempt.score.overallScore.toFixed(1)}</p>
                      </div>
                    )}
                  </div>

                  {/* Skill scores */}
                  {attempt.score && (
                    <div className="mt-4 flex gap-6 border-t border-border pt-4">
                      <ScorePill label="Speaking"  score={attempt.score.speakingScore} />
                      <ScorePill label="Writing"   score={attempt.score.writingScore} />
                      <ScorePill label="Reading"   score={attempt.score.readingScore} />
                      <ScorePill label="Listening" score={attempt.score.listeningScore} />
                      <div className="ml-auto">
                        {attempt.status === "COMPLETED" && (
                          <Link href={`/mocktest/${attempt.mockTest.id}/result/${attempt.id}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                            View result <ChevronRight size={14} />
                          </Link>
                        )}
                        {attempt.status === "IN_PROGRESS" && (
                          <Link href={`/mocktest/${attempt.mockTest.id}/exam?attemptId=${attempt.id}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline">
                            Resume <ChevronRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                  <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1.5 rounded-md border border-border bg-card disabled:opacity-40 hover:bg-muted transition-colors text-foreground text-xs font-medium">
                    Previous
                  </button>
                  <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 rounded-md border border-border bg-card disabled:opacity-40 hover:bg-muted transition-colors text-foreground text-xs font-medium">
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
