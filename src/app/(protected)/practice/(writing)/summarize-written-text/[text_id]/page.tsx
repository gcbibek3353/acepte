"use client"
import AnswersComponent from '@/components/Practice/Answers'
import Header from '@/components/Practice/Header'
import Timer from '@/components/Practice/Timer'
import SummarizeTextArea from '@/components/Practice/Writing/summarizeWrittenText/summarizeTextArea'
import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import React from 'react'

import { SummarizeWrittenTextDetail, ApiResponse } from '@/types/writing'

const SummarizeWrittenTextDetailPage = () => {
  const params = useParams();
  const textId = params.text_id as string;

  const timeLimit = 10 * 60;

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/summarizeWrittenText/${textId}`;
  const { data, loading, error } = useFetch<ApiResponse<SummarizeWrittenTextDetail>>(URL)

  const handleTimeExceedHandler = () => {
    alert('Time is up! Please submit your summary.')
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

  if (!data || !data.data) {
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
          <span className="text-xs text-muted-foreground">Summarize Written Text</span>
        </div>

        <Header
          questionType="Summarize Written Text"
          instruction={`Read the passage below and summarize it using one sentence. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.`}
          bookMarkURL={`${URL}/bookmark`}
          questionUniqueId={questionData.questionId}
          title={questionData.textTitle}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <SummarizeTextArea textId={textId} text={questionData.passage} />
        </div>

        <AnswersComponent answers={questionData.answers} />
      </div>
    </div>
  )
}

export default SummarizeWrittenTextDetailPage
