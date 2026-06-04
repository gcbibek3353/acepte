"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, ChevronRight, Loader2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";

interface MockTest {
  id: string;
  title: string;
  description: string | null;
  totalTime: number;
  sections: {
    section: PteSection;
    timeLimit: number;
    _count: { questions: number };
  }[];
  userAttemptCount: number;
}

const sectionColors: Record<PteSection, string> = {
  SPEAKING:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  WRITING:   "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  READING:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  LISTENING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

function TestCard({ test }: { test: MockTest }) {
  const totalQuestions = test.sections.reduce((s, sec) => s + sec._count.questions, 0);
  const sortedSections = [...test.sections].sort((a, b) => {
    const order: PteSection[] = ["SPEAKING", "WRITING", "READING", "LISTENING"];
    return order.indexOf(a.section) - order.indexOf(b.section);
  });

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      {/* Title + description */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-card-foreground">{test.title}</h3>
        {test.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{test.description}</p>
        )}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={13} />
          {test.totalTime} min
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen size={13} />
          {totalQuestions} question{totalQuestions !== 1 ? "s" : ""}
        </span>
        {test.userAttemptCount > 0 && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {test.userAttemptCount} attempt{test.userAttemptCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Section pills */}
      <div className="flex flex-wrap gap-1.5">
        {sortedSections.map((s) => (
          <span
            key={s.section}
            className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", sectionColors[s.section])}
          >
            {s.section.charAt(0) + s.section.slice(1).toLowerCase()}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/mocktest/${test.id}`}
        className="inline-flex items-center justify-between rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {test.userAttemptCount > 0 ? "View Test" : "Start Preparing"}
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

export default function MockTestListPage() {
  const [tests, setTests]     = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/mocktest?limit=20")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setTests(json.data.tests);
        else setError(json.message ?? "Failed to load tests");
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Mock Tests</h1>
          <p className="mt-1 text-muted-foreground">
            Full-length PTE Academic practice tests under real exam conditions.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading tests...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && tests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-2">
            <BookOpen size={32} className="opacity-30" />
            <p className="text-sm">No mock tests are available yet.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && tests.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
