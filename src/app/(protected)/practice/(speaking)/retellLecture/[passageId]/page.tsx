'use client';
import AnswersComponent from '@/components/Practice/Answers'
import Header from '@/components/Practice/Header'
import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import React from 'react'
import Retell_Lecture from '@/components/Practice/Speaking/RetellLecture';
import SpeakingAnswer from '@/components/Practice/Speaking/Answer/SpeakingAnswer';

interface AnswerData {
  id: string
  userId: string
  questionId: string
  audiourl: string
  duration: number
  contentScore: number
  oralFluencyScore: number
  pronunciationScore: number
  totalScore: number
  user: {
    id: string
    name: string
    email: string
  }
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

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/speaking/retell-lecture/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse>(URL)

  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  if (error) return <div className="max-w-4xl mx-auto p-6">Error: {error}</div>
  if (!data?.success || !data?.data) return <div className="max-w-4xl mx-auto p-6">No data found</div>

  const questionData = data.data;
  console.log(questionData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <Header
          questionType='Re-Tell Lecture'
          instruction={`You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words. You will have 40 seconds to give your response.`}
          questionUniqueId={questionData.questionid}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <Retell_Lecture audioUrl={questionData.audioUrl} questionId={passageId as string} />
        </div>

        {/* Answers Component */}
        <SpeakingAnswer
          answers={questionData.answers}
          questionId={questionData.questionid}
          questionTitle={questionData.title}
        />
      </div>
    </div>
  )
}

export default Page;
