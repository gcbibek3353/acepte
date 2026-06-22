'use client'
import React, { useCallback, useState } from 'react'
import AudioRecorder from './AudioRecorder';
import PlayAudio from '../listening/PlayAudio';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { uploadAudioFile } from '@/lib/uploadAudio'

interface Repeat_SentenceProps {
  audioUrl: string;
  questionId: string;
}

const Repeat_Sentence = ({ audioUrl, questionId }: Repeat_SentenceProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordingKey, setRecordingKey] = useState(0);
  const [readyToRecord, setReadyToRecord] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleAudioEnded = useCallback(() => setReadyToRecord(true), []);

  const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/speaking/repeat-sentence/${questionId}`;

  const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
    mutationFn: async (file: File) => {
      const audioUrl = await uploadAudioFile(file, 'speaking-read-aloud');

      const response = await fetch(`/api/v1/practice/speaking/repeat-sentence/${questionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Submit failed');
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
      <PlayAudio key={recordingKey} audioUrl={audioUrl} autoPlay onEnded={handleAudioEnded} />

      <AudioRecorder key={recordingKey} audioFile={audioFile} setAudioFile={setAudioFile} start={readyToRecord} prepTime={5} />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => { setAudioFile(null); setReadyToRecord(false); setRecordingKey(k => k + 1); }}
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

export default Repeat_Sentence
