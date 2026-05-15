import React from 'react'
import { SstDetail } from '@/types/listening'

interface Props {
  answers: SstDetail['answers']
}

const Sst_answer = ({ answers }: Props) => {
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

            <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-800 text-base leading-relaxed">{answer.response}</p>
            </div>

            <div className="flex justify-between items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              {answer.wordCount != null && (
                <span className="text-sm font-semibold text-blue-700">Words: {answer.wordCount}</span>
              )}
              {answer.totalScore != null && (
                <span className="text-lg font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">
                  Total Score: {answer.totalScore}
                </span>
              )}
            </div>

            {answer.totalScore != null && (
              <div className="grid grid-cols-5 gap-3">
                <div className="text-center bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="block text-green-600 font-semibold text-xs mb-1">Content</span>
                  <span className="text-lg font-bold text-green-700">{answer.contentScore ?? 'N/A'}</span>
                </div>
                <div className="text-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="block text-blue-600 font-semibold text-xs mb-1">Form</span>
                  <span className="text-lg font-bold text-blue-700">{answer.formScore ?? 'N/A'}</span>
                </div>
                <div className="text-center bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <span className="block text-orange-600 font-semibold text-xs mb-1">Grammar</span>
                  <span className="text-lg font-bold text-orange-700">{answer.grammarScore ?? 'N/A'}</span>
                </div>
                <div className="text-center bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <span className="block text-purple-600 font-semibold text-xs mb-1">Vocabulary</span>
                  <span className="text-lg font-bold text-purple-700">{answer.vocabularyScore ?? 'N/A'}</span>
                </div>
                <div className="text-center bg-rose-50 p-3 rounded-lg border border-rose-200">
                  <span className="block text-rose-600 font-semibold text-xs mb-1">Spelling</span>
                  <span className="text-lg font-bold text-rose-700">{answer.spellingScore ?? 'N/A'}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sst_answer
