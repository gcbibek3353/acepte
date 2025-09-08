"use client"
import AnswersComponent from '@/components/Practice/Answers'
import Header from '@/components/Practice/Header'
import Timer from '@/components/Practice/Timer'
import SummarizeTextArea from '@/components/Practice/Writing/summarizeWrittenText/summarizeTextArea'
import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import React from 'react'

interface AnswerData {
  id: string
  userId: string
  questionId: string
  answer: string
  wordCount: number
  totalScore: number | null
  contentScore: number | null
  formScore: number | null
  grammerScore: number | null
  vocabScore: number | null
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
  questionId: string
  textTitle: string
  passage: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  min_word_limit: number
  max_word_limit: number
  createdAt: string
  updatedAt: string
  isActive: boolean
  answers: AnswerData[]
  bookmarks: BookMarkData[]
}

interface ApiResponse {
  success: boolean
  message: string
  data: QuestionData
}


const SummarizeWrittenTextPage = () => {
  const params = useParams();
  const textId = params.text_id as string;

  const timeLimit = 10 * 60; // 10 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/summarizeWrittenText/${textId}`;
  const { data, loading, error } = useFetch<ApiResponse>(URL)

  const handleTimeExceedHandler = () => {
    alert('Time is up! Please submit your summary.')
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data || !data.data) return <div>No data found.</div>

  const questionData = data.data

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <Header
        questionType='Summarize Written Text'
        instruction={`Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen. You have ${timeLimit} minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.`}
        bookMarkURL={`${URL}/bookmark`}
        questionUniqueId={questionData.questionId}
        title={questionData.textTitle}
        bookmarks={questionData.bookmarks}
        difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
      />

      {/* Timer */}
      <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" />

      {/* <EssayTextArea essayId={essayId} /> */}
      <SummarizeTextArea textId={textId} text={data.data.passage} />

      <AnswersComponent answers={questionData.answers} />

    </div>
  )
}

export default SummarizeWrittenTextPage