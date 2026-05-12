import { userContext } from '@/app/(protected)/layout'
import React, { useContext, useEffect } from 'react'

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

    // Check if current user has bookmarked this question
    useEffect(() => {
        if (user?.id) {
            const isUserBookmarked = bookmarks.some(bookmark => bookmark.userId === user.id);
            console.log(bookmarks);
            console.log(user.id);

            setIsBookmarked(isUserBookmarked);
        }
    }, [bookmarks, user?.id]);

    const addBookmarkHandler = async () => {
        try {
            const res = await fetch(bookMarkURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const data = await res.json();
                alert(data.message)
                setIsBookmarked(!isBookmarked);
            } else {
                console.error('Failed to toggle bookmark');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white border-b border-gray-200 pb-8 mb-8 shadow-sm">
            {/* Top section with question type and instruction */}
            <div className="mb-6 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border border-teal-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                    <div className="w-2 h-8 bg-teal-500 rounded-full mr-3"></div>
                    {questionType}
                </h2>
                <p className="text-gray-700 text-base leading-relaxed bg-white/60 p-4 rounded-md border-l-4 border-teal-400">{instruction}</p>
            </div>

            {/* Main header section */}
            <div className="flex justify-between items-start bg-gray-50 p-5 rounded-lg border border-gray-200">
                {/* Left side - Question details */}
                <div className="flex items-center gap-4 flex-1">
                    <span className="text-teal-600 text-sm font-semibold bg-teal-100 px-3 py-1 rounded-full">#{questionUniqueId}</span>
                    <span className="text-xl font-semibold text-gray-800">{title}</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize shadow-sm ${difficulty === 'easy' ? 'bg-green-100 text-green-700 border border-green-200' :
                        difficulty === 'medium' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                            'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                        {difficulty}
                    </span>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-3 ml-4">
                    <button
                        onClick={addBookmarkHandler}
                        className={`p-3 rounded-lg transition-all duration-200 shadow-sm ${isBookmarked
                            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 scale-105'
                            : 'text-gray-400 bg-white hover:text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Topic */}
            {description && (
                <div className="mt-6 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-lg border border-gray-200">
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            )}
        </div>
    )
}

export default Header