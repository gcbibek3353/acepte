import React, { useState } from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ListeningFIBProps {
    audioUrl: string
    passage: string
    passageId: string
}

const ListeningFIB = ({ audioUrl, passage, passageId }: ListeningFIBProps) => {
    const [answers, setAnswers] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/fillTheBlanks/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (ans: string[]) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer: ans }),
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

    const handleInputChange = (placeholder: string, value: string) => {
        const index = parseInt(placeholder) - 1;
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    const renderPassageWithInputs = () => {
        const placeholderRegex = /\{(\d+)\}/g;
        const parts = passage.split(placeholderRegex);

        return parts.map((part, index) => {
            if (index % 2 === 0) {
                return <span key={index}>{part}</span>;
            } else {
                const placeholderNum = part;
                const arrayIndex = parseInt(placeholderNum) - 1;
                return (
                    <input
                        key={index}
                        type="text"
                        value={answers[arrayIndex] || ''}
                        onChange={(e) => handleInputChange(placeholderNum, e.target.value)}
                        className="inline-block mx-1 px-3 py-1 border-b-2 border-teal-400 focus:border-teal-600 focus:outline-none bg-transparent text-gray-800 font-medium min-w-[120px] text-center"
                        placeholder={`Answer ${placeholderNum}`}
                    />
                );
            }
        });
    };

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            {/* Passage with Input Fields */}
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-8">
                <div className="text-lg leading-relaxed text-gray-800">
                    {renderPassageWithInputs()}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => submitAnswer(answers)}
                    disabled={isSubmitting || answers.filter(answer => answer && answer.trim()).length === 0}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningFIB
