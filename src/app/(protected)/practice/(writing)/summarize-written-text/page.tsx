'use client'
import FilterQuestions from '@/components/Practice/FilterQuestions'
import useFilteredAPI from '@/hooks/useFilteredAPI'
import { SummarizeWrittenTextListItem } from '@/types/writing'
import React from 'react'

const SummarizeWrittenTextPage = () => {
  const { data, loading, error, queryParams, setQueryParams } = useFilteredAPI<SummarizeWrittenTextListItem[]>('/api/v1/practice/writing/summarizeWrittenText');

  const filterQuestions = data?.map((q) => ({
    id: q.id,
    questionId: q.questionId,
    title: q.textTitle,
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
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              Writing
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Summarize Written Text</h1>
          <p className="mt-1 text-muted-foreground">Read the passage and summarize it in one sentence.</p>
        </div>
        <FilterQuestions questions={filterQuestions ?? []} queryParams={queryParams} setQueryParams={setQueryParams} />
      </div>
    </div>
  )
}

export default SummarizeWrittenTextPage
