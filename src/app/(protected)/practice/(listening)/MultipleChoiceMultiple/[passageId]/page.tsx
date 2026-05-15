'use client'
import AnswersComponent from '@/components/Practice/Answers'
import Header from '@/components/Practice/Header'
import ListeningMCM from '@/components/Practice/listening/MultipleChoiceMultiple/listeningMCM'
import useFetch from '@/hooks/useFetch'
import { ListeningMcmDetail, ApiResponse } from '@/types/listening'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/multipleChoiceMultiple/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<ListeningMcmDetail>>(URL)

  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  if (error) return <div className="max-w-4xl mx-auto p-6">Error: {error}</div>
  if (!data?.success || !data?.data) return <div className="max-w-4xl mx-auto p-6">No data found</div>

  const questionData = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <Header
          questionType='Multiple Choice (Multiple)'
          instruction={`Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response.`}
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
          <ListeningMCM audioUrl={questionData.audioUrl} questionText={questionData.questionText} passageId={passageId as string} options={questionData.options} />
        </div>

        {/* Answers Component */}
        <AnswersComponent answers={questionData.answers} />
      </div>
    </div>
  )
}

export default Page
