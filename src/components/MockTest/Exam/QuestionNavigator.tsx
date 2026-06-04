"use client";
import { cn } from "@/lib/utils";

interface MockTestQuestion {
  id: string;
  order: number;
  questionType: string;
}

interface Props {
  questions: MockTestQuestion[];
  currentIdx: number;
  answeredIds: Set<string>;
  onNavigate: (idx: number) => void;
}

export default function QuestionNavigator({ questions, currentIdx, answeredIds, onNavigate }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm p-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Questions</p>
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((q, idx) => {
          const isCurrent  = idx === currentIdx;
          const isAnswered = answeredIds.has(q.id);
          return (
            <button
              key={q.id}
              onClick={() => onNavigate(idx)}
              title={q.questionType.replace(/_/g, " ")}
              className={cn(
                "w-full aspect-square rounded-md text-xs font-semibold transition-colors",
                isCurrent  ? "bg-primary text-primary-foreground shadow-sm" :
                isAnswered ? "bg-emerald-500 text-white" :
                             "bg-secondary text-secondary-foreground hover:bg-muted"
              )}
            >
              {q.order}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" /> Current</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Answered</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-secondary inline-block" /> Not answered</span>
      </div>
    </div>
  );
}
