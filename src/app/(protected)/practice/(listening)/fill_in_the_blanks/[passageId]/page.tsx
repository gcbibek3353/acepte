'use client';
import AnswersComponent from '@/components/Practice/Answers'
import Header from '@/components/Practice/Header'
import ListeningFIB from '@/components/Practice/listening/FillInTheBlanks/ListeningFIB';
import Timer from '@/components/Practice/Timer'
import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import React from 'react'

interface AnswerData {
  id: string
  userId: string
  passageId: string
  answers: Record<string, string> // Position -> Answer mapping
  totalScore: number
  createdAt: string
  updatedAt: string
}

interface BookMarkData {
  id: string
  userId: string
  questionId: string
  createdAt: string
}

interface QuestionData {
  id: string
  questionid: string
  title: string
  audioTranscribedText: string
  audioUrl: string
  passage: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  createdAt: string
  updatedAt: string
  answers: AnswerData[]
  bookmarks: BookMarkData[]
}

interface ApiResponse {
  success: boolean
  message: string
  data: QuestionData
}

const Page = () => {
  const { passageId } = useParams();
  const timeLimit = 1 * 60; // 10 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/fillTheBlanks/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse>(URL)

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
          questionType='Fill in the Blanks'
          instruction={`You will hear a recording. Type the missing words in each blank.`}
          questionUniqueId={questionData.questionid}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        {/* Timer */}
        {/* <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" /> */}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <ListeningFIB audioUrl={questionData.audioUrl} passage={questionData.passage} passageId={passageId as string} />
        </div>

        {/* Answers Component */}
        <AnswersComponent answers={questionData.answers} />
      </div>
    </div>
  )
}

export default Page;
