import React, { useState } from 'react'

interface Options {
    id: string
    text: string
    isCorrect: boolean
    passageId: string
}

interface MCMProps {
    passageId: string
    passage: string
    options: Options[]
}

const ReadingMCMComponent = ({ passageId, passage, options }: MCMProps) => {
    const [answer, setAnswer] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/mcm/${passageId}`

    // Handle option selection (checkbox behavior for multiple selection)
    const handleOptionSelect = (optionId: string) => {
        setAnswer(prevAnswer => {
            if (prevAnswer.includes(optionId)) {
                // Remove if already selected
                return prevAnswer.filter(id => id !== optionId)
            } else {
                // Add if not selected
                return [...prevAnswer, optionId]
            }
        })
    }

    // Check if an option is selected
    const isOptionSelected = (optionId: string): boolean => {
        return answer.includes(optionId)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: answer,
                })
            })
            const result = await response.json()

            if (result.success) {
                alert('Answer submitted and evaluated successfully!')
                console.log('Evaluation result:', result.data)
            } else {
                alert(`Error: ${result.message}`)
            }
        } catch (error) {
            console.error('Error submitting answer:', error)
            alert('Failed to submit answer. Please try again.')
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Multiple Choice - Multiple Select
                </h2>

                {/* Passage */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                        {passage}
                    </div>
                </div>

                {/* Options */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Select all correct options:</h3>
                    <div className="space-y-3">
                        {options.map((option, index) => (
                            <div
                                key={option.id}
                                className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                    isOptionSelected(option.id)
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                                }`}
                                onClick={() => handleOptionSelect(option.id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={isOptionSelected(option.id)}
                                    onChange={() => handleOptionSelect(option.id)}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-600 mr-2">
                                        {String.fromCharCode(65 + index)}.
                                    </span>
                                    <span className="text-gray-800">{option.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={answer.length === 0 || isSubmitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isSubmitting ? 'Submitting...' : `Submit Answer (${answer.length} selected)`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReadingMCMComponent