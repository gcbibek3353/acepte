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
        <div className="space-y-4">
            <PlayAudio audioUrl={audioUrl} />

            <textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                className="w-full h-32 p-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-none text-sm leading-relaxed"
                placeholder="Type the sentence you heard…"
            />

            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                    Word count: {wordCount}
                </span>
                <button
                    onClick={() => submitAnswer(essay)}
                    disabled={isSubmitting || wordCount === 0}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningWFD
