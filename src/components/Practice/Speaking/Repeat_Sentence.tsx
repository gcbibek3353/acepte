'use client'
import React, { useState } from 'react'
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
  const queryClient = useQueryClient();
  const router = useRouter();

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
      <PlayAudio audioUrl={audioUrl} />

      <AudioRecorder audioFile={audioFile} setAudioFile={setAudioFile} />

      <div className="flex justify-end">
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
