import React from 'react'
import { ListeningWfdDetail } from '@/types/listening'

interface Props {
  answers: ListeningWfdDetail['answers']
  transcript: ListeningWfdDetail['transcript']
}

const Listening_wfd_answer = ({ answers, transcript }: Props) => {
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

      <div className="px-6 py-4 border-b border-border bg-primary/5">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1.5">Correct Transcript</p>
        <p className="text-sm text-foreground font-medium leading-relaxed">{transcript}</p>
      </div>

      <div className="divide-y divide-border">
        {answers.map((answer, index) => (
          <div key={answer.id} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                Submission #{index + 1}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {new Date(answer.createdAt).toLocaleDateString()} at {new Date(answer.createdAt).toLocaleTimeString()}
              </span>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm text-foreground leading-relaxed">{answer.response}</p>
            </div>

            {answer.totalScore != null && (
              <div className="flex justify-end">
                <span className="text-sm font-bold text-primary">
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
