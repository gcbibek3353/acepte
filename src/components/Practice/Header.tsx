import React from 'react'

type HeaderProps = {
    questionType: string;
    instruction: string;
    questionId: string;
    title: string;
    description: string;
    bookmarks: string[];
    difficulty: 'easy' | 'medium' | 'hard';
}

const Header = ({ questionType, instruction, questionId, title, description, bookmarks, difficulty }: HeaderProps) => {

    // TODO : check if the bookmarks include the current user and implement toggle functionality
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
                    <span className="text-gray-500 text-sm font-medium">#{questionId}</span>
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
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                    </button>
                    <span className="px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded">
                        Tested (410)
                    </span>
                </div>

                {/* Topic */}
                <div className="mb-6">
                    <p className="text-gray-800 text-base leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header