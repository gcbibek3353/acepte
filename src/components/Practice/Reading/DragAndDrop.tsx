import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
            const placeholder = `{${position}}`;
            const blankElement = `<BLANK_${position}>`;
            modifiedPassage = modifiedPassage.replace(placeholder, blankElement);
        });

        const parts = modifiedPassage.split(/(<BLANK_\d+>)/);

        return (
            <div className="text-lg leading-relaxed">
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
                                        className={`inline-block min-w-[120px] min-h-[40px] mx-1 px-3 py-2 border-2 border-dashed rounded-lg transition-colors ${
                                            snapshot.isDraggingOver
                                                ? 'border-blue-400 bg-blue-50'
                                                : content
                                                    ? 'border-green-400 bg-green-50'
                                                    : 'border-gray-300 bg-gray-50'
                                        }`}
                                    >
                                        {content && (
                                            <Draggable draggableId={`blank-${position}-${content}`} index={0} isDragDisabled={false}>
                                                {(provided, snapshot) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`inline-block px-2 py-1 bg-blue-100 border border-blue-300 rounded cursor-move ${
                                                            snapshot.isDragging ? 'opacity-50' : ''
                                                        }`}
                                                    >
                                                        {content}
                                                    </span>
                                                )}
                                            </Draggable>
                                        )}
                                        {!content && (
                                            <span className="text-gray-400 text-sm">Drop here</span>
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
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Fill in the Blanks - Drag and Drop
                </h2>

                <DragDropContext onDragEnd={handleDragEnd}>
                    {/* Passage with droppable blanks */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                        {renderPassageWithBlanks()}
                    </div>

                    {/* Available options */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Words:</h3>
                        <Droppable droppableId="options" direction="horizontal" isDropDisabled={false}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-wrap gap-3 p-4 border-2 border-dashed rounded-lg min-h-[100px] transition-colors ${
                                        snapshot.isDraggingOver
                                            ? 'border-blue-400 bg-blue-50'
                                            : 'border-gray-300 bg-gray-50'
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
                                                    className={`px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-move transition-all duration-200 ${
                                                        snapshot.isDragging
                                                            ? 'shadow-lg opacity-50 rotate-2'
                                                            : 'hover:shadow-md hover:border-gray-400'
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

                {/* Submit button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => submitAnswer(answer)}
                        disabled={answer.length === 0 || isSubmitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isSubmitting ? 'Submitting...' : `Submit Answer (${answer.length} filled)`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FibDragDropComponent
