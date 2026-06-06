"use client";
import { Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";

interface Props {
  section: PteSection;
  timeLimit: number;
  questionCount: number;
  instructions: string | null;
  onBegin: () => void;
}

const sectionMeta: Record<PteSection, { color: string; desc: string }> = {
  SPEAKING:  { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",   desc: "Read passages aloud and answer spoken questions. Each task has its own prep and recording timer." },
  WRITING:   { color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300", desc: "Write summaries and essays. Watch your word count carefully." },
  READING:   { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", desc: "The clock runs for the entire section. Manage your time across all questions." },
  LISTENING: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", desc: "Audio plays once. Listen carefully before answering." },
};

export default function SectionTransition({ section, timeLimit, questionCount, instructions, onBegin }: Props) {
  const meta = sectionMeta[section];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 rounded-xl border border-border bg-card shadow-lg p-8 text-center">

        <span className={cn("rounded-full px-4 py-1.5 text-sm font-semibold", meta.color)}>
          {section.charAt(0) + section.slice(1).toLowerCase()} Section
        </span>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground">Ready to begin?</h2>

        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} /> {timeLimit} min
          </span>
          <span>{questionCount} question{questionCount !== 1 ? "s" : ""}</span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{instructions ?? meta.desc}</p>

        <Button onClick={onBegin} className="mt-8 w-full gap-2" size="lg">
          Begin {section.charAt(0) + section.slice(1).toLowerCase()}
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
