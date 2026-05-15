"use client"
import AnswersComponent from '@/components/Practice/Answers'
import Header from '@/components/Practice/Header'
import ListeningHIW from '@/components/Practice/listening/HighlightIncorrectWords/ListeningHIW'
import useFetch from '@/hooks/useFetch'
import { ListeningHiwDetail, ApiResponse } from '@/types/listening'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/highlightIncorrectWords/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<ListeningHiwDetail>>(URL)

  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  if (error) return <div className="max-w-4xl mx-auto p-6">Error: {error}</div>
  if (!data?.success || !data?.data) return <div className="max-w-4xl mx-auto p-6">No data found</div>

  const questionData = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <Header
          questionType='Highlight Incorrect Words'
          instruction={`You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.`}
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
          <ListeningHIW audioUrl={questionData.audioUrl} passage={questionData.passage} passageId={passageId as string} />
        </div>

        {/* Answers Component */}
        <AnswersComponent answers={questionData.answers} />
      </div>
    </div>
  )
}

export default Page
