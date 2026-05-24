'use client'
import { useRef, useState } from "react";

interface AudioRecorderProps {
  audioFile: File | null;
  setAudioFile: (file: File) => void;
}

export default function AudioRecorder({ audioFile, setAudioFile }: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const startRecording = async () => {
    if (isRecording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      const file = new File([blob], "answer.webm", { type: "audio/webm" });
      setAudioFile(file);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <span
          className={`h-3 w-3 rounded-full shrink-0 ${
            isRecording ? 'bg-red-500 animate-pulse' : audioFile ? 'bg-green-500' : 'bg-muted-foreground/40'
          }`}
        />
        <span className="text-muted-foreground">
          {isRecording
            ? 'Recording in progress'
            : audioFile
            ? 'Recording completed'
            : 'Not recording'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
          </svg>
          Record
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
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
