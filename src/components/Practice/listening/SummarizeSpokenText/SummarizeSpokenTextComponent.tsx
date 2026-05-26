import React, { useEffect, useState } from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

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
        setWordCount(essay.trim() === '' ? 0 : words.length)
    }, [essay])

    const isUnder = wordCount < 50
    const isOver = wordCount > 70
    const isGood = wordCount >= 50 && wordCount <= 70

    const wordCountChip = cn(
        'text-xs font-semibold px-2.5 py-1 rounded-full border tabular-nums',
        isGood && 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        isUnder && wordCount > 0 && 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
        isOver && 'bg-red-50 text-destructive border-red-200 dark:bg-red-900/20 dark:border-red-800',
        wordCount === 0 && 'bg-muted text-muted-foreground border-border',
    )

    return (
        <div className="space-y-4">
            <PlayAudio audioUrl={audioUrl} />

            {/* Textarea */}
            <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                    <h3 className="text-sm font-semibold text-foreground">Your Summary</h3>
                    <span className="text-xs text-muted-foreground">50–70 words</span>
                </div>
                <textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    className="w-full h-72 p-4 focus:outline-none resize-none text-foreground text-sm leading-relaxed bg-card placeholder:text-muted-foreground"
                    placeholder="Start writing your summary here…"
                />
            </div>

            {/* Word count bar + submit */}
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-3">
                    <span className={wordCountChip}>
                        {wordCount} words
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {wordCount === 0
                            ? 'Start writing above'
                            : isGood
                            ? 'Perfect length!'
                            : isUnder
                            ? `${50 - wordCount} more word${50 - wordCount !== 1 ? 's' : ''} needed`
                            : `${wordCount - 70} word${wordCount - 70 !== 1 ? 's' : ''} over limit`}
                    </span>
                </div>

                <button
                    onClick={() => submitAnswer(essay)}
                    disabled={wordCount === 0 || isSubmitting}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Summary'}
                </button>
            </div>
        </div>
    )
}

export default SummarizeSpokenTextComponent
