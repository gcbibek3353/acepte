"use client"
import FilterQuestions from '@/components/Practice/FilterQuestions'
import useFilteredAPI from '@/hooks/useFilteredAPI'
import React from 'react'

interface AnswerData {
  id: string
  userId: string
  passageId: string
  selectedOptionIndex: number
  totalScore: number
  createdAt: string
  updatedAt: string
}

interface BookMarkData {
  id: string
  userId: string
  passageId: string
  createdAt: string
}

interface TextQuestion {
  id: string;
  questionId: string;
  title: string;
  difficulty: string;
  bookmarks: BookMarkData[];
  answers: AnswerData[];
}

const HighlightCorrectSummaryPage = () => {
  const { data, loading, error, queryParams, setQueryParams } = useFilteredAPI<TextQuestion[]>('/api/v1/practice/listening/highlightCorrectSummary');
  
  const filterQuestions = data?.map((q) => ({
    id: q.id,
    questionId: q.questionId,
    title: q.title,
    difficulty: q.difficulty,
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
      <FilterQuestions questions={filterQuestions} queryParams={queryParams} setQueryParams={setQueryParams} />
    </div>
  )
}

export default HighlightCorrectSummaryPage;