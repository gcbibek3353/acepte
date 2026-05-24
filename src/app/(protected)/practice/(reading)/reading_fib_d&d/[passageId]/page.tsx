"use client"
import Header from '@/components/Practice/Header';
import Fib_dd_answer from '@/components/Practice/Reading/Answers/Fib_dd_answer';
import DragAndDrop from '@/components/Practice/Reading/DragAndDrop';
import useFetch from '@/hooks/useFetch';
import { FibDragDropDetail, ApiResponse } from '@/types/reading';
import { useParams } from 'next/navigation';
import React from 'react'

const FIBDragAndDrop = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDragDrop/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<FibDragDropDetail>>(URL)

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
          <span className="text-xs text-muted-foreground">Fill in the Blanks (Drag &amp; Drop)</span>
        </div>

        <Header
          questionType="Fill in the Blanks (Drag and Drop)"
          instruction="In the text below some words are missing. Drag words from the box below to the appropriate place in the text. To undo an answer choice, drag the word back to the box below the text."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <DragAndDrop passage={questionData.content} passageId={questionData.id} options={questionData.options} />
        </div>

        <Fib_dd_answer answers={questionData.answers} blanks={questionData.blanks} options={questionData.options} />
      </div>
    </div>
  )
}

export default FIBDragAndDrop
