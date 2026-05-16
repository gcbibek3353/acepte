'use client'
import React, { useState } from 'react'
import AudioRecorder from './AudioRecorder';
import PlayAudio from '../listening/PlayAudio';
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface AnswerShortQuestionProps {
  audioUrl: string;
  questionId: string;
}

const AnswerShortQuestion = ({ audioUrl, questionId }: AnswerShortQuestionProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/speaking/answer-short-question/${questionId}`;

  const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
    mutationFn: async (file: File) => {
      const { url: presignedUrl } = await fetch('/api/v1/s3/put-object-url').then(r => r.json());
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'audio/webm' },
        body: file,
      });
      const audioUrl = presignedUrl.split('?')[0];
      const response = await fetch(`/api/v1/practice/speaking/answer-short-question/${questionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [detailUrl] });
      alert('Answer submitted successfully!');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-sm border">

      <h1 className="text-xl font-semibold text-gray-800">
        Answer Short Question
      </h1>

      <PlayAudio audioUrl={audioUrl} />

      <AudioRecorder audioFile={audioFile} setAudioFile={setAudioFile} />

      <div className="flex justify-end">
        <button
          onClick={() => audioFile && submitAnswer(audioFile)}
          disabled={!audioFile || isSubmitting}
          className="px-6 py-2 rounded-lg font-medium
                         bg-blue-600 text-white
                         hover:bg-blue-700
                         disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : ' Submit Answer'}
        </button>
      </div>
    </div>
  )
}

export default AnswerShortQuestion
