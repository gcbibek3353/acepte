"use client";
import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, RotateCcw } from "lucide-react";

type Phase = "idle" | "recording" | "done";

interface Props {
  onNext: () => void;
}

export default function ExamIntro({ onNext }: Props) {
  const [phase, setPhase]       = useState<Phase>("idle");
  const [seconds, setSeconds]   = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef        = useRef<Blob[]>([]);
  const timerRef         = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      mediaRecorderRef.current?.stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        setPhase("done");
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setPhase("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      // mic denied — recording is optional
    }
  }

  function stopRecording() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream?.getTracks().forEach((t) => t.stop());
  }

  function reRecord() {
    setAudioURL(null);
    setSeconds(0);
    setPhase("idle");
  }

  function fmt(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  return (
    <div className="space-y-5">
      {/* Prompt */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-1">Introduce Yourself</h2>
        <p className="text-sm text-muted-foreground">
          Before the test begins, record a short introduction about yourself. This recording is not saved or scored — it's just a warm-up.
        </p>
      </div>

      {/* Talking points */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-1.5">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">Suggested talking points</p>
        <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
          <li>Your name and where you are from</li>
          <li>Your current occupation or field of study</li>
          <li>Why you are taking the PTE exam</li>
          <li>Your target score or timeline</li>
        </ul>
      </div>

      {/* Recorder */}
      <div className="space-y-3">
        {/* Status */}
        <div className="flex items-center gap-2 text-sm">
          <span className={
            phase === "recording" ? "h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse shrink-0" :
            phase === "done"      ? "h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" :
                                    "h-2.5 w-2.5 rounded-full bg-muted-foreground/30 shrink-0"
          } />
          <span className="text-muted-foreground">
            {phase === "idle"      && "Ready to record"}
            {phase === "recording" && `Recording — ${fmt(seconds)}`}
            {phase === "done"      && "Recording complete"}
          </span>
        </div>

        {/* Playback */}
        {audioURL && (
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <audio controls src={audioURL} className="w-full h-8" />
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {phase === "idle" && (
            <button
              onClick={startRecording}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <Mic size={14} /> Start Recording
            </button>
          )}
          {phase === "recording" && (
            <button
              onClick={stopRecording}
              className="inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <MicOff size={14} /> Stop
            </button>
          )}
          {phase === "done" && (
            <button
              onClick={reRecord}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw size={13} /> Re-record
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">Recording is optional — you can skip directly to the test.</p>
      </div>
    </div>
  );
}
