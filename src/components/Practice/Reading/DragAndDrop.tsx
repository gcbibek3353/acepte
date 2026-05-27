'use client';
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface FibDragDropProps {
    passageId: string
    passage: string
    options: string[]
}

const FibDragDropComponent = ({ passageId, passage, options }: FibDragDropProps) => {
    const [answer, setAnswer] = useState<{ position: string, index: number }[]>([]);
    const [availableOptions, setAvailableOptions] = useState<string[]>([]);
    const [blankContents, setBlankContents] = useState<{ [key: string]: string }>({});
    const [isMounted, setIsMounted] = useState(false);
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [detailUrl] });
            router.refresh();
            alert('Answer submitted successfully!');
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
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

    const handleDragEnd = (result: DropResult) => {
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

    const renderPassageWithBlanks = () => {
        let modifiedPassage = passage;
        blankPositions.forEach(position => {
            modifiedPassage = modifiedPassage.replace(`{${position}}`, `<BLANK_${position}>`);
        });
        const parts = modifiedPassage.split(/(<BLANK_\d+>)/);

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
                                        className={`inline-block min-w-[110px] min-h-[36px] mx-1 px-3 py-1.5 border-2 border-dashed rounded-md transition-colors ${
                                            snapshot.isDraggingOver
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
                                                        className={`inline-block px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-sm rounded cursor-move font-medium ${
                                                            snapshot.isDragging ? 'opacity-60' : ''
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
                    return <span key={index}>{part}</span>;
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

                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Available words:</p>
                    <Droppable droppableId="options" direction="horizontal" isDropDisabled={false}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`flex flex-wrap gap-2 p-4 border-2 border-dashed rounded-lg min-h-[72px] transition-colors ${
                                    snapshot.isDraggingOver
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
                                                className={`px-3 py-1.5 bg-card border border-border rounded-md cursor-move text-sm text-foreground transition-all ${
                                                    snapshot.isDragging
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
            </DragDropContext>

            <div className="flex justify-end">
                <button
                    onClick={() => submitAnswer(answer)}
                    disabled={answer.length === 0 || isSubmitting}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : `Submit Answer (${answer.length} filled)`}
                </button>
            </div>
        </div>
    )
}

export default FibDragDropComponent
