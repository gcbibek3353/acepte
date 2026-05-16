import React from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ListeningHCSProps {
    audioUrl: string
    questionText: string
    options: string[]
    passageId: string
}

const ListeningHCS = ({ audioUrl, questionText, options, passageId }: ListeningHCSProps) => {
    const [answerIndex, setAnswerIndex] = React.useState<number | null>(null);
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/highlightCorrectSummary/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (answerIdx: number) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answerIndex: answerIdx }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            alert('Answer submitted successfully!');
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        },
    });

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            {/* Question Text */}
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">{questionText}</h3>

                {/* Options */}
                <div className="space-y-4">
                    {options.map((option, index) => (
                        <label
                            key={index}
                            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                            <input
                                type="radio"
                                name="summary-option"
                                checked={answerIndex === index}
                                onChange={() => setAnswerIndex(index)}
                                className="mt-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                            />
                            <span className="text-gray-800 leading-relaxed">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => answerIndex !== null && submitAnswer(answerIndex)}
                    disabled={isSubmitting || answerIndex === null}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningHCS
