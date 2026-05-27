'use client';
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface MCSProps {
    passageId: string
    passage: string
    options: string[]
}

const MCS = ({ passageId, passage, options }: MCSProps) => {
    const [answer, setAnswer] = useState<number | null>(null);
    const queryClient = useQueryClient();
    const router = useRouter();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/mcs/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (correctOptionIndex: number) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correctOptionIndex }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            router.refresh();
            alert('Answer submitted successfully!');
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        },
    });

    return (
        <div className="space-y-6">
            <div className="bg-muted/30 border border-border rounded-lg p-6">
                <div className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                    {passage}
                </div>
            </div>

            <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Select the correct option:</p>
                <div className="space-y-3">
                    {options.map((option, index) => (
                        <label
                            key={index}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                                answer === index
                                    ? 'border-primary/40 bg-primary/5'
                                    : 'border-border hover:bg-muted/50'
                            }`}
                            onClick={() => setAnswer(index)}
                        >
                            <input
                                type="radio"
                                name="mcs-option"
                                checked={answer === index}
                                onChange={() => setAnswer(index)}
                                className="mt-0.5 w-4 h-4 accent-primary shrink-0"
                            />
                            <div className="flex-1 text-sm text-foreground leading-relaxed">
                                <span className="font-medium text-muted-foreground mr-1.5">
                                    {String.fromCharCode(65 + index)}.
                                </span>
                                {option}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => answer !== null && submitAnswer(answer)}
                    disabled={answer === null || isSubmitting}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default MCS
