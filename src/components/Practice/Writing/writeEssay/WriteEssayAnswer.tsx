import React from 'react'

interface AnswerData {
    id: string
    userId: string
    questionId: string
    answer: string
    wordCount: number
    totalScore: number | null
    contentScore: number | null
    formScore: number | null
    grammerScore: number | null
    spellingScore: number | null
    vocabScore: number | null
    DSCScore: number | null
    GLRScore: number | null
    user: {
        id: string
        name: string
        email: string
    }
    createdAt: string
    updatedAt: string
}

interface WriteEssayAnswerProps {
    answers: AnswerData[]
    questionId: string
    questionTitle: string
}

const WriteEssayAnswer = ({ answers, questionId, questionTitle }: WriteEssayAnswerProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Essay Answers</h1>
                <p className="text-gray-600 mt-1">Question #{questionId}: {questionTitle}</p>
                <p className="text-sm text-gray-500 mt-1">{answers.length} answers submitted</p>
            </div>

            {/* Answers List */}
            <div className="space-y-6">
                {answers.map((answer) => (
                    <div key={answer.id} className="bg-white rounded-lg border shadow-sm p-6">
                        {/* User Info and Date */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {answer.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">{answer.user.name}</h3>
                                    <p className="text-sm text-gray-500">{answer.user.email}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                {formatDate(answer.createdAt)}
                            </div>
                        </div>

                        {/* AI Score Section */}
                        {answer.totalScore !== null && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-gray-800 mb-4">AI Score</h4>

                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Component</th>
                                                <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">Content</td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm text-center">{answer.contentScore || 0}/3</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">Form</td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm text-center">{answer.formScore || 0}/2</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">Grammar</td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm text-center">{answer.grammerScore || 0}/2</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">Spelling</td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm text-center">{answer.spellingScore || 0}/2</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">Vocabulary range</td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm text-center">{answer.vocabScore || 0}/2</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">General linguistic range</td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm text-center">{answer.GLRScore || 0}/2</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">Development, structure and coherence</td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm text-center">{answer.DSCScore || 0}/2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="text-gray-600">Max Score: 15, Your Score: </span>
                                        <span className="font-medium text-red-500">{answer.totalScore}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                                            Essay V2.0
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Essay Content */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-lg font-medium text-gray-800">Essay</h4>
                                <span className="text-sm text-gray-500">Word Count: {answer.wordCount}</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{answer.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {answers.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">📝</div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No answers yet</h3>
                    <p className="text-gray-500">Be the first to submit an answer for this question!</p>
                </div>
            )}
        </div>
    )
}

export default WriteEssayAnswer