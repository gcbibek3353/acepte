'use client'
import { useEffect, useRef, useState } from "react";

type Phase = 'idle' | 'preparing' | 'recording' | 'done';

interface AudioRecorderProps {
  audioFile: File | null;
  setAudioFile: (file: File) => void;
  prepTime?: number;
  maxRecordTime?: number;
  /** Gate the prep countdown — recording flow won't begin until this is true. Defaults to true (starts on mount). */
  start?: boolean;
}

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch { /* AudioContext unavailable */ }
}

export default function AudioRecorder({
  audioFile,
  setAudioFile,
  prepTime = 0,
  maxRecordTime = 30,
  start = true,
}: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const prepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prepStartedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>(prepTime > 0 && start ? 'preparing' : 'idle');
  const [prepCountdown, setPrepCountdown] = useState(prepTime);
  const [recordRemaining, setRecordRemaining] = useState(maxRecordTime);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const stopRecording = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop());
    }
    setPhase('done');
  };

  // Always-current ref so the recording timer callback never holds a stale closure
  const stopRecordingRef = useRef(stopRecording);
  useEffect(() => { stopRecordingRef.current = stopRecording; });

  const startRecordingAsync = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        setAudioFile(new File([blob], "answer.webm", { type: "audio/webm" }));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setPhase('recording');
      setRecordRemaining(maxRecordTime);

      let remaining = maxRecordTime;
      recordTimerRef.current = setInterval(() => {
        remaining -= 1;
        setRecordRemaining(remaining);
        if (remaining <= 0) stopRecordingRef.current();
      }, 1000);
    } catch {
      setPhase('idle');
    }
  };

  // Prep countdown — begins once `start` is true (immediately on mount when start defaults to true)
  useEffect(() => {
    if (!start || prepStartedRef.current || prepTime <= 0) return;
    prepStartedRef.current = true;

    setPhase('preparing');
    setPrepCountdown(prepTime);

    let remaining = prepTime;
    prepTimerRef.current = setInterval(() => {
      remaining -= 1;
      setPrepCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(prepTimerRef.current!);
        prepTimerRef.current = null;
        playBeep();
        startRecordingAsync();
      }
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      mediaRecorderRef.current?.stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const handleManualRecord = () => {
    if (phase === 'preparing') {
      if (prepTimerRef.current) {
        clearInterval(prepTimerRef.current);
        prepTimerRef.current = null;
      }
      playBeep();
    }
    if (phase === 'idle' || phase === 'preparing') {
      startRecordingAsync();
    }
  };

  const prepProgress = prepTime > 0 ? (prepCountdown / prepTime) * 100 : 100;
  const recordProgress = (recordRemaining / maxRecordTime) * 100;

  return (
    <div className="space-y-4">
      {/* Status row */}
      <div className="flex items-center gap-2 text-sm">
        <span className={`h-3 w-3 rounded-full shrink-0 transition-colors ${
          phase === 'recording' ? 'bg-red-500 animate-pulse'
          : phase === 'done'    ? 'bg-green-500'
          : phase === 'preparing' ? 'bg-amber-400 animate-pulse'
          : 'bg-muted-foreground/40'
        }`} />
        <span className="text-muted-foreground">
          {phase === 'preparing'
            ? `Preparing — speak in ${prepCountdown}s`
            : phase === 'recording'
            ? 'Recording in progress'
            : phase === 'done'
            ? 'Recording completed'
            : 'Not recording'}
        </span>
      </div>

      {/* Prep countdown bar */}
      {phase === 'preparing' && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Preparation time</span>
            <span className="font-mono font-medium text-amber-600 dark:text-amber-400">{prepCountdown}s</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-[width] duration-1000 ease-linear"
              style={{ width: `${prepProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Recording starts automatically — or click <span className="font-medium">Record Now</span> to skip.</p>
        </div>
      )}

      {/* Recording countdown bar */}
      {phase === 'recording' && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Recording time remaining</span>
            <span className="font-mono font-medium text-red-500">{recordRemaining}s</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-red-500 transition-[width] duration-1000 ease-linear"
              style={{ width: `${recordProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleManualRecord}
          disabled={phase === 'recording' || phase === 'done'}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
          </svg>
          {phase === 'preparing' ? 'Record Now' : 'Record'}
        </button>

        <button
          onClick={stopRecording}
          disabled={phase !== 'recording'}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
          </svg>
          Stop
        </button>
      </div>

      {audioURL && (
        <div className="p-3 border border-border rounded-lg bg-muted/30">
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}

      {audioFile && (
        <p className="text-xs text-muted-foreground">
          {audioFile.name} · {Math.round(audioFile.size / 1024)} KB
        </p>
      )}
    </div>
  );
}
