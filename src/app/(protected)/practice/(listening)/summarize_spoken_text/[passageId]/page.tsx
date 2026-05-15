'use client'
import AnswersComponent from '@/components/Practice/Answers'
import Header from '@/components/Practice/Header'
import SummarizeSpokenTextComponent from '@/components/Practice/listening/SummarizeSpokenText/SummarizeSpokenTextComponent'
import Timer from '@/components/Practice/Timer'
import useFetch from '@/hooks/useFetch'
import { SstDetail, ApiResponse } from '@/types/listening'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { passageId } = useParams();
  const timeLimit = 10 * 60; // 10 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/summarizeSpokenText/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<SstDetail>>(URL)

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
                questionType='Summarize Spoken Text'
                instruction={`You will hear a short report. Write a summary for a fellow student who was not present. You should write 50-70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the lecture.`}
                questionUniqueId={questionData.questionId}
                title={questionData.title}
                bookMarkURL={`${URL}/bookmark`}
                bookmarks={questionData.bookmarks}
                difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
            />

            {/* Timer */}
            <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" />

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                <SummarizeSpokenTextComponent passageId={passageId as string} audioUrl={questionData.audioUrl} />
            </div>

            {/* Answers Component */}
            <AnswersComponent answers={questionData.answers} />
        </div>
    </div>
)
}

export default Page
