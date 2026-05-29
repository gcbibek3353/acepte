'use client'
import React, { useState } from 'react'
import AudioRecorder from './AudioRecorder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { uploadAudioFile } from '@/lib/uploadAudio'

interface Read_AloudProps {
  passage: string;
  questionId: string;
}

const Read_Aloud = ({ passage, questionId }: Read_AloudProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordingKey, setRecordingKey] = useState(0);
  const queryClient = useQueryClient();
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const detailUrl = `${apiUrl}/api/v1/practice/speaking/read-aloud/${questionId}`;

  const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
    mutationFn: async (file: File) => {
      const audioUrl = await uploadAudioFile(file, 'speaking-read-aloud');

      const response = await fetch(`/api/v1/practice/speaking/read-aloud/${questionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioUrl }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Submit failed: ${response.status}`);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [detailUrl] });
      router.refresh();
      alert('Answer submitted successfully!');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <p className="text-base leading-relaxed text-foreground">{passage}</p>
      </div>

      <AudioRecorder key={recordingKey} audioFile={audioFile} setAudioFile={setAudioFile} prepTime={40} />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => { setAudioFile(null); setRecordingKey(k => k + 1); }}
          disabled={!audioFile || isSubmitting}
          className="px-5 py-2 text-sm font-medium rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Redo
        </button>
        <button
          onClick={() => audioFile && submitAnswer(audioFile)}
          disabled={!audioFile || isSubmitting}
          className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? 'Submitting…' : 'Submit Answer'}
        </button>
      </div>
    </div>
  )
}

export default Read_Aloud
