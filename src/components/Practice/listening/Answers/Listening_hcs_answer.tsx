import React from 'react'
import { ListeningHcsDetail } from '@/types/listening'

interface Props {
  answers: ListeningHcsDetail['answers']
  options: ListeningHcsDetail['options']
  correctOptionIndex: ListeningHcsDetail['correctOptionIndex']
}

const Listening_hcs_answer = ({ answers, options, correctOptionIndex }: Props) => {
  if (answers.length === 0) {
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
        <div className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
        <h3 className="text-base font-semibold text-foreground">Previous Submissions</h3>
        <span className="ml-auto text-xs font-medium rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5 dark:bg-amber-900/30 dark:text-amber-300">
          {answers.length}
        </span>
      </div>

      <div className="divide-y divide-border">
        {answers.map((answer, index) => {
          const isCorrect = answer.selectedOptionIndex === correctOptionIndex
          const selectedText = options[answer.selectedOptionIndex] ?? 'Unknown'
          const correctText = options[correctOptionIndex]

          return (
            <div key={answer.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  Submission #{index + 1}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {new Date(answer.createdAt).toLocaleDateString()} at {new Date(answer.createdAt).toLocaleTimeString()}
                </span>
              </div>

              {answer.totalScore != null && (
                <div className="flex justify-end">
                  <span className="text-sm font-bold text-primary">
                    Total Score: {answer.totalScore}
                  </span>
                </div>
              )}

              <div className={`p-3 rounded-lg border text-sm ${isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/40' : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/40'}`}>
                <p className={`leading-relaxed font-medium mb-2 ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                  {selectedText}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {isCorrect ? 'Correct' : `Incorrect — correct: "${correctText}"`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Listening_hcs_answer
