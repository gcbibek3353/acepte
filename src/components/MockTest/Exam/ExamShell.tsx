"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExamHeader from "./ExamHeader";
import ExamIntro from "./ExamIntro";
import SectionTransition from "./SectionTransition";
import QuestionNavigator from "./QuestionNavigator";
import QuestionRenderer from "./QuestionRenderer";
import { cn } from "@/lib/utils";

type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";

interface MockTestQuestion {
  id: string;
  order: number;
  questionType: string;
  questionId: string;
}

interface SectionData {
  id: string;
  section: PteSection;
  order: number;
  timeLimit: number;
  instructions: string | null;
  questions: MockTestQuestion[];
}

interface SectionAttempt {
  section: PteSection;
  status: string;
  startedAt: string | null;
}

interface AttemptState {
  id: string;
  status: string;
  startedAt: string | null;
  mockTest: { id: string; title: string; sections: SectionData[] };
  sectionAttempts: SectionAttempt[];
  responses: { mockTestQuestionId: string; answerData: any; audioUrl: string | null }[];
}

interface Props {
  testId: string;
  attemptId: string;
}

// ─── Audio upload helper ──────────────────────────────────────────────────────

async function uploadAudio(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("audio", file);
  const res  = await fetch("/api/v1/s3/upload-audio", { method: "POST", body: formData });
  const json = await res.json();
  if (!json.audioUrl) throw new Error("Audio upload failed");
  return json.audioUrl;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ExamShell({ testId, attemptId }: Props) {
  const router = useRouter();

  // ── Server state ──────────────────────────────────────────────────────────
  const [attempt, setAttempt]     = useState<AttemptState | null>(null);
  const [loading, setLoading]     = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ── Exam position ─────────────────────────────────────────────────────────
  const [sectionIdx, setSectionIdx]   = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);

  // ── Answer state ──────────────────────────────────────────────────────────
  // answeredMap: mqId → saved answerData (persists across question navigation)
  const [answeredMap, setAnsweredMap] = useState<Map<string, any>>(new Map());
  // audioFileMap: mqId → File (pending audio, cleared after upload)
  const audioFileMapRef = useRef<Map<string, File>>(new Map());
  // current answer being built (resets when question changes)
  const [pendingAnswer, setPendingAnswer] = useState<any>(null);
  const pendingAudioRef = useRef<File | null>(null);

  // ── Intro screen (shown once before any section starts) ──────────────────
  const [showIntro, setShowIntro] = useState(false);

  // ── Section transition ────────────────────────────────────────────────────
  const [showTransition, setShowTransition] = useState(false);
  const [transitionSection, setTransitionSection] = useState<SectionData | null>(null);

  // ── Timer (exam-level remaining seconds, derived from startedAt) ──────────
  const [examRemaining, setExamRemaining] = useState(0);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Warn before unload ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Your exam is in progress. Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // ── Load attempt state ────────────────────────────────────────────────────
  const loadAttempt = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res  = await fetch(`/api/v1/mocktest/attempt/${attemptId}`);
      const json = await res.json();
      if (!res.ok) { setLoadError(json.message ?? "Failed to load attempt"); return; }
      const data: AttemptState = json.data;
      setAttempt(data);

      // Restore answered map from existing responses
      const restoredMap = new Map<string, any>();
      data.responses.forEach((r) => restoredMap.set(r.mockTestQuestionId, r.answerData));
      setAnsweredMap(restoredMap);

      // Find the current section (first non-COMPLETED)
      const sorted = [...data.mockTest.sections].sort((a, b) => a.order - b.order);
      const completedSections = new Set(data.sectionAttempts.filter((s) => s.status === "COMPLETED").map((s) => s.section));
      const curSecIdx = sorted.findIndex((s) => !completedSections.has(s.section));
      const activeSectionIdx = curSecIdx === -1 ? sorted.length - 1 : curSecIdx;
      setSectionIdx(activeSectionIdx);

      // Find first unanswered question in that section
      const activeSection = sorted[activeSectionIdx];
      if (activeSection) {
        const answeredIds = new Set(data.responses.map((r) => r.mockTestQuestionId));
        const firstUnanswered = activeSection.questions.findIndex((q) => !answeredIds.has(q.id));
        setQuestionIdx(firstUnanswered === -1 ? 0 : firstUnanswered);
      }

      // Show transition if section not yet started
      const activeSectionAttempt = data.sectionAttempts.find((s) => s.section === sorted[activeSectionIdx]?.section);
      if (activeSection && (!activeSectionAttempt || activeSectionAttempt.status === "NOT_STARTED")) {
        setTransitionSection(activeSection);
        // Show intro screen if nothing has started yet; otherwise go straight to section transition
        if (data.sectionAttempts.length === 0) {
          setShowIntro(true);
        } else {
          setShowTransition(true);
        }
      }
    } catch {
      setLoadError("Network error. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => { loadAttempt(); }, [loadAttempt]);

  // ── Exam-level countdown (ticks every second) ─────────────────────────────
  useEffect(() => {
    if (!attempt?.startedAt) return;
    const totalMinutes = attempt.mockTest.sections.reduce((s, x) => s + x.timeLimit, 0);
    if (!totalMinutes) return;
    const calcRemaining = () => {
      const elapsed = Math.floor((Date.now() - new Date(attempt.startedAt!).getTime()) / 1000);
      return Math.max(0, totalMinutes * 60 - elapsed);
    };
    setExamRemaining(calcRemaining());
    const id = setInterval(() => setExamRemaining(calcRemaining()), 1000);
    return () => clearInterval(id);
  }, [attempt?.startedAt, attempt?.mockTest.sections]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const sortedSections = attempt
    ? [...attempt.mockTest.sections].sort((a, b) => a.order - b.order)
    : [];

  const currentSection  = sortedSections[sectionIdx] ?? null;
  const currentQuestion = currentSection?.questions?.[questionIdx] ?? null;
  const completedSections = new Set(attempt?.sectionAttempts.filter((s) => s.status === "COMPLETED").map((s) => s.section) ?? []);

  // ── Section timer (for READING section) ──────────────────────────────────
  const [sectionRemaining, setSectionRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!currentSection) return;
    const sectionAttempt = attempt?.sectionAttempts.find((s) => s.section === currentSection.section);
    if (!sectionAttempt?.startedAt) { setSectionRemaining(null); return; }
    const calcSec = () => {
      const elapsed = Math.floor((Date.now() - new Date(sectionAttempt.startedAt!).getTime()) / 1000);
      return Math.max(0, currentSection.timeLimit * 60 - elapsed);
    };
    setSectionRemaining(calcSec());
    const id = setInterval(() => {
      const rem = calcSec();
      setSectionRemaining(rem);
      if (rem === 0) { clearInterval(id); handleCompleteSection(true); }
    }, 1000);
    return () => clearInterval(id);
  }, [currentSection?.id, attempt?.sectionAttempts]);

  // ── Begin a section (after transition modal) ──────────────────────────────
  async function handleBeginSection() {
    if (!transitionSection) return;
    setShowTransition(false);
    try {
      await fetch(`/api/v1/mocktest/attempt/${attemptId}/section/${transitionSection.section}/start`, { method: "POST" });
      await loadAttempt();
    } catch {
      // Non-fatal — exam continues
    }
  }

  // ── Answer change callback ────────────────────────────────────────────────
  function handleAnswerChange(data: any, audioFile?: File) {
    setPendingAnswer(data);
    if (audioFile) pendingAudioRef.current = audioFile;
  }

  // ── Persist the current pending answer ────────────────────────────────────
  // Returns the up-to-date answered map so callers (e.g. section completion)
  // can see the just-saved answer without waiting for a re-render.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function saveCurrentAnswer(): Promise<Map<string, any>> {
    if (!currentQuestion) return answeredMap;

    let audioUrl: string | undefined;
    const audioFile = pendingAudioRef.current;
    if (audioFile) {
      audioUrl = await uploadAudio(audioFile);
      pendingAudioRef.current = null;
    }

    const hasAnswer = pendingAnswer !== null || audioUrl;
    if (!hasAnswer) return answeredMap;

    await fetch(`/api/v1/mocktest/attempt/${attemptId}/response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mockTestQuestionId: currentQuestion.id,
        answerData: pendingAnswer,
        audioUrl,
      }),
    });
    const updated = new Map(answeredMap).set(currentQuestion.id, pendingAnswer);
    setAnsweredMap(updated);
    return updated;
  }

  // ── Save the current answer without navigating (explicit Save button) ─────
  async function handleSave() {
    if (!currentQuestion) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await saveCurrentAnswer();
      setPendingAnswer(null);
      pendingAudioRef.current = null;
    } catch (e: any) {
      setSubmitError(e.message ?? "Failed to save answer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Submit current answer and advance ─────────────────────────────────────
  async function handleNext(skip = false) {
    if (!currentQuestion || !currentSection) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      // Track locally so handleCompleteSection sees the updated map immediately
      // (skip means move without saving)
      const latestAnsweredMap = skip ? answeredMap : await saveCurrentAnswer();

      // Reset pending
      setPendingAnswer(null);
      pendingAudioRef.current = null;

      const isLastQ = questionIdx >= currentSection.questions.length - 1;

      if (!isLastQ) {
        setQuestionIdx((q) => q + 1);
      } else {
        // Last question — complete the section, passing the up-to-date map
        await handleCompleteSection(false, latestAnsweredMap);
      }
    } catch (e: any) {
      setSubmitError(e.message ?? "Failed to save answer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Complete current section ───────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleCompleteSection(timerExpired = false, latestAnsweredMap?: Map<string, any>) {
    if (!currentSection) return;

    if (!timerExpired) {
      const map = latestAnsweredMap ?? answeredMap;
      const unanswered = currentSection.questions.filter((q) => !map.has(q.id)).length;
      if (unanswered > 0) {
        const ok = confirm(`You have ${unanswered} unanswered question${unanswered !== 1 ? "s" : ""}. Complete the section anyway?`);
        if (!ok) return;
      }
    }

    try {
      await fetch(`/api/v1/mocktest/attempt/${attemptId}/section/${currentSection.section}/complete`, { method: "POST" });

      // Check if there's a next section
      const nextIdx = sectionIdx + 1;
      if (nextIdx < sortedSections.length) {
        const nextSection = sortedSections[nextIdx];
        setSectionIdx(nextIdx);
        setQuestionIdx(0);
        setPendingAnswer(null);
        setTransitionSection(nextSection);
        setShowTransition(true);
      } else {
        // All sections done — complete attempt
        await handleCompleteAttempt();
      }
    } catch (e: any) {
      setSubmitError("Failed to complete section. Please try again.");
    }
  }

  // ── Complete entire attempt ───────────────────────────────────────────────
  async function handleCompleteAttempt() {
    try {
      const res  = await fetch(`/api/v1/mocktest/attempt/${attemptId}/complete`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? "Failed to complete attempt");
      router.push(`/mocktest/${testId}/result/${attemptId}`);
    } catch (e: any) {
      setSubmitError(e.message ?? "Failed to complete attempt.");
    }
  }

  // ── Navigate to specific question ─────────────────────────────────────────
  function handleNavigate(idx: number) {
    if (submitting) return;
    setPendingAnswer(null);
    pendingAudioRef.current = null;
    setQuestionIdx(idx);
  }

  // ── Render states ─────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-3 text-muted-foreground">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading your exam...</span>
      </div>
    );
  }

  if (loadError || !attempt || !currentSection || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <AlertCircle size={32} className="text-destructive opacity-70" />
        <p className="text-sm text-destructive">{loadError ?? "No active section found."}</p>
        <Button variant="secondary" onClick={() => router.push(`/mocktest/${testId}`)}>Back to Test</Button>
      </div>
    );
  }

  // ── Intro screen — same exam layout, intro content instead of a question ──
  if (showIntro) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <ExamHeader
          testTitle={attempt.mockTest.title}
          section={null}
          examRemainingSeconds={0}
        />
        <div className="flex-1 container mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex gap-6">
            <div className="flex-1 min-w-0">
              <div className="rounded-lg border border-border bg-card shadow-sm p-6 mb-4">
                <ExamIntro onNext={() => { setShowIntro(false); setShowTransition(true); }} />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => { setShowIntro(false); setShowTransition(true); }}
                  className="gap-2"
                >
                  Next <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isReading = currentSection.section === "READING";
  const qNumber = questionIdx + 1;
  const totalQ  = currentSection.questions.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Sticky exam header */}
      <ExamHeader
        testTitle={attempt.mockTest.title}
        section={currentSection.section}
        questionNumber={qNumber}
        totalQuestions={totalQ}
        examRemainingSeconds={examRemaining}
      />

      {/* Section-level timer bar (Reading only) */}
      {isReading && sectionRemaining !== null && (
        <div className={cn(
          "sticky top-14 z-30 px-4 py-2 text-center text-xs font-semibold border-b border-border transition-colors",
          sectionRemaining <= 60  ? "bg-destructive/10 text-destructive" :
          sectionRemaining <= 120 ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300" :
                                    "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
        )}>
          Section time remaining: {Math.floor(sectionRemaining / 60)}:{String(sectionRemaining % 60).padStart(2, "0")}
        </div>
      )}

      {/* Main layout */}
      <div className="flex-1 container mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex gap-6">

          {/* Question area */}
          <div className="flex-1 min-w-0">
            <div className="rounded-lg border border-border bg-card shadow-sm p-6 mb-4">
              <QuestionRenderer
                key={currentQuestion.id}    // remount when question changes
                question={currentQuestion}
                savedAnswer={answeredMap.get(currentQuestion.id) ?? null}
                onAnswerChange={handleAnswerChange}
              />
            </div>

            {/* Error */}
            {submitError && (
              <div className="mb-4 rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {submitError}
              </div>
            )}

            {/* Navigation row */}
            <div className="flex items-center justify-between">
              <Button variant="secondary" size="sm" disabled={questionIdx === 0 || submitting} onClick={() => handleNavigate(questionIdx - 1)}>
                ← Previous
              </Button>

              <div className="flex items-center gap-3">
                {/* Skip (no answer saved) */}
                <Button variant="secondary" size="sm" disabled={submitting} onClick={() => handleNext(true)}>
                  Skip
                </Button>

                {/* Next / Complete Section */}
                {questionIdx < totalQ - 1 ? (
                  <Button onClick={() => handleNext(false)} disabled={submitting} className="gap-2">
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                    Save & Next <ChevronRight size={14} />
                  </Button>
                ) : (
                  <>
                    {/* Explicit save for the last question so it isn't flagged as unanswered */}
                    <Button variant="secondary" size="sm" onClick={handleSave} disabled={submitting} className="gap-2">
                      {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                      Save
                    </Button>
                    <Button onClick={() => handleNext(false)} disabled={submitting} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                      {sectionIdx < sortedSections.length - 1 ? "Complete Section →" : "Finish Test →"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Side navigator */}
          <div className="hidden lg:block w-44 shrink-0">
            <div className="sticky top-20">
              <QuestionNavigator
                questions={currentSection.questions}
                currentIdx={questionIdx}
                answeredIds={new Set(answeredMap.keys())}
                onNavigate={handleNavigate}
              />

              {/* Section progress */}
              <div className="mt-4 rounded-lg border border-border bg-card shadow-sm p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Sections</p>
                <div className="space-y-1">
                  {sortedSections.map((s, idx) => (
                    <div key={s.id} className={cn("text-xs px-2 py-1 rounded-md font-medium",
                      completedSections.has(s.section) ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" :
                      idx === sectionIdx ? "bg-primary text-primary-foreground" :
                                           "text-muted-foreground"
                    )}>
                      {completedSections.has(s.section) ? "✓ " : idx === sectionIdx ? "● " : "○ "}
                      {s.section.charAt(0) + s.section.slice(1).toLowerCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section transition modal */}
      {showTransition && transitionSection && (
        <SectionTransition
          section={transitionSection.section}
          timeLimit={transitionSection.timeLimit}
          questionCount={transitionSection.questions.length}
          instructions={transitionSection.instructions}
          onBegin={handleBeginSection}
        />
      )}
    </div>
  );
}
