'use client';
import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import MeaningfulParagraph from '@/components/Dictionary/MeaningfulParagraph';

interface SummarizeScore {
    id: string
    userId: string
    questionId: string
    answer: string
    wordCount: number
    totalScore: number | null
    contentScore: number | null
    formScore: number | null
    grammerScore: number | null
    vocabScore: number | null
    createdAt: string
    updatedAt: string
}

const SummarizeTextArea = ({ textId, text }: { textId: string, text: string }) => {
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const [latestScore, setLatestScore] = useState<SummarizeScore | null>(null)
    const queryClient = useQueryClient();
    const router = useRouter();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/summarizeWrittenText/${textId}`;

    const { mutate: submitSummary, isPending: isSubmitting } = useMutation({
        mutationFn: async (summary: string) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ summarizedText: summary }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: (result) => {
            const evaluation = result?.data ?? null;
            if (evaluation) {
                setLatestScore(evaluation);
            }
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            setEssay('');
            alert('Summary submitted and evaluated successfully!');
            router.refresh();
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
        <div className="space-y-5">
            <div className="bg-muted/30 border border-border rounded-lg p-6">
                <MeaningfulParagraph paragraph={text} />
                {/* <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">{text}</p> */}
            </div>

            <textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                className="w-full h-40 p-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-none text-sm leading-relaxed"
                placeholder="Write your one-sentence summary here…"
            />

            {/* Word Count and Submit */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                        Word Count: {wordCount}
                    </span>
                    <button
                        onClick={() => submitSummary(essay)}
                        disabled={isSubmitting || wordCount === 0}
                        className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Essay'}
                    </button>
                </div>

                {latestScore && (
                    <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
                        <h3 className="text-lg font-semibold text-teal-900 mb-3">AI Score</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm text-teal-900">
                            <div className="rounded-lg bg-white p-3 shadow-sm border border-teal-100">
                                <span className="block text-xs uppercase tracking-wide text-teal-600">Total Score</span>
                                <span className="text-2xl font-bold">{latestScore.totalScore?.toFixed(1) ?? 'N/A'}</span>
                            </div>
                            <div className="rounded-lg bg-white p-3 shadow-sm border border-teal-100">
                                <span className="block text-xs uppercase tracking-wide text-teal-600">Word Count</span>
                                <span className="text-2xl font-bold">{latestScore.wordCount}</span>
                            </div>
                            <div className="rounded-lg bg-white p-3 shadow-sm border border-teal-100">
                                <span className="block text-xs uppercase tracking-wide text-teal-600">Content</span>
                                <span className="text-xl font-semibold">{latestScore.contentScore?.toFixed(1) ?? 'N/A'}</span>
                            </div>
                            <div className="rounded-lg bg-white p-3 shadow-sm border border-teal-100">
                                <span className="block text-xs uppercase tracking-wide text-teal-600">Form</span>
                                <span className="text-xl font-semibold">{latestScore.formScore?.toFixed(1) ?? 'N/A'}</span>
                            </div>
                            <div className="rounded-lg bg-white p-3 shadow-sm border border-teal-100">
                                <span className="block text-xs uppercase tracking-wide text-teal-600">Grammar</span>
                                <span className="text-xl font-semibold">{latestScore.grammerScore?.toFixed(1) ?? 'N/A'}</span>
                            </div>
                            <div className="rounded-lg bg-white p-3 shadow-sm border border-teal-100">
                                <span className="block text-xs uppercase tracking-wide text-teal-600">Vocabulary</span>
                                <span className="text-xl font-semibold">{latestScore.vocabScore?.toFixed(1) ?? 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SummarizeTextArea
