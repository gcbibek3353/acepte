import React from 'react'
import { SstDetail } from '@/types/listening'

interface Props {
  answers: SstDetail['answers']
}

const scoreCategories = [
  { key: 'contentScore',    label: 'Content',    color: 'text-emerald-700 dark:text-emerald-400',  bg: 'bg-emerald-50 dark:bg-emerald-900/20',  border: 'border-emerald-200 dark:border-emerald-800' },
  { key: 'formScore',       label: 'Form',       color: 'text-blue-700 dark:text-blue-400',        bg: 'bg-blue-50 dark:bg-blue-900/20',         border: 'border-blue-200 dark:border-blue-800' },
  { key: 'grammarScore',    label: 'Grammar',    color: 'text-amber-700 dark:text-amber-400',      bg: 'bg-amber-50 dark:bg-amber-900/20',       border: 'border-amber-200 dark:border-amber-800' },
  { key: 'vocabularyScore', label: 'Vocabulary', color: 'text-violet-700 dark:text-violet-400',   bg: 'bg-violet-50 dark:bg-violet-900/20',    border: 'border-violet-200 dark:border-violet-800' },
  { key: 'spellingScore',   label: 'Spelling',   color: 'text-rose-700 dark:text-rose-400',        bg: 'bg-rose-50 dark:bg-rose-900/20',         border: 'border-rose-200 dark:border-rose-800' },
] as const;

const Sst_answer = ({ answers }: Props) => {
  if (answers.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-foreground mb-1">No submissions yet</p>
        <p className="text-xs text-muted-foreground">Your submissions for this question will appear here.</p>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-muted/30">
        <span className="inline-block w-1 h-5 rounded-full bg-amber-500 shrink-0" />
        <h3 className="text-base font-semibold text-foreground">
          Previous Submissions
        </h3>
        <span className="ml-auto text-xs text-muted-foreground font-mono">
          {answers.length} {answers.length === 1 ? 'submission' : 'submissions'}
        </span>
      </div>

      <div className="divide-y divide-border">
        {answers.map((answer, index) => (
          <div key={answer.id} className="p-6 space-y-4">
            {/* Meta row */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                Submission #{index + 1}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {new Date(answer.createdAt).toLocaleDateString()} · {new Date(answer.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Response text */}
            <div className="rounded-md border border-border bg-muted/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">{answer.response}</p>
            </div>

            {/* Word count + total score */}
            <div className="flex items-center justify-between gap-4 rounded-md bg-muted/30 border border-border px-4 py-2.5">
              {answer.wordCount != null && (
                <span className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{answer.wordCount}</span> words
                </span>
              )}
              {answer.totalScore != null && (
                <span className="text-sm font-bold text-primary">
                  Total: {answer.totalScore}
                </span>
              )}
            </div>

            {/* Score breakdown */}
            {answer.totalScore != null && (
              <div className="grid grid-cols-5 gap-2">
                {scoreCategories.map(({ key, label, color, bg, border }) => (
                  <div key={key} className={`rounded-md border ${border} ${bg} px-2 py-3 text-center`}>
                    <span className={`block text-xs font-medium mb-1 ${color}`}>{label}</span>
                    <span className={`text-base font-bold ${color}`}>
                      {answer[key] ?? '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sst_answer
