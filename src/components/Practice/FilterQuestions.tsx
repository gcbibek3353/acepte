import Link from 'next/link';
import React from 'react'
import { FilterParams } from '@/hooks/useFilteredAPI';
import { usePathname } from 'next/navigation';

interface QuestionsProps {
    id: string;
    questionId: string;
    title: string;
    difficulty: string;
    bookmarked: boolean;
    answered: boolean;
}

interface FilterQuestionsProps {
    questions: QuestionsProps[],
    queryParams: FilterParams,
    setQueryParams: React.Dispatch<React.SetStateAction<FilterParams>>
}

const selectClass = "px-3 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"

const FilterQuestions = ({ questions, queryParams, setQueryParams }: FilterQuestionsProps) => {
    const pathname = usePathname();

    const handleDifficultyFilter = (difficulty: 'EASY' | 'MEDIUM' | 'HARD' | null) => {
        setQueryParams(prev => ({ ...prev, difficulty, page: 1 }));
    };

    const handleBookmarkFilter = (bookmarked: boolean | null) => {
        setQueryParams(prev => ({ ...prev, bookmarked, page: 1 }));
    };

    const handleAnsweredFilter = (answered: boolean | null) => {
        setQueryParams(prev => ({ ...prev, answered, page: 1 }));
    };

    const clearAllFilters = () => {
        setQueryParams({ page: 1, limit: 10, difficulty: null, bookmarked: null, answered: null });
    };

    const hasActiveFilters = queryParams.difficulty || queryParams.bookmarked !== null || queryParams.answered !== null;

    return (
        <div>
            {/* Filter bar */}
            <div className="rounded-lg border border-border bg-card p-4 mb-5 shadow-sm">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-foreground">Difficulty</label>
                        <select
                            value={queryParams.difficulty || ''}
                            onChange={(e) => {
                                const v = e.target.value;
                                handleDifficultyFilter(v ? (v as 'EASY' | 'MEDIUM' | 'HARD') : null);
                            }}
                            className={selectClass}
                        >
                            <option value="">All</option>
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-foreground">Bookmark</label>
                        <select
                            value={queryParams.bookmarked == null ? '' : queryParams.bookmarked.toString()}
                            onChange={(e) => handleBookmarkFilter(e.target.value === '' ? null : e.target.value === 'true')}
                            className={selectClass}
                        >
                            <option value="">All</option>
                            <option value="true">Bookmarked</option>
                            <option value="false">Not bookmarked</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-foreground">Status</label>
                        <select
                            value={queryParams.answered == null ? '' : queryParams.answered.toString()}
                            onChange={(e) => handleAnsweredFilter(e.target.value === '' ? null : e.target.value === 'true')}
                            className={selectClass}
                        >
                            <option value="">All</option>
                            <option value="true">Answered</option>
                            <option value="false">Unanswered</option>
                        </select>
                    </div>

                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* Question list */}
            {questions.length === 0 ? (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                    <p className="text-muted-foreground text-sm">No questions match the current filters.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {questions.map((question) => (
                        <Link key={question.id} href={`${pathname}/${question.id}`} className="block group">
                            <div className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 border-l-4 border-l-amber-500">
                                <div className="flex items-start justify-between gap-4">
                                    {/* Title + meta */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors leading-snug">
                                            {question.title}
                                        </h2>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs font-mono text-muted-foreground">
                                                #{question.questionId}
                                            </span>
                                            {question.bookmarked && (
                                                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                                    </svg>
                                                    Bookmarked
                                                </span>
                                            )}
                                            {question.answered && (
                                                <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Completed
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right badges */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {/* Bookmark icon */}
                                        {question.bookmarked ? (
                                            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                            </svg>
                                        )}

                                        {/* Answered icon */}
                                        {question.answered ? (
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}

                                        {/* Difficulty badge */}
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            question.difficulty === 'EASY'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : question.difficulty === 'MEDIUM'
                                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                            {question.difficulty.charAt(0) + question.difficulty.slice(1).toLowerCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilterQuestions
