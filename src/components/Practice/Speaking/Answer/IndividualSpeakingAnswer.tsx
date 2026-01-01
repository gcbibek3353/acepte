'use client'
import React from 'react'
import PlayAudio from '../../listening/PlayAudio'

interface SpeakingAnswerProps {
  questionId?: string
  questionTitle?: string
  contentScore: number
  oralFluencyScore: number
  pronunciationScore: number
  totalScore: number
  audioUrl: string
}

const IndividualSpeakingAnswer = (props: SpeakingAnswerProps) => {
  const { questionId, questionTitle, audioUrl, contentScore, oralFluencyScore, pronunciationScore, totalScore } = props;

   return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border p-6">
      {/* heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">
          #{questionId} Score Info
        </h2>
      </div>

      {/* content  */}
      <div className="space-y-6">
        {/* chart section */}
        <div className="flex items-start gap-6">
          {/* circular progress */}
          <div className="relative">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background circle */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2"
                strokeDasharray={`${(totalScore / 30) * 100}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-lg font-bold text-gray-800">{totalScore && totalScore.toFixed(2)}/30</div>
              <div className="text-sm text-teal-600 font-medium">Total</div>
            </div>
          </div>

          {/* scores breakdown */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Content :</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{contentScore}/10</span>
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pronun :</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{pronunciationScore}/10</span>
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Fluency :</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{oralFluencyScore}/10</span>
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* audio player */}
        <div className="pt-4 border-t border-gray-100">
          <PlayAudio audioUrl={audioUrl} />
        </div>
      </div>
    </div>
  )
}

export default IndividualSpeakingAnswer