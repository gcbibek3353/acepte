import React from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ListeningMCSProps {
    audioUrl: string
    questionText: string
    options: string[]
    passageId: string
}

const ListeningMCS = ({ audioUrl, questionText, options, passageId }: ListeningMCSProps) => {
    const [answerIndex, setAnswerIndex] = React.useState<number | null>(null);
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/multipleChoiceSingle/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (answerIdx: number) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answerIndex: answerIdx }),
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

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            <div className="rounded-lg border border-border bg-card shadow-sm p-6">
                <h3 className="text-base font-semibold text-foreground mb-5">{questionText}</h3>

                <div className="space-y-3">
                    {options.map((option, index) => (
                        <label
                            key={index}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                                answerIndex === index
                                    ? 'border-primary/40 bg-primary/5'
                                    : 'border-border hover:bg-muted/50'
                            }`}
                        >
                            <input
                                type="radio"
                                name="mcs-option"
                                checked={answerIndex === index}
                                onChange={() => setAnswerIndex(index)}
                                className="mt-0.5 w-4 h-4 accent-primary shrink-0"
                            />
                            <span className="text-sm text-foreground leading-relaxed">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => answerIndex !== null && submitAnswer(answerIndex)}
                    disabled={isSubmitting || answerIndex === null}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningMCS
