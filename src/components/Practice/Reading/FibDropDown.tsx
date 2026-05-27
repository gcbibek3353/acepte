'use client';
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [detailUrl] });
      alert('Answer submitted successfully!');
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
            return (
              <select
                key={`dropdown-${position}`}
                value={selectedIndex >= 0 ? selectedIndex : ''}
                onChange={(e) => {
                  const value = e.target.value
                  handleOptionSelect(position, value === '' ? -1 : parseInt(value))
                }}
                className="mx-1 px-2 py-1 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select…</option>
                {blank.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    {option}
                  </option>
                ))}
              </select>
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
    </div>
  )
}

export default FibDropDownComponent
