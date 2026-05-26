import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const EssayTextArea = ({ essayId, onSubmitted }: { essayId: string, onSubmitted?: () => Promise<void> }) => {
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/writeEssay/${essayId}`;

    const { mutate: submitEssay, isPending: isSubmitting } = useMutation({
        mutationFn: async (text: string) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ essay: text }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: async () => {
            // keep existing invalidation for safety
            try {
                await queryClient.invalidateQueries({ queryKey: [detailUrl] });
            } catch (e) {
                // ignore
            }
            setEssay('');
            alert('Essay submitted and evaluated successfully!');
            if (onSubmitted) await onSubmitted();
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
        <div>
            <div className="mb-4">
                <textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    className="w-full h-96 p-4 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                    placeholder="Start writing your essay here..."
                />
            </div>

            {/* Word Count and Submit */}
            <div className="flex justify-between items-center">
                <span className="text-gray-600">
                    Word Count: {wordCount}
                </span>
                <button
                    onClick={() => submitEssay(essay)}
                    disabled={isSubmitting || wordCount === 0}
                    className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Essay'}
                </button>
            </div>
        </div>
    )
}

export default EssayTextArea
