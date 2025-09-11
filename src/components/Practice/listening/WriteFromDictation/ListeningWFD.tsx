import React, { useEffect, useState } from 'react'
import PlayAudio from '../PlayAudio'

interface ListeningWFDProps {
    audioUrl: string
    passageId: string
}

const ListeningWFD = ({ audioUrl, passageId }: ListeningWFDProps) => {
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/writeFromDictation/${passageId}`;

    useEffect(() => {
        const words = essay.trim().split(/\s+/).filter(word => word.length > 0)
        setWordCount(words.length)
    }, [essay])

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: essay,
                })
            })

            const result = await response.json()

            if (result.success) {
                alert('Essay submitted and evaluated successfully!')
                console.log('Evaluation result:', result.data)
                setEssay('')
            } else {
                alert(`Error: ${result.message}`)
            }
        } catch (error) {
            console.error('Error submitting essay:', error)
            alert('Failed to submit essay. Please try again.')
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>

            <PlayAudio audioUrl={audioUrl} />

            <div className="mb-4">
                <textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    className="w-full h-96 p-4 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                    placeholder="Start writing your essay here..."
                />
            </div>

            {/* Word Count and Submit */}
            <div className="flex justify-between items-center">
                <span className="text-gray-600">
                    Word Count: {wordCount}
                </span>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || wordCount === 0}
                    className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningWFD