'use client'
import Header from '@/components/Practice/Header'
import Sst_answer from '@/components/Practice/listening/Answers/Sst_answer'
import SummarizeSpokenTextComponent from '@/components/Practice/listening/SummarizeSpokenText/SummarizeSpokenTextComponent'
import Timer from '@/components/Practice/Timer'
import useFetch from '@/hooks/useFetch'
import { SstDetail, ApiResponse } from '@/types/listening'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { passageId } = useParams();
  const timeLimit = 10 * 60;

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/summarizeSpokenText/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<SstDetail>>(URL)

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

  if (!data?.success || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="rounded-lg border border-border bg-muted px-6 py-4 text-muted-foreground text-sm font-medium">
          No data found for this question.
        </div>
      </div>
    )
  }

  const questionData = data.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* Section breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            Listening
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Summarize Spoken Text</span>
        </div>

        {/* Header */}
        <Header
          questionType="Summarize Spoken Text"
          instruction="You will hear a short report. Write a summary for a fellow student who was not present. You should write 50–70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the lecture."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        {/* Timer */}
        <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining" />

        {/* Main practice area */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <SummarizeSpokenTextComponent passageId={passageId as string} audioUrl={questionData.audioUrl} />
        </div>

        {/* Previous submissions */}
        <Sst_answer answers={questionData.answers} />
      </div>
    </div>
  )
}

export default Page
