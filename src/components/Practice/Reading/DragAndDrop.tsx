'use client';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import MeaningfulParagraph from '@/components/Dictionary/MeaningfulParagraph'

interface FibDragDropProps {
    passageId: string
    passage: string
    options: string[]
    blanks: { position: number; correctOptionIndex: number; explanation?: string | null }[]
}

const FibDragDropComponent = ({ passageId, passage, options, blanks }: FibDragDropProps) => {
    const [answer, setAnswer] = useState<{ position: string, index: number }[]>([]);
    const [availableOptions, setAvailableOptions] = useState<string[]>([]);
    const [blankContents, setBlankContents] = useState<{ [key: string]: string }>({});
    const [isMounted, setIsMounted] = useState(false);
    const [submittedResult, setSubmittedResult] = useState<Record<string, boolean> | null>(null);
    const [activeExplanation, setActiveExplanation] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const router = useRouter();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDragDrop/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (ans: typeof answer) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer: ans }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: (_, submittedAnswer) => {
            const results: Record<string, boolean> = {};
            submittedAnswer.forEach(userAnswer => {
                const blank = blanks.find(b => b.position.toString() === userAnswer.position);
                if (blank) {
                    results[userAnswer.position] = blank.correctOptionIndex === userAnswer.index;
                }
            });
            setSubmittedResult(results);
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        setIsMounted(true);
        setAvailableOptions([...options]);
    }, [options]);

    const getBlankPositions = () => {
        const matches = passage.match(/\{(\d+)\}/g);
        return matches ? matches.map(match => match.replace(/[{}]/g, '')) : [];
    };

    const blankPositions = getBlankPositions();

    const getCorrectWord = (position: string) => {
        const blank = blanks.find(b => b.position.toString() === position);
        return blank ? (options[blank.correctOptionIndex] ?? '') : '';
    };

    const handleDragEnd = (result: DropResult) => {
        if (submittedResult) return;
        const { source, destination } = result;
        if (!destination) return;

        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const draggedItem = sourceId === 'options'
            ? availableOptions[source.index]
            : blankContents[sourceId];

        if (destinationId !== 'options' && blankPositions.includes(destinationId)) {
            const position = destinationId;
            const optionIndex = options.indexOf(draggedItem);

            if (sourceId === 'options') {
                const newAvailableOptions = [...availableOptions];
                newAvailableOptions.splice(source.index, 1);
                setAvailableOptions(newAvailableOptions);
            } else if (blankPositions.includes(sourceId)) {
                setBlankContents(prev => ({ ...prev, [sourceId]: '' }));
                setAnswer(prev => prev.filter(ans => ans.position !== sourceId));
            }

            if (blankContents[position]) {
                setAvailableOptions(prev => [...prev, blankContents[position]]);
                setAnswer(prev => prev.filter(ans => ans.position !== position));
            }

            setBlankContents(prev => ({ ...prev, [position]: draggedItem }));
            setAnswer(prev => {
                const filtered = prev.filter(ans => ans.position !== position);
                return [...filtered, { position, index: optionIndex }];
            });
        }

        if (destinationId === 'options') {
            if (blankPositions.includes(sourceId)) {
                setBlankContents(prev => ({ ...prev, [sourceId]: '' }));
                setAnswer(prev => prev.filter(ans => ans.position !== sourceId));
                const newAvailableOptions = [...availableOptions];
                newAvailableOptions.splice(destination.index, 0, draggedItem);
                setAvailableOptions(newAvailableOptions);
            }
        }
    };

    const correctCount = submittedResult
        ? Object.values(submittedResult).filter(Boolean).length
        : 0;

    const renderPassageWithBlanks = () => {
        let modifiedPassage = passage;
        blankPositions.forEach(position => {
            modifiedPassage = modifiedPassage.replace(`{${position}}`, `<BLANK_${position}>`);
        });
        const parts = modifiedPassage.split(/(<BLANK_\d+>)/);

        if (submittedResult) {
            return (
                <div className="text-base leading-relaxed text-foreground">
                    {parts.map((part, index) => {
                        const blankMatch = part.match(/<BLANK_(\d+)>/);
                        if (blankMatch) {
                            const position = blankMatch[1];
                            const content = blankContents[position];
                            const isCorrect = submittedResult[position];
                            const correctWord = getCorrectWord(position);
                            return (
                                <span key={`blank-${position}`} className="inline-flex items-center gap-1.5 mx-1 align-middle">
                                    <span className={`inline-block min-w-[110px] min-h-[36px] px-3 py-1.5 border-2 rounded-md ${content
                                        ? isCorrect
                                            ? 'border-green-400 bg-green-50 dark:bg-green-950/20'
                                            : 'border-red-400 bg-red-50 dark:bg-red-950/20'
                                        : 'border-border bg-muted/30'
                                        }`}>
                                        {content ? (
                                            <span className={`inline-block px-2 py-0.5 border text-sm rounded font-medium ${isCorrect
                                                ? 'bg-green-100 border-green-400 text-green-800 dark:bg-green-950/30 dark:text-green-300'
                                                : 'bg-red-100 border-red-400 text-red-800 dark:bg-red-950/30 dark:text-red-300'
                                                }`}>
                                                {content}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">—</span>
                                        )}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                                        correct: <span className="font-medium text-foreground">&ldquo;{correctWord}&rdquo;</span>
                                        <span className="relative inline-flex items-center group/tip">
                                            <button
                                                onClick={() => setActiveExplanation(position)}
                                                className="w-4 h-4 rounded-full bg-muted border border-border text-muted-foreground text-[9px] font-bold hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center leading-none"
                                            >
                                                ?
                                            </button>
                                            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-[10px] text-background opacity-0 transition-opacity group-hover/tip:opacity-100 z-10">
                                                AI Explanation
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            );
                        }
                        return <MeaningfulParagraph key={index} paragraph={part} inline />;
                    })}
                </div>
            );
        }

        return (
            <div className="text-base leading-relaxed text-foreground">
                {parts.map((part, index) => {
                    const blankMatch = part.match(/<BLANK_(\d+)>/);
                    if (blankMatch) {
                        const position = blankMatch[1];
                        const content = blankContents[position];
                        return (
                            <Droppable key={`blank-${position}`} droppableId={position} isDropDisabled={false}>
                                {(provided, snapshot) => (
                                    <span
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`inline-block min-w-[110px] min-h-[36px] mx-1 px-3 py-1.5 border-2 border-dashed rounded-md transition-colors ${snapshot.isDraggingOver
                                            ? 'border-primary/50 bg-primary/5'
                                            : content
                                                ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20'
                                                : 'border-border bg-muted/30'
                                            }`}
                                    >
                                        {content && (
                                            <Draggable draggableId={`blank-${position}-${content}`} index={0} isDragDisabled={false}>
                                                {(provided, snapshot) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`inline-block px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-sm rounded cursor-move font-medium ${snapshot.isDragging ? 'opacity-60' : ''
                                                            }`}
                                                    >
                                                        {content}
                                                    </span>
                                                )}
                                            </Draggable>
                                        )}
                                        {!content && (
                                            <span className="text-muted-foreground text-xs">drop here</span>
                                        )}
                                        {provided.placeholder}
                                    </span>
                                )}
                            </Droppable>
                        );
                    }
                    return <MeaningfulParagraph key={index} paragraph={part} inline />;
                })}
            </div>
        );
    };

    if (!isMounted) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading…
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="bg-muted/30 border border-border rounded-lg p-6">
                    {renderPassageWithBlanks()}
                </div>

                {!submittedResult && (
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Available words:</p>
                        <Droppable droppableId="options" direction="horizontal" isDropDisabled={false}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-wrap gap-2 p-4 border-2 border-dashed rounded-lg min-h-[72px] transition-colors ${snapshot.isDraggingOver
                                        ? 'border-primary/50 bg-primary/5'
                                        : 'border-border bg-muted/20'
                                        }`}
                                >
                                    {availableOptions.map((option, index) => (
                                        <Draggable
                                            key={`option-${option}-${index}`}
                                            draggableId={`option-${option}-${index}`}
                                            index={index}
                                            isDragDisabled={false}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`px-3 py-1.5 bg-card border border-border rounded-md cursor-move text-sm text-foreground transition-all ${snapshot.isDragging
                                                        ? 'shadow-md opacity-60 border-primary/40'
                                                        : 'hover:border-primary/40 hover:shadow-sm'
                                                        }`}
                                                >
                                                    {option}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </DragDropContext>

            {submittedResult ? (
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-5 py-3">
                    <p className="text-sm text-muted-foreground">
                        Score: <span className="font-semibold text-foreground">{correctCount} / {Object.keys(submittedResult).length}</span> correct
                    </p>
                    <div className="flex gap-3 text-sm">
                        <span className="font-medium text-green-600 dark:text-green-400">{correctCount} correct</span>
                        <span className="font-medium text-destructive">{Object.keys(submittedResult).length - correctCount} incorrect</span>
                    </div>
                </div>
            ) : (
                <div className="flex justify-end">
                    <button
                        onClick={() => submitAnswer(answer)}
                        disabled={answer.length === 0 || isSubmitting}
                        className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isSubmitting ? 'Submitting…' : `Submit Answer (${answer.length} filled)`}
                    </button>
                </div>
            )}

            {/* AI Explanation bottom popup */}
            {activeExplanation !== null && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={() => setActiveExplanation(null)}
                    />
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-xl shadow-lg">
                        <div className="mx-auto max-w-2xl px-6 py-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold">AI</span>
                                    <h3 className="text-base font-semibold text-foreground">AI Explanation</h3>
                                </div>
                                <button
                                    onClick={() => setActiveExplanation(null)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">
                                    Correct answer: <span className="text-primary">&ldquo;{getCorrectWord(activeExplanation)}&rdquo;</span>
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {blanks.find(b => b.position.toString() === activeExplanation)?.explanation ?? 'No explanation available for this blank yet.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default FibDragDropComponent
