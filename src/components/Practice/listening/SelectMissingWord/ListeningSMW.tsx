import React from 'react'
import PlayAudio from '../PlayAudio'

interface ListeningSMWProps {
    audioUrl: string
    instruction: string
    options: string[]
    passageId: string
}

const ListeningSMW = ({ audioUrl, instruction, options, passageId }: ListeningSMWProps) => {
    const [answerIndex, setAnswerIndex] = React.useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/selectMissingWord/${passageId}`

    const handlSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answerIndex: answerIndex,
                })
            })
            const result = await response.json()

            if (result.success) {
                alert('Essay submitted and evaluated successfully!')
                console.log('Evaluation result:', result.data)
            } else {
                alert(`Error: ${result.message}`)
            }
        } catch (error) {
            console.error('Error submitting answer:', error)
            alert('Failed to submit answer. Please try again.')
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <PlayAudio audioUrl={audioUrl} />

            {/* Question Text */}
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">{instruction}</h3>
                
                {/* Options */}
                <div className="space-y-4">
                    {options.map((option, index) => (
                        <label
                            key={index}
                            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                            <input
                                type="radio"
                                name="summary-option"
                                checked={answerIndex === index}
                                onChange={() => setAnswerIndex(index)}
                                className="mt-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                            />
                            <span className="text-gray-800 leading-relaxed">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    onClick={handlSubmit}
                    disabled={isSubmitting || answerIndex === null}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    )
}

export default ListeningSMW