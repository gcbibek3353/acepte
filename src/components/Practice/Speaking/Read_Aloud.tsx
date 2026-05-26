'use client'
import React, { useState } from 'react'
import AudioRecorder from './AudioRecorder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadAudioFile } from '@/lib/uploadAudio'

interface Read_AloudProps {
  passage: string;
  questionId: string;
}

const Read_Aloud = ({ passage, questionId }: Read_AloudProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

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
      alert('Answer submitted successfully!');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-sm border">

      <h1 className="text-xl font-semibold text-gray-800">
        Read Aloud
      </h1>

      <div className="p-4 bg-gray-50 border rounded-lg text-gray-700 leading-relaxed">
        {passage}
      </div>

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

export default Read_Aloud
