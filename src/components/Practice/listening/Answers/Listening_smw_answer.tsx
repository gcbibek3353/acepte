import React from 'react'
import { ListeningSmwDetail } from '@/types/listening'

interface Props {
  answers: ListeningSmwDetail['answers']
  options: ListeningSmwDetail['options']
  correctOptionIndex: ListeningSmwDetail['correctOptionIndex']
}

const Listening_smw_answer = ({ answers, options, correctOptionIndex }: Props) => {
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
        {answers.map((answer, index) => {
          const isCorrect = answer.selectedOptionIndex === correctOptionIndex
          const selectedText = options[answer.selectedOptionIndex] ?? 'Unknown'
          const correctText = options[correctOptionIndex]

          return (
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

              <div className={`flex items-center justify-between p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {selectedText}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isCorrect ? 'Correct' : `Incorrect — ${correctText}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Listening_smw_answer
