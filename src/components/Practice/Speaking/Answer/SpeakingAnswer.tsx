import React from 'react'
import IndividualSpeakingAnswer from './IndividualSpeakingAnswer'

interface AnswerData {
  id: string
  userId: string
  questionId: string
  audioUrl: string
  duration: number | null
  contentScore?: number | null
  oralFluencyScore?: number | null
  pronunciationScore?: number | null
  totalScore?: number | null
  user: {
    id: string
    name: string
    email: string
  }
  createdAt: string | Date
  updatedAt: string | Date
}

interface SpeakingAnswerProps {
  answers: AnswerData[]
  questionId: string
  questionTitle: string
}

const SpeakingAnswer = ({ answers, questionId, questionTitle }: SpeakingAnswerProps) => {
  if (!answers || answers.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-1">Previous Submissions</h3>
        <p className="text-sm text-muted-foreground">No previous submissions found for this question.</p>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-muted/30 border-b border-border">
        <div className="w-1 h-6 rounded-full bg-blue-500 shrink-0" />
        <h3 className="text-base font-semibold text-foreground">Previous Submissions</h3>
        <span className="ml-auto text-xs font-medium rounded-full bg-blue-100 text-blue-700 px-2.5 py-0.5 dark:bg-blue-900/30 dark:text-blue-300">
          {answers.length}
        </span>
      </div>

      <div className="divide-y divide-border">
        {answers.map((answer, index) => (
          <div key={answer.id} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0">
                  {answer.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-none">{answer.user.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{answer.user.email}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {new Date(answer.createdAt).toLocaleDateString()} at {new Date(answer.createdAt).toLocaleTimeString()}
              </span>
            </div>

            <IndividualSpeakingAnswer
              questionId={questionId}
              questionTitle={questionTitle}
              audioUrl={answer.audioUrl}
              contentScore={answer.contentScore ?? 0}
              oralFluencyScore={answer.oralFluencyScore ?? 0}
              pronunciationScore={answer.pronunciationScore ?? 0}
              totalScore={answer.totalScore ?? 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpeakingAnswer
