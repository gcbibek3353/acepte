import React, { useEffect, useState } from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ListeningWFDProps {
    audioUrl: string
    passageId: string
}

const ListeningWFD = ({ audioUrl, passageId }: ListeningWFDProps) => {
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/writeFromDictation/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (text: string) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer: text }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            setEssay('');
            alert('Answer submitted successfully!');
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
            <PlayAudio audioUrl={audioUrl} />

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
                    onClick={() => submitAnswer(essay)}
                    disabled={isSubmitting || wordCount === 0}
                    className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningWFD
