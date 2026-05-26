"use client"
import Header from '@/components/Practice/Header'
import Listening_hcs_answer from '@/components/Practice/listening/Answers/Listening_hcs_answer'
import ListeningHCS from '@/components/Practice/listening/HighlightCorrectSummary/ListeningHCS'
import useFetch from '@/hooks/useFetch'
import { ListeningHcsDetail, ApiResponse } from '@/types/listening'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/highlightCorrectSummary/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<ListeningHcsDetail>>(URL)

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
        <div className="flex items-center gap-2 mb-6">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            Listening
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Highlight Correct Summary</span>
        </div>

        <Header
          questionType="Highlight Correct Summary"
          instruction="You will hear a recording. Click on the paragraph that best relates to the recording."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <ListeningHCS audioUrl={questionData.audioUrl} questionText={questionData.questionText} options={questionData.options} passageId={passageId as string} />
        </div>

        <Listening_hcs_answer answers={questionData.answers} options={questionData.options} correctOptionIndex={questionData.correctOptionIndex} />
      </div>
    </div>
  )
}

export default Page
