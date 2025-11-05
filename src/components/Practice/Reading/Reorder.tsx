import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/reorder/${passageId}`

    // Fix for SSR hydration issues with react-beautiful-dnd
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Initialize with shuffled paragraphs
    useEffect(() => {
        if (paragraphs && paragraphs.length > 0) {
            // Shuffle the paragraphs to randomize initial order
            const shuffled = [...paragraphs].sort(() => Math.random() - 0.5);
            setOrderedParagraphs(shuffled);
            setAnswer(shuffled.map(p => p.id));
        }
    }, [paragraphs]);

    // Handle drag end
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(orderedParagraphs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setOrderedParagraphs(items);
        setAnswer(items.map(p => p.id));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAnswer: answer,
                })
            })
            const result = await response.json()

            if (result.success) {
                alert('Answer submitted and evaluated successfully!')
                console.log('Evaluation result:', result.data)
            } else {
                alert(`Error: ${result.message}`)
            }
        } catch (error) {
            console.error('Error submitting answer:', error)
            alert('Failed to submit answer. Please try again.')
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!paragraphs || paragraphs.length === 0) {
        return <div className="text-center text-gray-500">No paragraphs available</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Re-order Paragraphs
                </h2>

                {/* Only render DragDropContext after component is mounted */}
                {isMounted ? (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="paragraphs" isDropDisabled={false}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`space-y-4 min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                                        snapshot.isDraggingOver 
                                            ? 'border-blue-400 bg-blue-50' 
                                            : 'border-gray-300 bg-gray-50'
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
                                                    className={`p-4 bg-white border rounded-lg cursor-move transition-all duration-200 ${
                                                        snapshot.isDragging
                                                            ? 'shadow-lg border-blue-400 bg-blue-50 rotate-2'
                                                            : 'shadow-sm border-gray-300 hover:border-gray-400 hover:shadow-md'
                                                    }`}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                                                                {index + 1}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-gray-800 leading-relaxed">
                                                                {paragraph.text}
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0 text-gray-400">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
                                                                <path d="M4 6L2.59 7.41 7.17 12l-4.58 4.59L4 18l6-6-6-6z"/>
                                                            </svg>
                                                        </div>
                                                    </div>
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
                    // Show static content while mounting
                    <div className="space-y-4 min-h-[400px] p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                        {orderedParagraphs.map((paragraph, index) => (
                            <div
                                key={paragraph.id}
                                className="p-4 bg-white border border-gray-300 rounded-lg"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800 leading-relaxed">
                                            {paragraph.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Submit button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={answer.length === 0 || isSubmitting || !isMounted}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Reorder