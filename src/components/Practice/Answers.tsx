interface AnswerData {
    id: string
    userId: string
    questionId: string
    answer: string
    wordCount: number
    totalScore: number | null
    contentScore: number | null
    formScore: number | null
    grammerScore: number | null
    spellingScore?: number | null
    vocabScore?: number | null
    DSCScore?: number | null
    GLRScore?: number | null
    createdAt: string
    updatedAt: string
}

const AnswersComponent = ({ answers }: { answers: AnswerData[] }) => {
    if (answers.length === 0) {
        return (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Previous Submissions</h3>
                <p className="text-gray-600">No previous submissions found for this question.</p>
            </div>
        )
    }

    return (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Submissions ({answers.length})</h3>
            <div className="space-y-4">
                {answers.map((answer, index) => (
                    <div key={answer.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-sm font-medium text-gray-700">Submission #{index + 1}</span>
                            <span className="text-xs text-gray-500">
                                {new Date(answer.createdAt).toLocaleDateString()} at {new Date(answer.createdAt).toLocaleTimeString()}
                            </span>
                        </div>

                        <div className="mb-3">
                            <p className="text-gray-800 text-sm line-clamp-3">{answer.answer}</p>
                        </div>

                        <div className="flex justify-between items-center text-xs text-gray-600">
                            <span>Words: {answer.wordCount}</span>
                            {answer.totalScore !== null && (
                                <span className="font-medium">Total Score: {answer.totalScore.toFixed(2)}</span>
                            )}
                        </div>

                        {answer.totalScore !== null && (
                            <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                                <div className="text-center">
                                    <span className="block text-gray-500">Content</span>
                                    <span className="font-medium">{answer.contentScore?.toFixed(1) || 'N/A'}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-gray-500">Form</span>
                                    <span className="font-medium">{answer.formScore?.toFixed(1) || 'N/A'}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-gray-500">Grammar</span>
                                    <span className="font-medium">{answer.grammerScore?.toFixed(1) || 'N/A'}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-gray-500">Vocabulary</span>
                                    <span className="font-medium">{answer.vocabScore?.toFixed(1) || 'N/A'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AnswersComponent;