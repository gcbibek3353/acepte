"use client"
import Header from '@/components/Practice/Header';
import Mcm_answer from '@/components/Practice/Reading/Answers/Mcm_answer';
import ReadingMCMComponent from '@/components/Practice/Reading/MCM';
import useFetch from '@/hooks/useFetch';
import { McmDetail, ApiResponse } from '@/types/reading';
import { useParams } from 'next/navigation';
import React from 'react'

const FIBMCM = () => {
  const { passageId } = useParams();
  const timeLimit = 1 * 60; // 10 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/mcm/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<McmDetail>>(URL)

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
          questionType='Multiple Choice (Multiple)'
          instruction={`
Read the text and answer the question by selecting all the correct responses. More than one response is correct.`}
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
          <ReadingMCMComponent passage={questionData.content} passageId={questionData.id} options={questionData.options} />
        </div>

        {/* Answers Component */}
        <Mcm_answer answers={questionData.answers} options={questionData.options} />
      </div>
    </div>
  )
}

export default FIBMCM