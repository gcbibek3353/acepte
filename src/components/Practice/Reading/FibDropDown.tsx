import React, { useState } from 'react'

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDropDown/${passageId}`

  // Handle dropdown selection
  const handleOptionSelect = (blankPosition: number, selectedIndex: number) => {
    setAnswer(prevAnswer => {
      // Remove existing answer for this position if any
      const filteredAnswers = prevAnswer.filter(ans => ans.position !== blankPosition.toString())

      // Add new answer (only if an actual option is selected, not the placeholder)
      if (selectedIndex >= 0) {
        return [...filteredAnswers, {
          position: blankPosition.toString(),
          index: selectedIndex.toString()
        }]
      }

      return filteredAnswers
    })
  }

  // Get selected index for a specific position
  const getSelectedIndex = (position: number): number => {
    const foundAnswer = answer.find(ans => ans.position === position.toString())
    return foundAnswer ? parseInt(foundAnswer.index) : -1
  }

  // Render passage with dropdowns
  const renderPassageWithDropdowns = () => {
    if (!blanks || blanks.length === 0) {
      return <p className="text-gray-600">{passage}</p>
    }

    let modifiedPassage = passage

    // Sort blanks by position to replace them in correct order
    const sortedBlanks = [...blanks].sort((a, b) => a.position - b.position)

    // Replace each placeholder with dropdown (in reverse order to maintain positions)
    sortedBlanks.reverse().forEach(blank => {
      const placeholder = `{${blank.position}}`
      const selectedIndex = getSelectedIndex(blank.position)

      const dropdown = `<SELECT_${blank.position}>`
      modifiedPassage = modifiedPassage.replace(placeholder, dropdown)
    })

    // Split the passage and insert actual dropdowns
    const parts = modifiedPassage.split(/(<SELECT_\d+>)/)

    return (
      <div className="text-lg leading-relaxed">
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
                className="mx-1 px-2 py-1 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: answer,
        })
      })
      const result = await response.json()

      if (result.success) {
        alert('Answer submitted and evaluated successfully!')
        console.log('Evaluation result:', result.data)
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      alert('Failed to submit answer. Please try again.')
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Fill in the Blanks - Dropdown
        </h2>

        {/* Passage with dropdowns */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          {renderPassageWithDropdowns()}
        </div>

        {/* Submit button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={answer.length === 0 || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : `Submit Answer (${answer.length}/${blanks?.length || 0})`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FibDropDownComponent