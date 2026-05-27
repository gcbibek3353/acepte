'use client';
import React, { useState } from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface OptionsData {
    id: string
    text: string
    isCorrect: boolean
    passageId: string
}

interface ListeningMCMProps {
    audioUrl: string
    questionText: string
    passageId: string
    options: OptionsData[]
}

const ListeningMCM = ({ audioUrl, questionText, passageId, options }: ListeningMCMProps) => {
    const [answers, setAnswers] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/multipleChoiceMultiple/${passageId}`;

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

    const handleOptionChange = (optionId: string) => {
        setAnswers(prev => {
            if (prev.includes(optionId)) {
                return prev.filter(id => id !== optionId);
            } else {
                return [...prev, optionId];
            }
        });
    };

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            <div className="rounded-lg border border-border bg-card shadow-sm p-6">
                <h3 className="text-base font-semibold text-foreground mb-4">{questionText}</h3>

                <div className="space-y-3">
                    {options.map((option) => (
                        <label
                            key={option.id}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                                answers.includes(option.id)
                                    ? 'border-primary/40 bg-primary/5'
                                    : 'border-border hover:bg-muted/50'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={answers.includes(option.id)}
                                onChange={() => handleOptionChange(option.id)}
                                className="mt-0.5 w-4 h-4 accent-primary rounded shrink-0"
                            />
                            <span className="text-sm text-foreground leading-relaxed">{option.text}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => submitAnswer(answers)}
                    disabled={isSubmitting || answers.length === 0}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningMCM
