import React from 'react'
import { ReorderDetail } from '@/types/reading'

interface Props {
  answers: ReorderDetail['answers']
  paragraphs: ReorderDetail['paragraphs']
}

const Rop_answer = ({ answers, paragraphs }: Props) => {
  if (answers.length === 0) {
    return (
      <div className="mt-10 p-8 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Previous Submissions</h3>
        <p className="text-gray-600 text-lg">No previous submissions found for this question.</p>
      </div>
    )
  }

  return (
    <div className="mt-10 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-teal-500 rounded-full mr-3"></div>
        <h3 className="text-2xl font-bold text-gray-900">Previous Submissions ({answers.length})</h3>
      </div>
      <div className="space-y-6">
        {answers.map((answer, index) => (
          <div key={answer.id} className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-base font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                Submission #{index + 1}
              </span>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {new Date(answer.createdAt).toLocaleDateString()} at {new Date(answer.createdAt).toLocaleTimeString()}
              </span>
            </div>

            {answer.totalScore != null && (
              <div className="mb-4 flex justify-end p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <span className="text-lg font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">
                  Total Score: {answer.totalScore}
                </span>
              </div>
            )}

            <div className="space-y-2">
              {answer.userOrder.map((paragraphId, position) => {
                const paragraph = paragraphs.find(p => p.id === paragraphId)
                const isCorrect = paragraph ? paragraph.correctOrder === position + 1 : null

                return (
                  <div
                    key={paragraphId}
                    className={`flex gap-3 items-start p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                  >
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        #{position + 1}
                      </span>
                      {!isCorrect && paragraph && (
                        <span className="text-xs text-gray-500">
                          (correct: #{paragraph.correctOrder})
                        </span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {paragraph?.text ?? 'Unknown paragraph'}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rop_answer
