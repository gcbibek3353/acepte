"use client"
import Header from '@/components/Practice/Header';
import Fib_dr_answer from '@/components/Practice/Reading/Answers/Fib_dr_answer';
import FibDropDownComponent from '@/components/Practice/Reading/FibDropDown';
import useFetch from '@/hooks/useFetch';
import { FibDropdownDetail, ApiResponse } from '@/types/reading';
import { useParams } from 'next/navigation';
import React from 'react'

const FIBDropDown = () => {
  const { passageId } = useParams();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDropDown/${passageId}`;
  const { data, loading, error } = useFetch<ApiResponse<FibDropdownDetail>>(URL)

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
          <span className="text-xs text-muted-foreground">Fill in the Blanks (Dropdown)</span>
        </div>

        <Header
          questionType="Fill in the Blanks (Dropdown)"
          instruction="There are some words missing in the following text. Please select the correct word in the drop-down box."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <FibDropDownComponent passage={questionData.content} passageId={passageId as string} blanks={questionData.blanks} />
        </div>

        <Fib_dr_answer answers={questionData.answers} blanks={questionData.blanks} />
      </div>
    </div>
  )
}

export default FIBDropDown
