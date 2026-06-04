"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, GripVertical, Trash2, Plus, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import QuestionPickerModal from "./QuestionPickerModal";

type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";
type QuestionType = string;

interface MockTestQuestion {
  id: string;
  order: number;
  questionType: QuestionType;
  questionId: string;
  questionPreview: { id: string; title: string; questionId: string } | null;
}

interface Section {
  id: string;
  section: PteSection;
  order: number;
  timeLimit: number;
  instructions: string | null;
  questions: MockTestQuestion[];
}

interface Props {
  section: Section;
  isPublished: boolean;
  onUpdateSection: (sectionId: string, data: { timeLimit?: number; instructions?: string }) => Promise<void>;
  onDeleteSection: (sectionId: string) => Promise<void>;
  onAddQuestion: (sectionId: string, questionType: QuestionType, questionId: string) => Promise<void>;
  onRemoveQuestion: (mqId: string) => Promise<void>;
}

const sectionColors: Record<PteSection, string> = {
  SPEAKING:  "border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/10",
  WRITING:   "border-l-violet-500 bg-violet-50/30 dark:bg-violet-900/10",
  READING:   "border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10",
  LISTENING: "border-l-amber-500 bg-amber-50/30 dark:bg-amber-900/10",
};

const sectionBadgeColors: Record<PteSection, string> = {
  SPEAKING:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  WRITING:   "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  READING:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  LISTENING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

export default function SectionCard({
  section, isPublished,
  onUpdateSection, onDeleteSection, onAddQuestion, onRemoveQuestion,
}: Props) {
  const [expanded, setExpanded] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [timeLimit, setTimeLimit] = useState(String(section.timeLimit));
  const [deletingSection, setDeletingSection] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  async function handleSaveTime() {
    const val = parseInt(timeLimit);
    if (!val || val <= 0) return;
    await onUpdateSection(section.id, { timeLimit: val });
    setEditingTime(false);
  }

  async function handleDeleteSection() {
    if (!confirm(`Delete the ${section.section} section? All its questions will be removed.`)) return;
    setDeletingSection(true);
    await onDeleteSection(section.id);
  }

  async function handleRemoveQuestion(mqId: string) {
    setRemovingId(mqId);
    await onRemoveQuestion(mqId);
    setRemovingId(null);
  }

  async function handleAddQuestion(questionType: QuestionType, questionId: string) {
    await onAddQuestion(section.id, questionType, questionId);
  }

  return (
    <>
      <div className={cn("rounded-lg border border-border border-l-4 shadow-sm", sectionColors[section.section])}>
        {/* Section header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            <span className={cn("rounded-full px-3 py-1 text-xs font-medium", sectionBadgeColors[section.section])}>
              {section.section}
            </span>
            <span className="text-sm font-medium text-foreground">
              {section.questions.length} question{section.questions.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Time limit */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock size={14} />
              {editingTime ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    className="w-16 rounded border border-input bg-background px-2 py-0.5 text-sm text-foreground"
                    min="1"
                  />
                  <span className="text-xs">min</span>
                  <Button size="sm" variant="default" onClick={handleSaveTime} className="h-6 px-2 text-xs">Save</Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingTime(false)} className="h-6 px-2 text-xs">Cancel</Button>
                </div>
              ) : (
                <button
                  onClick={() => !isPublished && setEditingTime(true)}
                  className={cn("hover:text-foreground transition-colors", isPublished && "cursor-default")}
                >
                  {section.timeLimit} min
                </button>
              )}
            </div>

            {!isPublished && (
              <>
                <Button size="sm" variant="secondary" onClick={() => setShowPicker(true)} className="h-7 gap-1">
                  <Plus size={13} /> Add Question
                </Button>
                <button
                  onClick={handleDeleteSection}
                  disabled={deletingSection}
                  className="text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                >
                  {deletingSection ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Questions list */}
        {expanded && (
          <div className="border-t border-border px-5 pb-4 pt-3">
            {section.questions.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No questions yet. Click "Add Question" to add some.
              </p>
            ) : (
              <ul className="space-y-2">
                {section.questions.map((q) => (
                  <li
                    key={q.id}
                    className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3"
                  >
                    <GripVertical size={15} className="text-muted-foreground shrink-0" />
                    <span className="w-6 text-xs font-mono text-muted-foreground shrink-0">{q.order}.</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {q.questionPreview?.title ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {q.questionType.replace(/_/g, " ")}
                      </p>
                    </div>
                    {!isPublished && (
                      <button
                        onClick={() => handleRemoveQuestion(q.id)}
                        disabled={removingId === q.id}
                        className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 shrink-0"
                      >
                        {removingId === q.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {showPicker && (
        <QuestionPickerModal
          sectionType={section.section}
          onAdd={async (questionType, questionId) => {
            await handleAddQuestion(questionType, questionId);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}
