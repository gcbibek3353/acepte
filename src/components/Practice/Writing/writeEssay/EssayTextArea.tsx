'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const EssayTextArea = ({ essayId, onSubmitted }: { essayId: string, onSubmitted?: () => Promise<void> }) => {
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const queryClient = useQueryClient();
    const router = useRouter();

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
            toast.success('Essay submitted and evaluated successfully!');
            router.refresh();
            if (onSubmitted) await onSubmitted();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        const words = essay.trim().split(/\s+/).filter(word => word.length > 0)
        setWordCount(words.length)
    }, [essay])

    return (
        <div className="space-y-4">
            <textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                className="w-full h-96 p-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-none text-sm leading-relaxed"
                placeholder="Start writing your essay here…"
            />

            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                    Word count: {wordCount}
                </span>
                <button
                    onClick={() => submitEssay(essay)}
                    disabled={isSubmitting || wordCount === 0}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Essay'}
                </button>
            </div>
        </div>
    )
}

export default EssayTextArea
