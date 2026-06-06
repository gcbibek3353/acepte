"use client";
import { cn } from "@/lib/utils";

type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";

interface Props {
  testTitle: string;
  section: PteSection;
  questionNumber: number;
  totalQuestions: number;
  examRemainingSeconds: number;
}

const sectionColors: Record<PteSection, string> = {
  SPEAKING:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  WRITING:   "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  READING:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  LISTENING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

function formatTime(seconds: number) {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ExamHeader({ testTitle, section, questionNumber, totalQuestions, examRemainingSeconds }: Props) {
  const isWarning  = examRemainingSeconds <= 120 && examRemainingSeconds > 60;
  const isCritical = examRemainingSeconds <= 60;

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">

          {/* Left: test title */}
          <p className="text-sm font-semibold text-foreground truncate hidden sm:block max-w-xs">
            {testTitle}
          </p>

          {/* Centre: section + question counter */}
          <div className="flex items-center gap-3">
            <span className={cn("rounded-full px-3 py-1 text-xs font-medium", sectionColors[section])}>
              {section.charAt(0) + section.slice(1).toLowerCase()}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              Question <span className="text-foreground font-semibold">{questionNumber}</span> / {totalQuestions}
            </span>
          </div>

          {/* Right: overall exam timer */}
          <div
            className={cn(
              "font-mono text-sm font-semibold px-3 py-1.5 rounded-md transition-colors",
              isCritical  ? "bg-destructive/10 text-destructive animate-pulse" :
              isWarning   ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
                            "bg-secondary text-secondary-foreground"
            )}
          >
            ⏱ {formatTime(examRemainingSeconds)}
          </div>
        </div>
      </div>
    </header>
  );
}
