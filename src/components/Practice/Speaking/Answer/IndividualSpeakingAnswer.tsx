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

const scoreRows = [
  { label: 'Content', key: 'contentScore' as const, max: 10 },
  { label: 'Pronunciation', key: 'pronunciationScore' as const, max: 10 },
  { label: 'Oral Fluency', key: 'oralFluencyScore' as const, max: 10 },
] as const

const IndividualSpeakingAnswer = (props: SpeakingAnswerProps) => {
  const { audioUrl, contentScore, oralFluencyScore, pronunciationScore, totalScore } = props;
  const scores = { contentScore, pronunciationScore, oralFluencyScore };

  const percentage = totalScore ? Math.round((totalScore / 30) * 100) : 0;
  const circumference = 2 * Math.PI * 15.9155;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Score</span>
        <span className="text-sm font-bold text-primary">{totalScore.toFixed(2) ?? 0} / 30</span>
      </div>

      <div className="p-4 flex items-start gap-6">
        <div className="relative shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted/50"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${dashOffset}`}
              strokeLinecap="round"
              className="text-primary transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-foreground">{totalScore.toFixed(2) ?? 0}</span>
            <span className="text-xs text-muted-foreground">/ 30</span>
          </div>
        </div>

        <div className="flex-1 divide-y divide-border">
          {scoreRows.map(({ label, key, max }) => (
            <div key={key} className="flex items-center justify-between py-2 text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-semibold text-foreground tabular-nums">
                {scores[key] ?? 0} / {max}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 border-t border-border">
        <PlayAudio audioUrl={audioUrl} />
      </div>
    </div>
  )
}

export default IndividualSpeakingAnswer
