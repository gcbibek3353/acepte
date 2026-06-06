"use client";
import { useState, useEffect } from "react";
import { X, Search, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type QuestionType =
  | "READ_ALOUD" | "REPEAT_SENTENCE" | "DESCRIBE_IMAGE" | "RETELL_LECTURE" | "ANSWER_SHORT_QUESTION"
  | "SUMMARIZE_WRITTEN_TEXT" | "WRITE_ESSAY"
  | "READING_MCM" | "READING_MCS" | "REORDER_PARAGRAPHS" | "READING_FILL_BLANKS_DRAG_DROP" | "READING_FILL_BLANKS_DROPDOWN"
  | "SUMMARIZE_SPOKEN_TEXT" | "LISTENING_MCM" | "LISTENING_MCS" | "LISTENING_FILL_BLANKS"
  | "LISTENING_HIGHLIGHT_SUMMARY" | "LISTENING_SELECT_MISSING_WORD" | "LISTENING_HIGHLIGHT_INCORRECT_WORDS" | "WRITE_FROM_DICTATION";

interface Question {
  id: string;
  title: string;
  questionId: string;
  difficulty: string;
}

interface Props {
  sectionType: "SPEAKING" | "WRITING" | "READING" | "LISTENING";
  onAdd: (questionType: QuestionType, questionId: string, questionTitle: string) => Promise<void>;
  onClose: () => void;
}

const sectionQuestionTypes: Record<string, QuestionType[]> = {
  SPEAKING:  ["READ_ALOUD", "REPEAT_SENTENCE", "DESCRIBE_IMAGE", "RETELL_LECTURE", "ANSWER_SHORT_QUESTION"],
  WRITING:   ["SUMMARIZE_WRITTEN_TEXT", "WRITE_ESSAY"],
  READING:   ["READING_MCM", "READING_MCS", "REORDER_PARAGRAPHS", "READING_FILL_BLANKS_DRAG_DROP", "READING_FILL_BLANKS_DROPDOWN"],
  LISTENING: ["SUMMARIZE_SPOKEN_TEXT", "LISTENING_MCM", "LISTENING_MCS", "LISTENING_FILL_BLANKS", "LISTENING_HIGHLIGHT_SUMMARY", "LISTENING_SELECT_MISSING_WORD", "LISTENING_HIGHLIGHT_INCORRECT_WORDS", "WRITE_FROM_DICTATION"],
};

const difficultyColors: Record<string, string> = {
  EASY:   "text-emerald-600 dark:text-emerald-400",
  MEDIUM: "text-amber-600 dark:text-amber-400",
  HARD:   "text-destructive",
};

export default function QuestionPickerModal({ sectionType, onAdd, onClose }: Props) {
  const allowedTypes = sectionQuestionTypes[sectionType] ?? [];
  const [selectedType, setSelectedType]   = useState<QuestionType>(allowedTypes[0]);
  const [search, setSearch]               = useState("");
  const [difficulty, setDifficulty]       = useState("");
  const [questions, setQuestions]         = useState<Question[]>([]);
  const [fetching, setFetching]           = useState(false);
  const [fetchError, setFetchError]       = useState<string | null>(null);
  const [adding, setAdding]               = useState<string | null>(null);
  const [added, setAdded]                 = useState<Set<string>>(new Set());

  // Auto-fetch on mount with the first type in the section
  useEffect(() => {
    if (allowedTypes[0]) fetchQuestions(allowedTypes[0]);
  }, []);

  async function fetchQuestions(type: QuestionType, searchVal = search, diffVal = difficulty) {
    setSelectedType(type);
    setQuestions([]);
    setFetchError(null);
    setFetching(true);
    try {
      const params = new URLSearchParams({ type, limit: "50" });
      if (searchVal) params.set("search", searchVal);
      if (diffVal)   params.set("difficulty", diffVal);

      const res  = await fetch(`/api/v1/admin/questions?${params}`);
      const json = await res.json();
      if (!res.ok) { setFetchError(json.message ?? "Failed to fetch questions"); return; }
      setQuestions(json.data?.questions ?? []);
    } catch {
      setFetchError("Network error while fetching questions");
    } finally {
      setFetching(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchQuestions(selectedType);
  }

  async function handleAdd(q: Question) {
    setAdding(q.id);
    try {
      await onAdd(selectedType, q.id, q.title);
      setAdded((prev) => new Set(prev).add(q.id));
    } finally {
      setAdding(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl mx-4 rounded-xl border border-border bg-card shadow-lg flex flex-col max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-card-foreground">
            Add Question — <span className="text-primary">{sectionType}</span>
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Question type tabs */}
        <div className="px-4 pt-3 pb-2 border-b border-border flex flex-wrap gap-2">
          {allowedTypes.map((type) => (
            <button
              key={type}
              onClick={() => fetchQuestions(type, search, difficulty)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {type.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Search + difficulty filter */}
        <form onSubmit={handleSearch} className="px-4 py-3 border-b border-border flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
          <Button type="submit" size="sm" disabled={fetching}>
            {fetching ? <Loader2 size={13} className="animate-spin" /> : "Search"}
          </Button>
        </form>

        {/* Question list */}
        <div className="flex-1 overflow-y-auto p-4">
          {questions.length === 0 && !fetching && !fetchError && (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
              <Search size={20} />
              <span>Select a question type above to load questions</span>
            </div>
          )}

          {fetching && (
            <div className="flex items-center justify-center h-32 text-muted-foreground gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          )}

          {fetchError && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3">
              {fetchError}
            </div>
          )}

          {!fetching && questions.length > 0 && (
            <ul className="space-y-2">
              {questions.map((q) => (
                <li
                  key={q.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{q.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground font-mono">{q.questionId}</span>
                      <span className={`text-xs font-medium ${difficultyColors[q.difficulty] ?? "text-muted-foreground"}`}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={added.has(q.id) ? "secondary" : "default"}
                    disabled={adding === q.id || added.has(q.id)}
                    onClick={() => handleAdd(q)}
                    className="ml-4 shrink-0"
                  >
                    {adding === q.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : added.has(q.id) ? (
                      "Added"
                    ) : (
                      <><Plus size={14} className="mr-1" />Add</>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-4 py-3 border-t border-border">
          <Button variant="secondary" onClick={onClose} className="w-full">Done</Button>
        </div>
      </div>
    </div>
  );
}
