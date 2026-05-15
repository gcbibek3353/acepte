import React from 'react'
import { ListeningWfdDetail } from '@/types/listening'

interface Props {
  answers: ListeningWfdDetail['answers']
  transcript: ListeningWfdDetail['transcript']
}

const Listening_wfd_answer = ({ answers, transcript }: Props) => {
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

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Correct Transcript</p>
        <p className="text-blue-900 font-medium">{transcript}</p>
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

            <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-800 text-base leading-relaxed">{answer.response}</p>
            </div>

            {answer.totalScore != null && (
              <div className="flex justify-end p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <span className="text-lg font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">
                  Total Score: {answer.totalScore}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Listening_wfd_answer
