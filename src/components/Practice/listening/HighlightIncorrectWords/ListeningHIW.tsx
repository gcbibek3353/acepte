import React from 'react'
import PlayAudio from '../PlayAudio'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
            alert('Answer submitted successfully!');
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
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
                className={`cursor-pointer px-1 py-0.5 rounded transition-colors duration-200 ${
                    isWordSelected(index)
                        ? 'bg-red-200 text-red-800 border border-red-400'
                        : 'hover:bg-gray-200'
                }`}
            >
                {word}
            </span>
        ));
    };

    return (
       <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-8">
                <div className="text-lg leading-relaxed text-gray-800 flex flex-wrap gap-x-1 gap-y-1">
                    {renderPassage()}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => submitAnswer(answer)}
                    disabled={isSubmitting || answer.length === 0}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningHIW
