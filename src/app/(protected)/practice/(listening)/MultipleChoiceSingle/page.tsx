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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading questions</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Write Essay Practice</h1>
      <FilterQuestions questions={filterQuestions ?? []} queryParams={queryParams} setQueryParams={setQueryParams} />
    </div>
  )
}

export default MultipleChoiceSinglePage;
