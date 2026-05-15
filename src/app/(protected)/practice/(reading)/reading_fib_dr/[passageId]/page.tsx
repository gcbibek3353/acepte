"use client"
import AnswersComponent from '@/components/Practice/Answers';
import Header from '@/components/Practice/Header';
import Fib_dr_answer from '@/components/Practice/Reading/Answers/Fib_dr_answer';
import FibDropDownComponent from '@/components/Practice/Reading/FibDropDown';
import useFetch from '@/hooks/useFetch';
import { FibDropdownDetail, ApiResponse } from '@/types/reading';
import { useParams } from 'next/navigation';
import React from 'react'

const FIBDropDown = () => {
  const { passageId } = useParams();
  const timeLimit = 1 * 60; // 10 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDropDown/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<FibDropdownDetail>>(URL)

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
          questionType='Fill in the Blanks (Dropdown)'
          instruction={`There are some words missing in the following text. Please select the correct word in the drop-down box.`}
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
          <FibDropDownComponent passage={questionData.content} passageId={passageId as string} blanks={questionData.blanks} />
        </div>

        {/* Answers Component */}
        <Fib_dr_answer answers={questionData.answers} blanks={questionData.blanks} />
      </div>
    </div>
  )
}

export default FIBDropDown