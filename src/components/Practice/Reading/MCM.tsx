'use client';
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface Options {
    id: string
    text: string
    isCorrect: boolean
    passageId: string
}

interface MCMProps {
    passageId: string
    passage: string
    options: Options[]
}

const ReadingMCMComponent = ({ passageId, passage, options }: MCMProps) => {
    const [answer, setAnswer] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const router = useRouter();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/mcm/${passageId}`;

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
            setSubmittedAnswers(answer);
            setSubmitted(true);
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            router.refresh();
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        },
    });

    const handleOptionSelect = (optionId: string) => {
        if (submitted) return;
        setAnswer(prevAnswer => {
            if (prevAnswer.includes(optionId)) {
                return prevAnswer.filter(id => id !== optionId)
            } else {
                return [...prevAnswer, optionId]
            }
        })
    }

    const getOptionStyle = (option: Options) => {
        if (!submitted) {
            return answer.includes(option.id)
                ? 'border-primary/40 bg-primary/5'
                : 'border-border hover:bg-muted/50'
        }
        const wasSelected = submittedAnswers.includes(option.id);
        if (option.isCorrect) {
            return 'border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-800'
        }
        if (wasSelected) {
            return 'border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800'
        }
        return 'border-border'
    }

    return (
        <div className="space-y-6">
            <div className="bg-muted/30 border border-border rounded-lg p-6">
                <div className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                    {passage}
                </div>
            </div>

            <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Select all correct options:</p>
                <div className="space-y-3">
                    {options.map((option, index) => (
                        <label
                            key={option.id}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border transition-colors ${submitted ? 'cursor-default' : 'cursor-pointer'} ${getOptionStyle(option)}`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <input
                                type="checkbox"
                                checked={submitted ? submittedAnswers.includes(option.id) : answer.includes(option.id)}
                                onChange={() => handleOptionSelect(option.id)}
                                disabled={submitted}
                                className="mt-0.5 w-4 h-4 accent-primary rounded shrink-0"
                            />
                            <div className="flex-1 text-sm text-foreground leading-relaxed">
                                <span className="font-medium text-muted-foreground mr-1.5">
                                    {String.fromCharCode(65 + index)}.
                                </span>
                                {option.text}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => submitAnswer(answer)}
                    disabled={answer.length === 0 || isSubmitting || submitted}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : submitted ? 'Submitted' : `Submit Answer (${answer.length} selected)`}
                </button>
            </div>
        </div>
    )
}

export default ReadingMCMComponent
