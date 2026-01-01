'use client'
import React, { useState } from 'react'
import AudioRecorder from './AudioRecorder'

interface Read_AloudProps {
  passage: string;
  questionId: string;
}

const Read_Aloud = ({ passage, questionId }: Read_AloudProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async () => {
    try {
      setIsSubmitting(true);
      // 1. Get PreSignedUrl from the backend
      const url = await fetch('/api/v1/s3/put-object-url').then(res => res.json()).then(data => data.url);

      // 3. Submit the answer to the backend with the S3 Object URL
      const submitToDb = async (url: string) => {
        const response = await fetch(`/api/v1/practice/speaking/read-aloud/${questionId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audioUrl: url,
          })
        })
        const result = await response.json()

        if (result.success) {
          alert('Essay submitted and evaluated successfully!')
        } else {
          alert(`Error: ${result.message}`)
        }
      }

      // 2. Store the audio file to S3 using the PreSignedUrl
      const s3Response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': audioFile?.type || 'audio/webm',
        },
        body: audioFile,
      })
        .then(async res => {
          // Extract the object URL by removing query parameters from the presigned URL
          const objectUrl = url.split('?')[0];
          await submitToDb(objectUrl);
        }).catch(err => {
          console.error("Upload Error:", err);
        });
    } catch (error) {
      console.log('Failed while getting PreSignedUrl or storing the audio or Submitting the Answer');
    }
    finally {
      setIsSubmitting(false);
    }
  }

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
          onClick={submitHandler}
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
