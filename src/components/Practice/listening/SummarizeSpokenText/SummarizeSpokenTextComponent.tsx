import React, { useEffect, useState } from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface SummarizeSpokenTextComponentProps {
    passageId: string;
    audioUrl: string;
}

const SummarizeSpokenTextComponent = ({ passageId, audioUrl }: SummarizeSpokenTextComponentProps) => {
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/summarizeSpokenText/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (text: string) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ summarizedText: text }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            setEssay('');
            alert('Summary submitted successfully!');
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        },
    });

    useEffect(() => {
        const words = essay.trim().split(/\s+/).filter(word => word.length > 0)
        setWordCount(words.length)
    }, [essay])

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            {/* Essay Textarea */}
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Your Summary</h3>
                </div>
                <textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    className="w-full h-96 p-6 focus:outline-none focus:ring-0 resize-none text-gray-800 leading-relaxed"
                    placeholder="Start writing your summary here... (Aim for 50-70 words)"
                />
            </div>

            {/* Word Count and Submit */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                    <span className={`text-lg font-semibold px-3 py-1 rounded-full ${wordCount >= 50 && wordCount <= 70
                        ? 'text-green-700 bg-green-100 border border-green-200'
                        : wordCount < 50
                            ? 'text-orange-700 bg-orange-100 border border-orange-200'
                            : 'text-red-700 bg-red-100 border border-red-200'
                        }`}>
                        Word Count: {wordCount}
                    </span>
                    <span className="text-sm text-gray-600">
                        {wordCount < 50 ? `${50 - wordCount} more words needed` :
                            wordCount > 70 ? `${wordCount - 70} words over limit` :
                                'Perfect word count!'}
                    </span>
                </div>
                <button
                    onClick={() => submitAnswer(essay)}
                    disabled={wordCount === 0 || isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Summary'}
                </button>
            </div>
        </div>
    )
}

export default SummarizeSpokenTextComponent
