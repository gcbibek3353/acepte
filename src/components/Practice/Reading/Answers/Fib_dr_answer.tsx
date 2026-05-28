import React from 'react'
import { FibDropdownDetail } from '@/types/reading'

interface Props {
  answers: FibDropdownDetail['answers']
  blanks: FibDropdownDetail['blanks']
}

type SelectedAnswer = { position: string; index: string }

const Fib_dr_answer = ({ answers, blanks }: Props) => {
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
        <div className="w-1 h-6 rounded-full bg-emerald-500 shrink-0" />
        <h3 className="text-base font-semibold text-foreground">Previous Submissions</h3>
        <span className="ml-auto text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 dark:bg-emerald-900/30 dark:text-emerald-300">
          {answers.length}
        </span>
      </div>

      <div className="divide-y divide-border">
        {answers.map((answer, index) => {
          const selectedAnswers = (answer.answers as SelectedAnswer[]) || []
          const sorted = [...selectedAnswers].sort((a, b) => parseInt(a.position) - parseInt(b.position))

          return (
            <div key={answer.id} className="px-5 py-3 flex items-center gap-3 flex-wrap">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                #{index + 1}
              </span>
              <span className="text-xs text-muted-foreground font-mono shrink-0">
                {new Date(answer.createdAt).toLocaleDateString()}
              </span>
              {answer.totalScore != null && (
                <span className="text-xs font-semibold text-primary shrink-0">
                  {answer.totalScore} pts
                </span>
              )}
              <div className="flex flex-wrap gap-1.5 ml-auto">
                {sorted.map((sel) => {
                  const blank = blanks.find(b => b.position === parseInt(sel.position))
                  const selectedOption = blank?.options[parseInt(sel.index)] ?? 'Unknown'
                  const isCorrect = blank ? blank.correctIndex === parseInt(sel.index) : null

                  return (
                    <span
                      key={sel.position}
                      title={isCorrect === false && blank ? `Correct: ${blank.options[blank.correctIndex]}` : undefined}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium border ${isCorrect ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900/40 dark:text-green-400' : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-400'}`}
                    >
                      {selectedOption}
                      {isCorrect === false && blank && (
                        <span className="ml-1 opacity-60">→ {blank.options[blank.correctIndex]}</span>
                      )}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Fib_dr_answer
