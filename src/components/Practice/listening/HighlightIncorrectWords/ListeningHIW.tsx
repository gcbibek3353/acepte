'use client';
import React from 'react'
import { toast } from 'sonner'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface ListeningHIWProps {
    audioUrl: string
    passage: string
    passageId: string
}

interface SelectedWord {
    word: string
    position: number
}

const ListeningHIW = ({ audioUrl, passage, passageId }: ListeningHIWProps) => {
    const [answer, setAnswer] = React.useState<SelectedWord[]>([]);
    const queryClient = useQueryClient();
    const router = useRouter();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/highlightIncorrectWords/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (answers: SelectedWord[]) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            router.refresh();
            toast.success('Answer submitted successfully!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleWordClick = (word: string, position: number) => {
        setAnswer(prev => {
            const existingIndex = prev.findIndex(item => item.position === position);
            if (existingIndex !== -1) {
                return prev.filter(item => item.position !== position);
            } else {
                return [...prev, { word, position }];
            }
        });
    };

    const isWordSelected = (position: number) => {
        return answer.some(item => item.position === position);
    };

    const renderPassage = () => {
        const words = passage.split(/\s+/);
        return words.map((word, index) => (
            <span
                key={index}
                onClick={() => handleWordClick(word, index)}
                className={`cursor-pointer px-1 py-0.5 rounded transition-colors ${
                    isWordSelected(index)
                        ? 'bg-destructive/15 text-destructive border border-destructive/30'
                        : 'hover:bg-muted'
                }`}
            >
                {word}
            </span>
        ));
    };

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            <div className="rounded-lg border border-border bg-card shadow-sm p-8">
                <p className="text-xs text-muted-foreground mb-4">Click on words that differ from what the speaker said.</p>
                <div className="text-base leading-relaxed text-foreground flex flex-wrap gap-x-1 gap-y-1">
                    {renderPassage()}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    {answer.length} word{answer.length !== 1 ? 's' : ''} selected
                </span>
                <button
                    onClick={() => submitAnswer(answer)}
                    disabled={isSubmitting || answer.length === 0}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningHIW
