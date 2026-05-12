"use client"
import AnswersComponent from '@/components/Practice/Answers';
import Header from '@/components/Practice/Header';
import DragAndDrop from '@/components/Practice/Reading/DragAndDrop';
import useFetch from '@/hooks/useFetch';
import { FibDragDropDetail, ApiResponse } from '@/types/reading';
import { useParams } from 'next/navigation';
import React from 'react'

const FIBDragAndDrop = () => {
  const { passageId } = useParams();
  const timeLimit = 1 * 60; // 10 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDragDrop/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<FibDragDropDetail>>(URL)

  const handleTimeExceedHandler = () => {
    alert('Time is up! Please submit your essay.')
  }

  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  if (error) return <div className="max-w-4xl mx-auto p-6">Error: {error}</div>
  if (!data?.success || !data?.data) return <div className="max-w-4xl mx-auto p-6">No data found</div>

  const questionData = data.data;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <Header
          questionType='Fill in the Blanks (Drag and Drop)'
          instruction={`In the text below some words are missing. Drag words from the box below to the appropriate place in the text. To undo an answer choice, drag the word back to the box below the text.`}
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks as any}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        {/* Timer */}
        {/* <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" /> */}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <DragAndDrop passage={questionData.content} passageId={questionData.id} options={questionData.options} />
        </div>

        {/* Answers Component */}
        <AnswersComponent answers={questionData.answers as any} />
      </div>
    </div>
  )
}

export default FIBDragAndDrop