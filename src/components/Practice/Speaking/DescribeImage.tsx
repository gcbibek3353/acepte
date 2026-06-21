'use client'
import React, { useState } from 'react'
import AudioRecorder from './AudioRecorder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import ImageWithFallback from '@/components/ImageWithFallBack';

interface Describe_imageProps {
  imageUrl: string;
  questionId: string;
}

const Describe_image = ({ imageUrl, questionId }: Describe_imageProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/speaking/describe-image/${questionId}`;

  const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
    mutationFn: async (file: File) => {
      const { url: presignedUrl } = await fetch('/api/v1/s3/put-object-url').then(r => r.json());
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'audio/webm' },
        body: file,
      });
      const audioUrl = presignedUrl.split('?')[0];
      const response = await fetch(`/api/v1/practice/speaking/describe-image/${questionId}`, {
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
      router.refresh();
      alert('Answer submitted successfully!');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  return (
    <div className="space-y-6">

      <div className="flex justify-center p-4 bg-gray-50 border rounded-lg">
        <ImageWithFallback
          src={imageUrl}
          alt=''
          className="w-full max-w-3xl h-auto rounded-md object-contain"
        />
      </div>

      <AudioRecorder audioFile={audioFile} setAudioFile={setAudioFile} prepTime={25} />

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

export default Describe_image
