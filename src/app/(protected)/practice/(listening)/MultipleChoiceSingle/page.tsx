"use client"
import FilterQuestions from '@/components/Practice/FilterQuestions'
import useFilteredAPI from '@/hooks/useFilteredAPI'
import { ListeningMcsListItem } from '@/types/listening'
import React from 'react'

const MultipleChoiceSinglePage = () => {
  const { data, loading, error, queryParams, setQueryParams } = useFilteredAPI<ListeningMcsListItem[]>('/api/v1/practice/listening/multipleChoiceSingle');

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
          Failed to load questions. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              Listening
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {filterQuestions?.length ?? 0} questions
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Multiple Choice (Single)</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Listen and select the single correct response.
          </p>
        </div>
        <FilterQuestions questions={filterQuestions ?? []} queryParams={queryParams} setQueryParams={setQueryParams} />
      </div>
    </div>
  )
}

export default MultipleChoiceSinglePage;
