import React, { useEffect, useState } from 'react'

const SummarizeTextArea = ({ textId, text }: { textId: string, text: string }) => {
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/summarizeWrittenText/${textId}`

    useEffect(() => {
        const words = essay.trim().split(/\s+/).filter(word => word.length > 0)
        setWordCount(words.length)
    }, [essay])

    const handleSubmit = async () => {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summarizedText: essay,
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
        }
    }

    return (
        <div>

        <div>
            {text}
        </div>

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
                    className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    Submit Essay
                </button>
            </div>
        </div>
    )
}

export default SummarizeTextArea