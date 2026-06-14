'use client';
import { userContext } from '@/context/userContext'
import React, { useContext, useEffect } from 'react'
import MeaningfulParagraph from '../Dictionary/MeaningfulParagraph';

interface BookMarkData {
    id: string
    userId: string
    questionId?: string
    passageId?: string
    createdAt: Date | string
}

type HeaderProps = {
    questionType: string;
    instruction: string;
    questionUniqueId: string;
    bookMarkURL: string
    title: string;
    description?: string;
    bookmarks: BookMarkData[];
    difficulty: 'easy' | 'medium' | 'hard';
}

const Header = ({ questionType, instruction, bookMarkURL, questionUniqueId, title, description, bookmarks, difficulty }: HeaderProps) => {
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const user = useContext(userContext);

    useEffect(() => {
        if (user?.id) {
            const isUserBookmarked = bookmarks.some(bookmark => bookmark.userId === user.id);
            setIsBookmarked(isUserBookmarked);
        }
    }, [bookmarks, user?.id]);

    const addBookmarkHandler = async () => {
        try {
            const res = await fetch(bookMarkURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                const data = await res.json();
                alert(data.message);
                setIsBookmarked(!isBookmarked);
            } else {
                console.error('Failed to toggle bookmark');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-6">
            {/* Question type + instruction */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 mb-4">
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2.5">
                    <span className="inline-block w-1 h-5 rounded-full bg-primary shrink-0" />
                    {questionType}
                </h2>
                <p className="text-sm text-foreground/75 leading-relaxed border-l-4 border-primary/40 pl-3">
                    {instruction}
                </p>
            </div>

            {/* Question meta row */}
            <div className="flex justify-between items-center bg-card border border-border rounded-lg px-5 py-4 shadow-sm">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        #{questionUniqueId}
                    </span>
                    <span className="text-base font-semibold text-foreground">{title}</span>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${difficulty === 'easy'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : difficulty === 'medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                        {difficulty}
                    </span>
                </div>

                <button
                    onClick={addBookmarkHandler}
                    title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    className={`p-2 rounded-md transition-all duration-200 border ${isBookmarked
                        ? 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400'
                        : 'text-muted-foreground bg-card border-border hover:text-foreground hover:bg-muted'
                        }`}
                >
                    <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isBookmarked ? 0 : 1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                </button>
            </div>

            {/* Optional description */}
            {description && (
                <div className="mt-4 rounded-lg border border-border bg-muted/50 px-5 py-4">
                    <MeaningfulParagraph paragraph={description} />
                    {/* <p className="text-foreground text-sm leading-relaxed">{description}</p> */}
                </div>
            )}
        </div>
    )
}

export default Header
