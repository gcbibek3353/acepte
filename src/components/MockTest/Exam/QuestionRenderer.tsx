"use client";
import { useEffect, useState, useCallback } from "react";
import { Loader2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import AudioRecorder from "@/components/Practice/Speaking/AudioRecorder";
import PlayAudio from "@/components/Practice/listening/PlayAudio";
import { cn } from "@/lib/utils";

// Maps question type → practice GET endpoint base path
const TYPE_TO_PATH: Record<string, string> = {
  READ_ALOUD:                      "/api/v1/practice/speaking/read-aloud",
  REPEAT_SENTENCE:                 "/api/v1/practice/speaking/repeat-sentence",
  DESCRIBE_IMAGE:                  "/api/v1/practice/speaking/describe-image",
  RETELL_LECTURE:                  "/api/v1/practice/speaking/retell-lecture",
  ANSWER_SHORT_QUESTION:           "/api/v1/practice/speaking/answer-short-question",
  WRITE_ESSAY:                     "/api/v1/practice/writing/writeEssay",
  SUMMARIZE_WRITTEN_TEXT:          "/api/v1/practice/writing/summarizeWrittenText",
  READING_MCM:                     "/api/v1/practice/reading/mcm",
  READING_MCS:                     "/api/v1/practice/reading/mcs",
  REORDER_PARAGRAPHS:              "/api/v1/practice/reading/reorder",
  READING_FILL_BLANKS_DRAG_DROP:   "/api/v1/practice/reading/fibDragDrop",
  READING_FILL_BLANKS_DROPDOWN:    "/api/v1/practice/reading/fibDropDown",
  SUMMARIZE_SPOKEN_TEXT:           "/api/v1/practice/listening/summarizeSpokenText",
  LISTENING_MCM:                   "/api/v1/practice/listening/multipleChoiceMultiple",
  LISTENING_MCS:                   "/api/v1/practice/listening/multipleChoiceSingle",
  LISTENING_FILL_BLANKS:           "/api/v1/practice/listening/fillTheBlanks",
  LISTENING_HIGHLIGHT_SUMMARY:     "/api/v1/practice/listening/highlightCorrectSummary",
  LISTENING_SELECT_MISSING_WORD:   "/api/v1/practice/listening/selectMissingWord",
  LISTENING_HIGHLIGHT_INCORRECT_WORDS: "/api/v1/practice/listening/highlightIncorrectWords",
  WRITE_FROM_DICTATION:            "/api/v1/practice/listening/writeFromDictation",
};

// ─── Prop types ───────────────────────────────────────────────────────────────

export interface MockTestQuestion {
  id: string;
  order: number;
  questionType: string;
  questionId: string;
}

interface Props {
  question: MockTestQuestion;
  savedAnswer: any;
  onAnswerChange: (answerData: any, audioFile?: File) => void;
}

// ─── Passage renderer with {n} blank placeholders → dropdowns or inputs ───────

function renderPassageWithBlanks(
  passage: string,
  blanks: any[],
  answers: Record<string, string>,
  onChange: (pos: string, val: string) => void,
  type: "dropdown" | "input"
) {
  const parts = passage.split(/(\{\d+\})/g);
  return (
    <p className="text-base text-foreground leading-relaxed">
      {parts.map((part, i) => {
        const match = part.match(/^\{(\d+)\}$/);
        if (!match) return <span key={i}>{part}</span>;
        const pos = match[1];
        if (type === "dropdown") {
          const blank = blanks.find((b: any) => String(b.position) === pos);
          return (
            <select
              key={i}
              value={answers[pos] ?? ""}
              onChange={(e) => onChange(pos, e.target.value)}
              className="mx-1 rounded border border-input bg-background px-2 py-0.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">—</option>
              {blank?.options?.map((opt: string, oi: number) => (
                <option key={oi} value={String(oi)}>{opt}</option>
              ))}
            </select>
          );
        }
        return (
          <input
            key={i}
            type="text"
            value={answers[pos] ?? ""}
            onChange={(e) => onChange(pos, e.target.value)}
            className="mx-1 w-24 rounded border-b-2 border-primary bg-transparent px-1 py-0.5 text-sm text-foreground focus:outline-none"
            placeholder="..."
          />
        );
      })}
    </p>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>;
}

// ─── Individual question renderers ────────────────────────────────────────────

function ReadAloud({ data, onAnswerChange }: { data: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const handleFile = useCallback((f: File) => { setAudioFile(f); onAnswerChange(null, f); }, []);
  return (
    <div>
      <SectionLabel label="Read Aloud" />
      <p className="mb-6 text-sm text-muted-foreground">Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible.</p>
      <div className="rounded-lg border border-border bg-muted/20 p-6 mb-6">
        <p className="text-base text-foreground leading-relaxed">{data.passage}</p>
      </div>
      <AudioRecorder audioFile={audioFile} setAudioFile={handleFile} prepTime={40} maxRecordTime={40} />
    </div>
  );
}

function RepeatSentence({ data, onAnswerChange }: { data: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const handleFile = useCallback((f: File) => { setAudioFile(f); onAnswerChange(null, f); }, []);
  return (
    <div>
      <SectionLabel label="Repeat Sentence" />
      <p className="mb-4 text-sm text-muted-foreground">You will hear a sentence. Please repeat the sentence exactly as you hear it.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <AudioRecorder audioFile={audioFile} setAudioFile={handleFile} prepTime={3} maxRecordTime={15} />
    </div>
  );
}

function DescribeImage({ data, onAnswerChange }: { data: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const handleFile = useCallback((f: File) => { setAudioFile(f); onAnswerChange(null, f); }, []);
  return (
    <div>
      <SectionLabel label="Describe Image" />
      <p className="mb-4 text-sm text-muted-foreground">Look at the image. In 25 seconds, please speak into the microphone and describe in detail what the image is showing.</p>
      {data.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.imageUrl} alt="Describe this image" className="mb-6 max-h-72 mx-auto rounded-lg border border-border object-contain" />
      )}
      <AudioRecorder audioFile={audioFile} setAudioFile={handleFile} prepTime={25} maxRecordTime={40} />
    </div>
  );
}

function RetellLecture({ data, onAnswerChange }: { data: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const handleFile = useCallback((f: File) => { setAudioFile(f); onAnswerChange(null, f); }, []);
  return (
    <div>
      <SectionLabel label="Re-tell Lecture" />
      <p className="mb-4 text-sm text-muted-foreground">You will hear a lecture. After listening, in 10 seconds, please speak into the microphone and re-tell what you have just heard.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      {data.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.imageUrl} alt="Lecture image" className="mb-4 max-h-48 mx-auto rounded-lg border border-border object-contain" />
      )}
      <AudioRecorder audioFile={audioFile} setAudioFile={handleFile} prepTime={10} maxRecordTime={40} />
    </div>
  );
}

function AnswerShortQuestion({ data, onAnswerChange }: { data: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const handleFile = useCallback((f: File) => { setAudioFile(f); onAnswerChange(null, f); }, []);
  return (
    <div>
      <SectionLabel label="Answer Short Question" />
      <p className="mb-4 text-sm text-muted-foreground">You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <AudioRecorder audioFile={audioFile} setAudioFile={handleFile} prepTime={3} maxRecordTime={10} />
    </div>
  );
}

function WriteEssay({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [text, setText] = useState<string>(savedAnswer?.text ?? "");
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  useEffect(() => { onAnswerChange({ text, wordCount }); }, [text]);
  return (
    <div>
      <SectionLabel label="Write Essay" />
      <div className="rounded-lg border border-border bg-muted/20 p-4 mb-4">
        <h3 className="font-semibold text-foreground mb-1">{data.essayTitle}</h3>
        <p className="text-sm text-muted-foreground">{data.essay_description}</p>
      </div>
      <p className="text-xs text-muted-foreground mb-2">Write 200–300 words. You have 20 minutes for this task.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        placeholder="Write your essay here..."
      />
      <p className={cn("mt-1 text-xs text-right", wordCount < 200 ? "text-amber-600" : wordCount > 300 ? "text-destructive" : "text-emerald-600")}>
        {wordCount} words {wordCount < 200 ? `(need ${200 - wordCount} more)` : wordCount > 300 ? "(too long)" : "✓"}
      </p>
    </div>
  );
}

function SummarizeWrittenText({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [text, setText] = useState<string>(savedAnswer?.text ?? "");
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  useEffect(() => { onAnswerChange({ text, wordCount }); }, [text]);
  return (
    <div>
      <SectionLabel label="Summarize Written Text" />
      <p className="text-xs text-muted-foreground mb-3">Read the passage and summarize it using ONE sentence. Write between 5–75 words. You have 10 minutes.</p>
      <div className="rounded-lg border border-border bg-muted/20 p-5 mb-4 max-h-60 overflow-y-auto">
        <h3 className="font-semibold text-foreground mb-2">{data.textTitle}</h3>
        <p className="text-base text-foreground leading-relaxed">{data.passage}</p>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        placeholder="Write one sentence that summarizes the passage..."
      />
      <p className={cn("mt-1 text-xs text-right", wordCount > 75 ? "text-destructive" : "text-muted-foreground")}>
        {wordCount} / 75 words
      </p>
    </div>
  );
}

function ReadingMCM({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [selected, setSelected] = useState<string[]>(savedAnswer?.selectedOptions ?? []);
  function toggle(id: string) {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    setSelected(next);
    onAnswerChange({ selectedOptions: next });
  }
  return (
    <div>
      <SectionLabel label="Multiple Choice — Multiple Answers" />
      <div className="rounded-lg border border-border bg-muted/20 p-5 mb-5 max-h-72 overflow-y-auto">
        <p className="text-base text-foreground leading-relaxed">{data.content}</p>
      </div>
      <p className="text-sm font-medium text-foreground mb-3">{data.questionText}</p>
      <p className="text-xs text-muted-foreground mb-3">Select all correct options. Incorrect selections reduce your score.</p>
      <div className="space-y-2">
        {data.options?.map((opt: any) => (
          <label key={opt.id} className={cn("flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors", selected.includes(opt.id) ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30")}>
            <input type="checkbox" checked={selected.includes(opt.id)} onChange={() => toggle(opt.id)} className="mt-0.5 accent-primary" />
            <span className="text-sm text-foreground">{opt.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ReadingMCS({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [selected, setSelected] = useState<number | null>(savedAnswer?.selectedOptionIndex ?? null);
  function pick(idx: number) { setSelected(idx); onAnswerChange({ selectedOptionIndex: idx }); }
  return (
    <div>
      <SectionLabel label="Multiple Choice — Single Answer" />
      <div className="rounded-lg border border-border bg-muted/20 p-5 mb-5 max-h-72 overflow-y-auto">
        <p className="text-base text-foreground leading-relaxed">{data.content}</p>
      </div>
      <p className="text-sm font-medium text-foreground mb-3">{data.questionText}</p>
      <div className="space-y-2">
        {data.options?.map((opt: string, idx: number) => (
          <label key={idx} className={cn("flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors", selected === idx ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30")}>
            <input type="radio" checked={selected === idx} onChange={() => pick(idx)} className="mt-0.5 accent-primary" />
            <span className="text-sm text-foreground"><span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ReorderParagraphs({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [items, setItems] = useState<any[]>(() => {
    const paras = data.paragraphs ?? [];
    if (savedAnswer?.order?.length) {
      return savedAnswer.order.map((id: string) => paras.find((p: any) => p.id === id)).filter(Boolean);
    }
    return [...paras].sort(() => Math.random() - 0.5);
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const next = Array.from(items);
    const [moved] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, moved);
    setItems(next);
    onAnswerChange({ order: next.map((p) => p.id) });
  }

  if (!mounted) return <div className="h-48 bg-muted/20 rounded-lg animate-pulse" />;
  return (
    <div>
      <SectionLabel label="Re-order Paragraphs" />
      <p className="text-xs text-muted-foreground mb-4">Drag the text boxes to put them in the correct order.</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="reorder">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}
              className={cn("space-y-2 min-h-32 rounded-lg border-2 border-dashed p-3 transition-colors", snapshot.isDraggingOver ? "border-primary/50 bg-primary/5" : "border-border bg-muted/10")}>
              {items.map((para, idx) => (
                <Draggable key={para.id} draggableId={para.id} index={idx}>
                  {(p, s) => (
                    <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}
                      className={cn("flex items-start gap-3 rounded-lg border bg-card p-4 cursor-move shadow-sm", s.isDragging ? "shadow-md border-primary/40 rotate-1" : "border-border")}>
                      <GripVertical size={16} className="shrink-0 text-muted-foreground mt-0.5" />
                      <p className="text-sm text-foreground leading-relaxed">{para.text}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

function FibDragDrop({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [blankContents, setBlankContents] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    (savedAnswer ?? []).forEach((a: any) => { init[String(a.pos)] = String(a.index); });
    return init;
  });
  const [available, setAvailable] = useState<string[]>(() => {
    const used = new Set((savedAnswer ?? []).map((a: any) => String(a.index)));
    return (data.options ?? []).filter((_: string, i: number) => !used.has(String(i)));
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  function dropOnBlank(result: DropResult) {
    if (!result.destination) return;
    const destId = result.destination.droppableId;
    if (!destId.startsWith("blank-")) return;
    const pos = destId.replace("blank-", "");
    const optIdx = result.draggableId.replace("opt-", "");
    const newContents = { ...blankContents, [pos]: optIdx };
    setBlankContents(newContents);
    setAvailable((prev) => prev.filter((_, i) => String(i) !== optIdx));
    onAnswerChange(Object.entries(newContents).map(([p, idx]) => ({ pos: p, index: Number(idx) })));
  }

  const parts = (data.passage ?? "").split(/(\{\d+\})/g);

  if (!mounted) return <div className="h-48 bg-muted/20 rounded-lg animate-pulse" />;
  return (
    <div>
      <SectionLabel label="Reading: Fill in the Blanks (Drag & Drop)" />
      <p className="text-xs text-muted-foreground mb-4">Drag words from the box below into the correct blanks in the text.</p>
      <DragDropContext onDragEnd={dropOnBlank}>
        {/* Word bank */}
        <Droppable droppableId="wordbank" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}
              className="flex flex-wrap gap-2 rounded-lg border border-dashed border-border bg-muted/20 p-3 mb-5 min-h-12">
              {available.map((word, i) => (
                <Draggable key={`opt-${i}`} draggableId={`opt-${i}`} index={i}>
                  {(p) => (
                    <span ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}
                      className="rounded-md border border-border bg-card px-3 py-1 text-sm text-foreground shadow-sm cursor-move">
                      {word}
                    </span>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* Passage with blank drop zones */}
        <p className="text-base text-foreground leading-loose">
          {parts.map((part: string, i: number) => {
            const match = part.match(/^\{(\d+)\}$/);
            if (!match) return <span key={i}>{part}</span>;
            const pos = match[1];
            const filledIdx = blankContents[pos];
            const filledWord = filledIdx !== undefined ? data.options?.[Number(filledIdx)] : undefined;
            return (
              <Droppable key={i} droppableId={`blank-${pos}`} direction="horizontal">
                {(provided, snapshot) => (
                  <span ref={provided.innerRef} {...provided.droppableProps}
                    className={cn("inline-flex items-center mx-1 min-w-20 h-8 rounded border-b-2 px-2 text-sm transition-colors",
                      snapshot.isDraggingOver ? "border-primary bg-primary/10" :
                      filledWord ? "border-primary bg-primary/5 text-foreground font-medium" :
                                   "border-muted-foreground/40 text-muted-foreground")}>
                    {filledWord ?? "..."}
                    {provided.placeholder}
                  </span>
                )}
              </Droppable>
            );
          })}
        </p>
      </DragDropContext>
    </div>
  );
}

function FibDropdown({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    (savedAnswer ?? []).forEach((a: any) => { init[String(a.pos)] = String(a.index); });
    return init;
  });
  function change(pos: string, val: string) {
    const next = { ...answers, [pos]: val };
    setAnswers(next);
    onAnswerChange(Object.entries(next).map(([p, idx]) => ({ pos: p, index: idx })));
  }
  return (
    <div>
      <SectionLabel label="Reading: Fill in the Blanks (Dropdown)" />
      <p className="text-xs text-muted-foreground mb-4">Select the correct word for each gap from the dropdown menus.</p>
      <div className="rounded-lg border border-border bg-muted/10 p-5 leading-loose">
        {renderPassageWithBlanks(data.passage ?? "", data.blanks ?? [], answers, change, "dropdown")}
      </div>
    </div>
  );
}

function SummarizeSpokenText({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [text, setText] = useState<string>(savedAnswer?.text ?? "");
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  useEffect(() => { onAnswerChange({ text, wordCount }); }, [text]);
  return (
    <div>
      <SectionLabel label="Summarize Spoken Text" />
      <p className="text-xs text-muted-foreground mb-3">You will hear a short report. Write a summary for a fellow student who was not present. You should write 50–70 words. You have 10 minutes.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        placeholder="Write your summary here..."
      />
      <p className={cn("mt-1 text-xs text-right", wordCount < 50 ? "text-amber-600" : wordCount > 70 ? "text-destructive" : "text-emerald-600")}>
        {wordCount} / 50–70 words
      </p>
    </div>
  );
}

function ListeningMCM({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [selected, setSelected] = useState<string[]>(savedAnswer?.selectedOptions ?? []);
  function toggle(id: string) {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    setSelected(next);
    onAnswerChange({ selectedOptions: next });
  }
  return (
    <div>
      <SectionLabel label="Listening: Multiple Choice — Multiple Answers" />
      <PlayAudio audioUrl={data.audioUrl} />
      <p className="text-sm font-medium text-foreground mb-3">{data.questionText}</p>
      <div className="space-y-2">
        {data.options?.map((opt: any) => (
          <label key={opt.id} className={cn("flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors", selected.includes(opt.id) ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30")}>
            <input type="checkbox" checked={selected.includes(opt.id)} onChange={() => toggle(opt.id)} className="mt-0.5 accent-primary" />
            <span className="text-sm text-foreground">{opt.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ListeningMCS({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [selected, setSelected] = useState<number | null>(savedAnswer?.selectedOptionIndex ?? null);
  function pick(idx: number) { setSelected(idx); onAnswerChange({ selectedOptionIndex: idx }); }
  return (
    <div>
      <SectionLabel label="Listening: Multiple Choice — Single Answer" />
      <PlayAudio audioUrl={data.audioUrl} />
      <p className="text-sm font-medium text-foreground mb-3">{data.questionText}</p>
      <div className="space-y-2">
        {data.options?.map((opt: string, idx: number) => (
          <label key={idx} className={cn("flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors", selected === idx ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30")}>
            <input type="radio" checked={selected === idx} onChange={() => pick(idx)} className="mt-0.5 accent-primary" />
            <span className="text-sm text-foreground"><span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ListeningFillBlanks({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [answers, setAnswers] = useState<Record<string, string>>(savedAnswer ?? {});
  function change(pos: string, val: string) {
    const next = { ...answers, [pos]: val };
    setAnswers(next);
    onAnswerChange(next);
  }
  return (
    <div>
      <SectionLabel label="Listening: Fill in the Blanks" />
      <p className="text-xs text-muted-foreground mb-3">Listen and type the missing words in the blanks.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <div className="rounded-lg border border-border bg-muted/10 p-5 leading-loose">
        {renderPassageWithBlanks(data.passage ?? "", data.blanks ?? [], answers, change, "input")}
      </div>
    </div>
  );
}

function HighlightSummary({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [selected, setSelected] = useState<number | null>(savedAnswer?.selectedOptionIndex ?? null);
  function pick(idx: number) { setSelected(idx); onAnswerChange({ selectedOptionIndex: idx }); }
  return (
    <div>
      <SectionLabel label="Highlight Correct Summary" />
      <p className="text-xs text-muted-foreground mb-3">Listen and select the paragraph that best summarizes the recording.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <div className="space-y-2">
        {data.options?.map((opt: string, idx: number) => (
          <label key={idx} className={cn("flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors", selected === idx ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30")}>
            <input type="radio" checked={selected === idx} onChange={() => pick(idx)} className="mt-0.5 accent-primary" />
            <span className="text-sm text-foreground">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function SelectMissingWord({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [selected, setSelected] = useState<number | null>(savedAnswer?.selectedOptionIndex ?? null);
  function pick(idx: number) { setSelected(idx); onAnswerChange({ selectedOptionIndex: idx }); }
  return (
    <div>
      <SectionLabel label="Select Missing Word" />
      <p className="text-xs text-muted-foreground mb-3">Select the most appropriate word to complete the recording.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.options?.map((opt: string, idx: number) => (
          <button key={idx} onClick={() => pick(idx)}
            className={cn("rounded-lg border p-4 text-sm text-left transition-colors", selected === idx ? "border-primary bg-primary/5 text-foreground font-medium" : "border-border hover:bg-muted/30 text-foreground")}>
            <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function HighlightIncorrectWords({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [highlighted, setHighlighted] = useState<{ word: string; position: number }[]>(savedAnswer ?? []);
  function toggleWord(word: string, position: number) {
    const exists = highlighted.find((h) => h.position === position);
    const next = exists ? highlighted.filter((h) => h.position !== position) : [...highlighted, { word, position }];
    setHighlighted(next);
    onAnswerChange(next);
  }
  const words: string[] = (data.passage ?? "").split(/\s+/);
  const highlightedPositions = new Set(highlighted.map((h) => h.position));
  return (
    <div>
      <SectionLabel label="Highlight Incorrect Words" />
      <p className="text-xs text-muted-foreground mb-3">The recording differs from the text. Click on the words that are different from what the speaker says.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <div className="rounded-lg border border-border bg-muted/10 p-5 leading-loose">
        {words.map((word: string, idx: number) => (
          <span
            key={idx}
            onClick={() => toggleWord(word, idx)}
            className={cn("cursor-pointer rounded px-0.5 transition-colors hover:bg-amber-100 dark:hover:bg-amber-900/20", highlightedPositions.has(idx) && "bg-amber-200 dark:bg-amber-800/40 text-amber-900 dark:text-amber-100")}
          >
            {word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

function WriteFromDictation({ data, savedAnswer, onAnswerChange }: { data: any; savedAnswer: any; onAnswerChange: Props["onAnswerChange"] }) {
  const [text, setText] = useState<string>(savedAnswer?.text ?? "");
  useEffect(() => { onAnswerChange({ text }); }, [text]);
  return (
    <div>
      <SectionLabel label="Write From Dictation" />
      <p className="text-xs text-muted-foreground mb-3">Listen and type the sentence you hear.</p>
      <PlayAudio audioUrl={data.audioUrl} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Type what you hear..."
      />
    </div>
  );
}

// ─── Renderer map ─────────────────────────────────────────────────────────────

const RENDERER_MAP: Record<string, React.ComponentType<any>> = {
  READ_ALOUD:                       ReadAloud,
  REPEAT_SENTENCE:                  RepeatSentence,
  DESCRIBE_IMAGE:                   DescribeImage,
  RETELL_LECTURE:                   RetellLecture,
  ANSWER_SHORT_QUESTION:            AnswerShortQuestion,
  WRITE_ESSAY:                      WriteEssay,
  SUMMARIZE_WRITTEN_TEXT:           SummarizeWrittenText,
  READING_MCM:                      ReadingMCM,
  READING_MCS:                      ReadingMCS,
  REORDER_PARAGRAPHS:               ReorderParagraphs,
  READING_FILL_BLANKS_DRAG_DROP:    FibDragDrop,
  READING_FILL_BLANKS_DROPDOWN:     FibDropdown,
  SUMMARIZE_SPOKEN_TEXT:            SummarizeSpokenText,
  LISTENING_MCM:                    ListeningMCM,
  LISTENING_MCS:                    ListeningMCS,
  LISTENING_FILL_BLANKS:            ListeningFillBlanks,
  LISTENING_HIGHLIGHT_SUMMARY:      HighlightSummary,
  LISTENING_SELECT_MISSING_WORD:    SelectMissingWord,
  LISTENING_HIGHLIGHT_INCORRECT_WORDS: HighlightIncorrectWords,
  WRITE_FROM_DICTATION:             WriteFromDictation,
};

// ─── Main export ──────────────────────────────────────────────────────────────

export default function QuestionRenderer({ question, savedAnswer, onAnswerChange }: Props) {
  const [qData, setQData]     = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const path = TYPE_TO_PATH[question.questionType];
    if (!path) { setError(`Unknown question type: ${question.questionType}`); setLoading(false); return; }
    setLoading(true);
    setError(null);
    setQData(null);
    fetch(`${path}/${question.questionId}`)
      .then((r) => r.json())
      .then((json) => {
        if (!json.success && !json.data && !json.question) throw new Error(json.message ?? "Failed to load question");
        setQData(json.data ?? json.question ?? json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [question.questionType, question.questionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground gap-3">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading question...</span>
      </div>
    );
  }

  if (error || !qData) {
    return (
      <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
        {error ?? "Failed to load question data"}
      </div>
    );
  }

  const Renderer = RENDERER_MAP[question.questionType];
  if (!Renderer) {
    return (
      <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
        Question type <strong>{question.questionType}</strong> is not yet supported in the exam interface.
      </div>
    );
  }

  return <Renderer data={qData} savedAnswer={savedAnswer} onAnswerChange={onAnswerChange} />;
}
