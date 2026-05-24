"use client"
import FilterQuestions from '@/components/Practice/FilterQuestions'
import useFilteredAPI from '@/hooks/useFilteredAPI'
import { FibDropdownListItem } from '@/types/reading'
import React from 'react'

const ReadingFIBDropDown = () => {
  const { data, loading, error, queryParams, setQueryParams } = useFilteredAPI<FibDropdownListItem[]>('/api/v1/practice/reading/fibDropDown');

  const filterQuestions = data?.map((q) => ({
    id: q.id,
    questionId: q.questionId,
    title: q.title,
    difficulty: q.difficulty as string,
    bookmarked: q.bookmarks.length > 0 ? true : false,
    answered: q.answers.length > 0 ? true : false
  }))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-base font-medium">Loading questions…</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-4 text-destructive text-sm font-medium">
          Error loading questions: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              Reading
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Fill in the Blanks (Dropdown)</h1>
          <p className="mt-1 text-muted-foreground">Select the correct word from the dropdown to complete each blank.</p>
        </div>
        <FilterQuestions questions={filterQuestions ?? []} queryParams={queryParams} setQueryParams={setQueryParams} />
      </div>
    </div>
  )
}

export default ReadingFIBDropDown
