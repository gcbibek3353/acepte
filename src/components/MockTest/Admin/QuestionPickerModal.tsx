"use client";
import { useState } from "react";
import { X, Search, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type QuestionType =
  | "READ_ALOUD" | "REPEAT_SENTENCE" | "DESCRIBE_IMAGE" | "RETELL_LECTURE" | "ANSWER_SHORT_QUESTION"
  | "SUMMARIZE_WRITTEN_TEXT" | "WRITE_ESSAY"
  | "READING_MCM" | "READING_MCS" | "REORDER_PARAGRAPHS" | "READING_FILL_BLANKS_DRAG_DROP" | "READING_FILL_BLANKS_DROPDOWN"
  | "SUMMARIZE_SPOKEN_TEXT" | "LISTENING_MCM" | "LISTENING_MCS" | "LISTENING_FILL_BLANKS"
  | "LISTENING_HIGHLIGHT_SUMMARY" | "LISTENING_SELECT_MISSING_WORD" | "LISTENING_HIGHLIGHT_INCORRECT_WORDS" | "WRITE_FROM_DICTATION";

// Maps question type to practice API endpoint
const questionTypeApiMap: Record<QuestionType, string> = {
  READ_ALOUD:                     "/api/v1/practice/speaking/read-aloud",
  REPEAT_SENTENCE:                "/api/v1/practice/speaking/repeat-sentence",
  DESCRIBE_IMAGE:                 "/api/v1/practice/speaking/describe-image",
  RETELL_LECTURE:                 "/api/v1/practice/speaking/retell-lecture",
  ANSWER_SHORT_QUESTION:          "/api/v1/practice/speaking/answer-short-question",
  SUMMARIZE_WRITTEN_TEXT:         "/api/v1/practice/writing/summarizeWrittenText",
  WRITE_ESSAY:                    "/api/v1/practice/writing/writeEssay",
  READING_MCM:                    "/api/v1/practice/reading/mcm",
  READING_MCS:                    "/api/v1/practice/reading/mcs",
  REORDER_PARAGRAPHS:             "/api/v1/practice/reading/reorder",
  READING_FILL_BLANKS_DRAG_DROP:  "/api/v1/practice/reading/fibDragDrop",
  READING_FILL_BLANKS_DROPDOWN:   "/api/v1/practice/reading/fibDropDown",
  SUMMARIZE_SPOKEN_TEXT:          "/api/v1/practice/listening/summarizeSpokenText",
  LISTENING_MCM:                  "/api/v1/practice/listening/multipleChoiceMultiple",
  LISTENING_MCS:                  "/api/v1/practice/listening/multipleChoiceSingle",
  LISTENING_FILL_BLANKS:          "/api/v1/practice/listening/fillTheBlanks",
  LISTENING_HIGHLIGHT_SUMMARY:    "/api/v1/practice/listening/highlightCorrectSummary",
  LISTENING_SELECT_MISSING_WORD:  "/api/v1/practice/listening/selectMissingWord",
  LISTENING_HIGHLIGHT_INCORRECT_WORDS: "/api/v1/practice/listening/highlightIncorrectWords",
  WRITE_FROM_DICTATION:           "/api/v1/practice/listening/writeFromDictation",
};

const QUESTION_TYPES = Object.keys(questionTypeApiMap) as QuestionType[];

interface Question {
  id: string;
  title?: string;
  essayTitle?: string;
  textTitle?: string;
  questionId?: string;
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

export default function QuestionPickerModal({ sectionType, onAdd, onClose }: Props) {
  const allowedTypes = sectionQuestionTypes[sectionType] ?? QUESTION_TYPES;
  const [selectedType, setSelectedType] = useState<QuestionType>(allowedTypes[0]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<string>>(new Set());

  async function fetchQuestions(type: QuestionType) {
    setSelectedType(type);
    setQuestions([]);
    setFetchError(null);
    setFetching(true);
    try {
      const res = await fetch(`${questionTypeApiMap[type]}?limit=50`);
      const json = await res.json();
      if (!res.ok) {
        setFetchError(json.message ?? "Failed to fetch questions");
        return;
      }
      setQuestions(json.data?.questions ?? json.data?.data ?? []);
    } catch {
      setFetchError("Network error while fetching questions");
    } finally {
      setFetching(false);
    }
  }

  function getTitle(q: Question) {
    return q.title ?? q.essayTitle ?? q.textTitle ?? q.questionId ?? q.id;
  }

  async function handleAdd(q: Question) {
    setAdding(q.id);
    try {
      await onAdd(selectedType, q.id, getTitle(q));
      setAdded((prev) => new Set(prev).add(q.id));
    } finally {
      setAdding(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl mx-4 rounded-xl border border-border bg-card shadow-lg flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-base font-semibold text-card-foreground">Add Question — {sectionType}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Type selector */}
        <div className="p-4 border-b border-border flex flex-wrap gap-2">
          {allowedTypes.map((type) => (
            <button
              key={type}
              onClick={() => fetchQuestions(type)}
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

        {/* Question list */}
        <div className="flex-1 overflow-y-auto p-4">
          {questions.length === 0 && !fetching && !fetchError && (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
              <Search size={20} />
              <span>Select a question type above to browse questions</span>
            </div>
          )}

          {fetching && (
            <div className="flex items-center justify-center h-32 text-muted-foreground gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading questions...</span>
            </div>
          )}

          {fetchError && (
            <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
              {fetchError}
            </div>
          )}

          {questions.length > 0 && (
            <ul className="space-y-2">
              {questions.map((q) => (
                <li
                  key={q.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{getTitle(q)}</p>
                    <p className="text-xs text-muted-foreground font-mono">{q.id}</p>
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

        <div className="p-4 border-t border-border">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
