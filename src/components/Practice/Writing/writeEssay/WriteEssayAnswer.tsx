import { useMemo, useState } from 'react'

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
    spellingScore: number | null
    vocabScore: number | null
    DSCScore: number | null
    GLRScore: number | null
    user: {
        id: string
        name: string
        email: string
    }
    createdAt: string
    updatedAt: string
}

interface WriteEssayAnswerProps {
    answers: AnswerData[]
    questionId: string
    questionTitle: string
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }) + ' • ' + new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const WriteEssayAnswer = ({ answers, questionId, questionTitle }: WriteEssayAnswerProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<AnswerData | null>(null)

    const sortedAnswers = useMemo(
        () => [...answers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [answers]
    )

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Essay Answers</h1>
                <p className="text-gray-600 mt-1">Question #{questionId}: {questionTitle}</p>
                <p className="text-sm text-gray-500 mt-1">{answers.length} attempt{answers.length === 1 ? '' : 's'} submitted</p>
            </div>

            {answers.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">📝</div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No answers yet</h3>
                    <p className="text-gray-500">Be the first to submit an answer for this question!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg border border-gray-200">
                        <span>Response</span>
                        <span className="text-right">Submitted</span>
                        <span className="text-right">Action</span>
                    </div>

                    {sortedAnswers.map((answer) => (
                        <div key={answer.id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="text-sm text-gray-800 break-words whitespace-pre-line max-h-24 overflow-hidden">
                                {answer.answer || <span className="text-gray-400">No response provided</span>}
                            </div>
                            <div className="text-sm text-gray-500 text-right">
                                {formatDate(answer.createdAt)}
                            </div>
                            <div className="text-right">
                                <button
                                    onClick={() => setSelectedAnswer(answer)}
                                    className="inline-flex items-center justify-center rounded-lg border border-teal-500 bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                >
                                    Score Information
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedAnswer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-2xl h-[80vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
                            <div>
                                <h4 className="text-xl font-semibold text-gray-900">Score Information</h4>
                                <p className="text-sm text-gray-500">Submission on {formatDate(selectedAnswer.createdAt)}</p>
                            </div>
                            <button
                                onClick={() => setSelectedAnswer(null)}
                                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                                aria-label="Close score details"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-6 px-6 py-5">
                            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
                                <h5 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">Submitted Response</h5>
                                <p className="mt-3 text-sm leading-7 text-gray-800 whitespace-pre-line">{selectedAnswer.answer || 'No response provided.'}</p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Total Score</p>
                                    <p className="mt-3 text-3xl font-semibold text-gray-900">{selectedAnswer.totalScore != null ? selectedAnswer.totalScore.toFixed(1) : 'N/A'}</p>
                                </div>
                                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Word Count</p>
                                    <p className="mt-3 text-3xl font-semibold text-gray-900">{selectedAnswer.wordCount ?? 'N/A'}</p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-4">
                                <ScoreCard title="Content" value={selectedAnswer.contentScore} max={6} />
                                <ScoreCard title="Form" value={selectedAnswer.formScore} max={2} />
                                <ScoreCard title="Grammar" value={(selectedAnswer as any).grammerScore ?? (selectedAnswer as any).grammarScore ?? null} max={2} />
                                <ScoreCard title="Spelling" value={selectedAnswer.spellingScore} max={2} />
                                <ScoreCard title="Vocabulary" value={selectedAnswer.vocabScore} max={2} />
                                <ScoreCard title="Development, Structure & Coherence" value={selectedAnswer.DSCScore} max={6} />
                                <ScoreCard title="General Linguistic Range" value={selectedAnswer.GLRScore} max={6} />
                                <ScoreCard title="Total" value={selectedAnswer.totalScore} max={26} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

<<<<<<< HEAD
const ScoreCard = ({ title, value, max }: { title: string; value?: number | null; max: number }) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{value != null ? value.toFixed(1) : 'N/A'}</p>
        <p className="text-xs text-gray-500">/ {max}</p>
    </div>
)

export default WriteEssayAnswer
=======
export default WriteEssayAnswer
>>>>>>> c61e8c3 (styled writing section)
