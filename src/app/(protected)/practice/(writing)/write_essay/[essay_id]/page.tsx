"use client"
import Header from '@/components/Practice/Header'
import Timer from '@/components/Practice/Timer'
import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import EssayTextArea from '@/components/Practice/Writing/writeEssay/EssayTextArea'
import WriteEssayAnswer from '@/components/Practice/Writing/writeEssay/WriteEssayAnswer'
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
  spellingScore: number | null
  vocabScore: number | null
  DSCScore: number | null
  GLRScore: number | null
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
  questionId: string
  essayTitle: string
  essay_description: string
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

const WriteEssayPage = () => {
  const params = useParams()
  const essayId = params.essay_id as string

  const timeLimit = 20 * 60

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/writeEssay/${essayId}`
  const { data, loading, error, refetch } = useFetch<ApiResponse>(URL)

  const handleTimeExceedHandler = () => {
    alert('Time is up! Please submit your essay.')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-base font-medium">Loading question…</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-4 text-destructive text-sm font-medium">
          Error loading question: {error}
        </div>
      </div>
    )
  }

  if (!data?.success || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="rounded-lg border border-border bg-muted px-6 py-4 text-muted-foreground text-sm font-medium">
          No data found for this question.
        </div>
      </div>
    )
  }

  const questionData = data.data

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            Writing
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Write Essay</span>
        </div>

        <Header
          questionType="Write Essay"
          instruction={`You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write ${questionData.min_word_limit}–${questionData.max_word_limit} words.`}
          questionUniqueId={questionData.questionId}
          title={questionData.essayTitle}
          bookMarkURL={`${URL}/bookmark`}
          description={questionData.essay_description}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <EssayTextArea essayId={essayId} onSubmitted={async () => { await refetch() }} />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <EssayTextArea essayId={essayId} />
        </div>

        <WriteEssayAnswer
          answers={questionData.answers}
          questionId={questionData.id}
          questionTitle={questionData.essayTitle}
        />
      </div>
    </div>
  )
}

export default WriteEssayPage
