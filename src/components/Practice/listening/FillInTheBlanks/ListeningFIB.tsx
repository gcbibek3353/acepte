'use client';
import React, { useState } from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ListeningFIBProps {
    audioUrl: string
    passage: string
    passageId: string
}

const ListeningFIB = ({ audioUrl, passage, passageId }: ListeningFIBProps) => {
    const [answers, setAnswers] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/fillTheBlanks/${passageId}`;

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

    const handleInputChange = (placeholder: string, value: string) => {
        const index = parseInt(placeholder) - 1;
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    const renderPassageWithInputs = () => {
        const placeholderRegex = /\{(\d+)\}/g;
        const parts = passage.split(placeholderRegex);

        return parts.map((part, index) => {
            if (index % 2 === 0) {
                return <span key={index}>{part}</span>;
            } else {
                const placeholderNum = part;
                const arrayIndex = parseInt(placeholderNum) - 1;
                return (
                    <input
                        key={index}
                        type="text"
                        value={answers[arrayIndex] || ''}
                        onChange={(e) => handleInputChange(placeholderNum, e.target.value)}
                        className="inline-block mx-1 px-2 py-0.5 border-b-2 border-amber-400 focus:border-primary focus:outline-none bg-transparent text-foreground font-medium min-w-[120px] text-center transition-colors"
                        placeholder={`Answer ${placeholderNum}`}
                    />
                );
            }
        });
    };

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            <div className="rounded-lg border border-border bg-card shadow-sm p-8">
                <div className="text-base leading-relaxed text-foreground">
                    {renderPassageWithInputs()}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => submitAnswer(answers)}
                    disabled={isSubmitting || answers.filter(answer => answer && answer.trim()).length === 0}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningFIB
