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

      {/* Status Indicator */}
      <div className="flex items-center gap-2 text-sm">
        <span
          className={`h-3 w-3 rounded-full ${
            isRecording ? 'bg-red-500 animate-pulse' : audioFile ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
        <span className="text-gray-600">
          {isRecording
            ? 'Recording in progress'
            : audioFile
            ? 'Recording completed'
            : 'Not recording'}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-green-600 text-white
                     hover:bg-green-700
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          🎙️ Record
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-red-600 text-white
                     hover:bg-red-700
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          ⏹ Stop
        </button>
      </div>

      {/* Playback */}
      {audioURL && (
        <div className="p-3 border rounded-lg bg-gray-50">
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}

      {/* File Info */}
      {audioFile && (
        <p className="text-xs text-gray-500">
          {audioFile.name} • {Math.round(audioFile.size / 1024)} KB
        </p>
      )}
    </div>
  );
}
