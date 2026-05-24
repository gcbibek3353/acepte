import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Paragraph {
    id: string
    text: string
    correctOrder: number
    passageId: string
}

interface ReorderProps {
    passageId: string
    paragraphs: Paragraph[]
}

const Reorder = ({ passageId, paragraphs }: ReorderProps) => {
    const [answer, setAnswer] = useState<string[]>([]);
    const [orderedParagraphs, setOrderedParagraphs] = useState<Paragraph[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const queryClient = useQueryClient();

    const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/reorder/${passageId}`;

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: async (userAnswer: string[]) => {
            const response = await fetch(detailUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userAnswer }),
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (paragraphs && paragraphs.length > 0) {
            const shuffled = [...paragraphs].sort(() => Math.random() - 0.5);
            setOrderedParagraphs(shuffled);
            setAnswer(shuffled.map(p => p.id));
        }
    }, [paragraphs]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(orderedParagraphs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setOrderedParagraphs(items);
        setAnswer(items.map(p => p.id));
    };

    if (!paragraphs || paragraphs.length === 0) {
        return <p className="text-center text-muted-foreground text-sm">No paragraphs available.</p>
    }

    const ParagraphCard = ({ paragraph, index }: { paragraph: Paragraph; index: number }) => (
        <div className="flex items-start gap-3">
            <div className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                {index + 1}
            </div>
            <p className="flex-1 text-sm text-foreground leading-relaxed pt-0.5">
                {paragraph.text}
            </p>
            <svg className="shrink-0 w-4 h-4 text-muted-foreground mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
        </div>
    );

    return (
        <div className="space-y-6">
            {isMounted ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="paragraphs" isDropDisabled={false}>
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`space-y-3 min-h-[300px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                                    snapshot.isDraggingOver
                                        ? 'border-primary/50 bg-primary/5'
                                        : 'border-border bg-muted/20'
                                }`}
                            >
                                {orderedParagraphs.map((paragraph, index) => (
                                    <Draggable
                                        key={paragraph.id}
                                        draggableId={paragraph.id}
                                        index={index}
                                        isDragDisabled={false}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`p-4 bg-card border rounded-lg cursor-move transition-all ${
                                                    snapshot.isDragging
                                                        ? 'shadow-md border-primary/40 bg-primary/5 rotate-1'
                                                        : 'shadow-sm border-border hover:border-primary/30 hover:shadow-md'
                                                }`}
                                            >
                                                <ParagraphCard paragraph={paragraph} index={index} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <div className="space-y-3 min-h-[300px] p-4 rounded-lg border-2 border-dashed border-border bg-muted/20">
                    {orderedParagraphs.map((paragraph, index) => (
                        <div key={paragraph.id} className="p-4 bg-card border border-border rounded-lg shadow-sm">
                            <ParagraphCard paragraph={paragraph} index={index} />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={() => submitAnswer(answer)}
                    disabled={answer.length === 0 || isSubmitting || !isMounted}
                    className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default Reorder
