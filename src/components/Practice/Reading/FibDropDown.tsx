'use client';
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

interface Blanks {
  id: string
  position: number
  passageId: string
  correctIndex: number
  options: string[]
}

interface FIBDropDownProps {
  passageId: string
  passage: string
  blanks?: Blanks[]
}

const FibDropDownComponent = ({ passage, passageId, blanks }: FIBDropDownProps) => {
  const [answer, setAnswer] = useState<{
    position: string,
    index: string
  }[]>([])
  const [submittedResult, setSubmittedResult] = useState<Record<string, boolean> | null>(null);
  const [activeExplanation, setActiveExplanation] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const detailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDropDown/${passageId}`;

  const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
    mutationFn: async (ans: typeof answer) => {
      const response = await fetch(detailUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: ans }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: (_, submittedAnswer) => {
      if (blanks) {
        const results: Record<string, boolean> = {};
        submittedAnswer.forEach(userAnswer => {
          const blank = blanks.find(b => b.position.toString() === userAnswer.position);
          if (blank) {
            results[userAnswer.position] = blank.correctIndex === parseInt(userAnswer.index);
          }
        });
        setSubmittedResult(results);
      }
      queryClient.invalidateQueries({ queryKey: [detailUrl] });
      router.refresh();
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleOptionSelect = (blankPosition: number, selectedIndex: number) => {
    setAnswer(prevAnswer => {
      const filteredAnswers = prevAnswer.filter(ans => ans.position !== blankPosition.toString())
      if (selectedIndex >= 0) {
        return [...filteredAnswers, { position: blankPosition.toString(), index: selectedIndex.toString() }]
      }
      return filteredAnswers
    })
  }

  const getSelectedIndex = (position: number): number => {
    const foundAnswer = answer.find(ans => ans.position === position.toString())
    return foundAnswer ? parseInt(foundAnswer.index) : -1
  }

  const getCorrectWord = (position: string) => {
    const blank = blanks?.find(b => b.position.toString() === position);
    return blank ? (blank.options[blank.correctIndex] ?? '') : '';
  };

  const correctCount = submittedResult
    ? Object.values(submittedResult).filter(Boolean).length
    : 0;

  const renderPassageWithDropdowns = () => {
    if (!blanks || blanks.length === 0) {
      return <p className="text-foreground text-base leading-relaxed">{passage}</p>
    }

    let modifiedPassage = passage
    const sortedBlanks = [...blanks].sort((a, b) => a.position - b.position)
    sortedBlanks.reverse().forEach(blank => {
      modifiedPassage = modifiedPassage.replace(`{${blank.position}}`, `<SELECT_${blank.position}>`)
    })
    const parts = modifiedPassage.split(/(<SELECT_\d+>)/)

    return (
      <div className="text-base leading-relaxed text-foreground">
        {parts.map((part, index) => {
          const selectMatch = part.match(/<SELECT_(\d+)>/)
          if (selectMatch) {
            const position = parseInt(selectMatch[1])
            const blank = blanks.find(b => b.position === position)
            if (!blank) return null
            const selectedIndex = getSelectedIndex(position)
            const isCorrect = submittedResult?.[position.toString()];
            const correctWord = getCorrectWord(position.toString());

            return (
              <span key={`dropdown-${position}`} className="inline-flex items-center gap-1.5 mx-1 align-middle">
                <select
                  value={selectedIndex >= 0 ? selectedIndex : ''}
                  onChange={(e) => {
                    if (submittedResult) return;
                    const value = e.target.value
                    handleOptionSelect(position, value === '' ? -1 : parseInt(value))
                  }}
                  disabled={!!submittedResult}
                  className={`px-2 py-1 border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed ${
                    submittedResult
                      ? isCorrect
                        ? 'border-green-400 bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-300'
                        : 'border-red-400 bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-300'
                      : 'border-border'
                  }`}
                >
                  <option value="">Select…</option>
                  {blank.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>
                      {option}
                    </option>
                  ))}
                </select>

                {submittedResult && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    correct: <span className="font-medium text-foreground">&ldquo;{correctWord}&rdquo;</span>
                    <span className="relative inline-flex items-center group/tip">
                      <button
                        onClick={() => setActiveExplanation(position.toString())}
                        className="w-4 h-4 rounded-full bg-muted border border-border text-muted-foreground text-[9px] font-bold hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center leading-none"
                      >
                        ?
                      </button>
                      <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-[10px] text-background opacity-0 transition-opacity group-hover/tip:opacity-100 z-10">
                        AI Explanation
                      </span>
                    </span>
                  </span>
                )}
              </span>
            )
          }
          return <span key={index}>{part}</span>
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        {renderPassageWithDropdowns()}
      </div>

      {submittedResult ? (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-5 py-3">
          <p className="text-sm text-muted-foreground">
            Score: <span className="font-semibold text-foreground">{correctCount} / {Object.keys(submittedResult).length}</span> correct
          </p>
          <div className="flex gap-3 text-sm">
            <span className="font-medium text-green-600 dark:text-green-400">{correctCount} correct</span>
            <span className="font-medium text-destructive">{Object.keys(submittedResult).length - correctCount} incorrect</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {answer.length} of {blanks?.length || 0} blanks filled
          </span>
          <button
            onClick={() => submitAnswer(answer)}
            disabled={answer.length === 0 || isSubmitting}
            className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? 'Submitting…' : 'Submit Answer'}
          </button>
        </div>
      )}

      {/* AI Explanation bottom popup */}
      {activeExplanation !== null && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setActiveExplanation(null)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-xl shadow-lg">
            <div className="mx-auto max-w-2xl px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold">AI</span>
                  <h3 className="text-base font-semibold text-foreground">AI Explanation</h3>
                </div>
                <button
                  onClick={() => setActiveExplanation(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Correct answer: <span className="text-primary">&ldquo;{getCorrectWord(activeExplanation)}&rdquo;</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is a placeholder for the AI-generated explanation. It will explain why <strong className="text-foreground">&ldquo;{getCorrectWord(activeExplanation)}&rdquo;</strong> is the correct choice for this blank — covering grammar rules, contextual clues, collocations, and vocabulary usage that make it the best fit in this sentence.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default FibDropDownComponent
