import Link from 'next/link';
import React from 'react'
import { FilterParams } from '@/hooks/useFilteredAPI';

interface QuestionsProps {
    id: string;
    questionId: string;
    title: string;
    difficulty: string;
    bookmarked: boolean;
    answered: boolean;
}

// interface FilterParams {
//     page?: number;
//     limit?: number;
//     difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | null;
//     bookmarked?: boolean | null;
//     answered?: boolean | null;
// }

interface FilterQuestionsProps {
    questions: QuestionsProps[],
    queryParams: FilterParams,
    setQueryParams: React.Dispatch<React.SetStateAction<FilterParams>>
}

const FilterQuestions = ({ questions, queryParams, setQueryParams }: FilterQuestionsProps) => {
    // Filter handlers
    const handleDifficultyFilter = (difficulty: 'EASY' | 'MEDIUM' | 'HARD' | null) => {
        setQueryParams(prev => ({
            ...prev,
            difficulty,
            page: 1 // Reset to first page when filtering
        }));
    };

    const handleBookmarkFilter = (bookmarked: boolean | null) => {
        setQueryParams(prev => ({
            ...prev,
            bookmarked,
            page: 1
        }));
    };

    const handleAnsweredFilter = (answered: boolean | null) => {
        setQueryParams(prev => ({
            ...prev,
            answered,
            page: 1
        }));
    };

    const clearAllFilters = () => {
        setQueryParams({
            page: 1,
            limit: 10,
            difficulty: null,
            bookmarked: null,
            answered: null
        });
    };

  return (
    <div>
        {/* Filter Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
                {/* Difficulty Filter */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Difficulty:</label>
                    <select
                        value={queryParams.difficulty || ''}
                        onChange={(e) => handleDifficultyFilter(e.target.value || null)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                    </select>
                </div>

                {/* Bookmark Filter */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Bookmark:</label>
                    <select
                        value={queryParams.bookmarked === null ? '' : queryParams.bookmarked.toString()}
                        onChange={(e) => handleBookmarkFilter(e.target.value === '' ? null : e.target.value === 'true')}
                        className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        <option value="true">Bookmarked</option>
                        <option value="false">Not Bookmarked</option>
                    </select>
                </div>

                {/* Answered Filter */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Status:</label>
                    <select
                        value={queryParams.answered === null ? '' : queryParams.answered.toString()}
                        onChange={(e) => handleAnsweredFilter(e.target.value === '' ? null : e.target.value === 'true')}
                        className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        <option value="true">Answered</option>
                        <option value="false">Unanswered</option>
                    </select>
                </div>

                {/* Clear Filters Button */}
                <button
                    onClick={clearAllFilters}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                    Clear
                </button>
            </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
            {questions?.map((question) => (
                <Link
                    key={question.id}
                    href={`/practice/write_essay/${question.id}`}
                    className="block"
                >
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                            <h2 className="text-xl font-semibold text-gray-800 flex-1">
                                {question.title}
                            </h2>
                            <div className="flex items-center space-x-3 ml-4">
                                {/* Status indicators */}
                                <div className="flex items-center space-x-2">
                                    {/* Bookmark indicator */}
                                    <div className="flex items-center">
                                        {question.bookmarked ? (
                                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                            </svg>
                                        )}
                                    </div>
                                    
                                    {/* Answered indicator */}
                                    <div className="flex items-center">
                                        {question.answered ? (
                                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Difficulty badge */}
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                                    question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {question.difficulty}
                                </span>

                                {/* Question ID */}
                                <span className="text-sm text-gray-500 font-mono">
                                    {question.questionId}
                                </span>
                            </div>
                        </div>

                        {/* Status text indicators (optional) */}
                        <div className="flex items-center space-x-4 mt-3">
                            {question.bookmarked && (
                                <span className="text-xs text-yellow-600 font-medium flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                    Bookmarked
                                </span>
                            )}
                            {question.answered && (
                                <span className="text-xs text-green-600 font-medium flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
)

}

export default FilterQuestions