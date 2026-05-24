"use client"
import Header from '@/components/Practice/Header';
import Mcs_answer from '@/components/Practice/Reading/Answers/Mcs_answer';
import MCS from '@/components/Practice/Reading/MCS';
import useFetch from '@/hooks/useFetch';
import { McsDetail, ApiResponse } from '@/types/reading';
import { useParams } from 'next/navigation';
import React from 'react'

const ReadingMCSPage = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/mcs/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<McsDetail>>(URL)

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
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            Reading
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Multiple Choice (Single)</span>
        </div>

        <Header
          questionType="Multiple Choice (Single)"
          instruction="Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <MCS passage={questionData.content} passageId={questionData.id} options={questionData.options} />
        </div>

        <Mcs_answer answers={questionData.answers} options={questionData.options} correctOptionIndex={questionData.correctOptionIndex} />
      </div>
    </div>
  )
}

export default ReadingMCSPage
