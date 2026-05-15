"use client"
import Header from '@/components/Practice/Header'
import Listening_mcs_answer from '@/components/Practice/listening/Answers/Listening_mcs_answer'
import ListeningMCS from '@/components/Practice/listening/MultipleChoiceSingle/ListeningMCS'
import useFetch from '@/hooks/useFetch'
import { ListeningMcsDetail, ApiResponse } from '@/types/listening'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/multipleChoiceSingle/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<ListeningMcsDetail>>(URL)

  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  if (error) return <div className="max-w-4xl mx-auto p-6">Error: {error}</div>
  if (!data?.success || !data?.data) return <div className="max-w-4xl mx-auto p-6">No data found</div>

  const questionData = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <Header
          questionType='Multiple Choice (Single)'
          instruction={`Listen to the recording and answer the single-choice question by selectingthe correct response . Only one response is correct.`}
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        {/* Timer */}
        {/* <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" /> */}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <ListeningMCS audioUrl={questionData.audioUrl} questionText={questionData.questionText} options={questionData.options} passageId={passageId as string} />
        </div>

        {/* Answers Component */}
        <Listening_mcs_answer answers={questionData.answers} options={questionData.options} correctOptionIndex={questionData.correctOptionIndex} />
      </div>
    </div>
  )
}

export default Page
