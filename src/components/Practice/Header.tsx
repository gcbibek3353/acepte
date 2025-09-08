import { userContext } from '@/app/(protected)/layout'
import React, { useContext, useEffect } from 'react'

interface BookMarkData {
    id: string
    userId: string
    questionId?: string
    passageId?: string
    createdAt: string
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
            setIsBookmarked(isUserBookmarked);
        }
    }, [bookmarks, user?.id]);

    const addBookmarkHandler = async () => {
        try {
            // console.log('Bookmarking question:', questionId);

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
        <div className="border-b border-gray-200 pb-6 mb-6">
            {/* Top section with question type and instruction */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{questionType}</h2>
                <p className="text-gray-600 text-sm">{instruction}</p>
            </div>

            {/* Main header section */}
            <div className="flex justify-between items-start">
                {/* Left side - Question details */}
                <div className="flex items-center gap-3 flex-1">
                    <span className="text-gray-500 text-sm font-medium">#{questionUniqueId}</span>
                    <span className="text-lg font-medium text-gray-800">{title}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        difficulty === 'medium' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {difficulty}
                    </span>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-3 ml-4">
                    <button onClick={addBookmarkHandler} className={`p-2 rounded-md transition-colors ${isBookmarked
                        ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                    </button>

                </div>
            </div>

            {/* Topic */}
            <div className="mb-6">
                <p className="text-gray-800 text-base leading-relaxed">
                    {description ? description : ""}
                </p>
            </div>
        </div>
    )
}

export default Header