"use client"
import Header from '@/components/Practice/Header';
import Rop_answer from '@/components/Practice/Reading/Answers/Rop_answer';
import Reorder from '@/components/Practice/Reading/Reorder';
import useFetch from '@/hooks/useFetch';
import { ReorderDetail, ApiResponse } from '@/types/reading';
import { useParams } from 'next/navigation';
import React from 'react'

const ReadingROPPage = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/reorder/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<ReorderDetail>>(URL)

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
          <span className="text-xs text-muted-foreground">Re-order Paragraphs</span>
        </div>

        <Header
          questionType="Re-order Paragraphs"
          instruction="The text boxes in the left panel have been placed in a random order. Restore the original order by dragging the text boxes from the left panel to the right panel."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <Reorder passageId={questionData.id} paragraphs={questionData.paragraphs} />
        </div>

        <Rop_answer answers={questionData.answers} paragraphs={questionData.paragraphs} />
      </div>
    </div>
  )
}

export default ReadingROPPage
