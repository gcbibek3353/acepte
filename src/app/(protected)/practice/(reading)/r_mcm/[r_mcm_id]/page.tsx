"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
// import Header from '@/components/Header'
// import Timer from '@/components/Timer'

interface Option {
  id: string
  text: string
}

interface QuestionData {
  id: string
  questionId: string
  title: string
  content: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  prompt: string
  options: Option[]
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: QuestionData
}

interface SubmitResponse {
  success: boolean
  message: string
  data: {
    answerId: string
    totalScore: number
    correctAnswers: number
    userCorrectSelections: number
    userIncorrectSelections: number
    results: Array<{
      id: string
      text: string
      isCorrect: boolean
      wasSelected: boolean
      status: 'correct_selected' | 'correct_not_selected' | 'incorrect_selected' | 'incorrect_not_selected'
    }>
    explanation: {
      correctOptionIds: string[]
      scoringMethod: string
    }
  }
}

const McmPracticePage = () => {
  const params = useParams()
  const router = useRouter()
  const questionId = params.r_mcm_id as string

  const [questionData, setQuestionData] = useState<QuestionData | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [results, setResults] = useState<SubmitResponse['data'] | null>(null)
  
  const timeLimit = 15 * 60 // 15 minutes in seconds

  // Fetch question data
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/v1/practice/reading/mcm/${questionId}`)
        const data: ApiResponse = await response.json()

        if (data.success) {
          setQuestionData(data.data)
          setError(null)
        } else {
          setError(data.message)
        }
      } catch (err) {
        setError('Failed to load question. Please try again.')
        console.error('Error fetching question:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (questionId) {
      fetchQuestion()
    }
  }, [questionId])

  // Handle option selection
  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId)
      } else {
        return [...prev, optionId]
      }
    })
  }

  // Handle time exceeded
  const handleTimeExceeded = () => {
    if (!isSubmitted) {
      alert('Time is up! Your answers will be submitted automatically.')
      handleSubmit()
    }
  }

  // Submit answer
  const handleSubmit = async () => {
    if (!questionData) return

    if (selectedOptions.length === 0) {
      const confirm = window.confirm('You haven\'t selected any options. Do you want to submit anyway?')
      if (!confirm) return
    }

    setIsSubmitting(true)
    try {
      // Get user ID (you might need to get this from your auth context)
      const userId = "Va4MvXhzjTlS6bQINdJYMA39GWtzpx95" // Replace with dynamic user ID from your auth system

      const response = await fetch(`/api/v1/practice/reading/mcm/${questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          selectedOptions
        })
      })

      const data: SubmitResponse = await response.json()

      if (data.success) {
        setResults(data.data)
        setIsSubmitted(true)
        console.log('Answer submitted successfully:', data.data)
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      alert('Failed to submit answer. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset and try again
  const handleTryAgain = () => {
    setSelectedOptions([])
    setIsSubmitted(false)
    setResults(null)
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading question...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => router.push('/practice')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back to Practice
          </button>
        </div>
      </div>
    )
  }

  if (!questionData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">No question data available</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      {/* <Header
        questionType="Multiple Choice Multiple Answer"
        instruction="Read the passage carefully and select ALL correct answers. You may select multiple options. You will have 15 minutes to complete this task."
        questionId={questionData.questionId}
        title={questionData.title}
        description=""
        bookmarks={[]}
        difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
      /> */}

      {/* Timer */}
      {/* {!isSubmitted && (
        <Timer 
          countDownTime={timeLimit} 
          callbackFn={handleTimeExceeded} 
          title="Remaining time" 
        />
      )} */}

      {/* Reading Passage */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Reading Passage</h2>
        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {questionData.content}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-teal-700">
          {questionData.prompt}
        </h3>
        
        {/* Results Display */}
        {isSubmitted && results && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Results</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Score:</span> {results.totalScore}%
              </div>
              <div>
                <span className="font-medium">Correct:</span> {results.userCorrectSelections}
              </div>
              <div>
                <span className="font-medium">Incorrect:</span> {results.userIncorrectSelections}
              </div>
              <div>
                <span className="font-medium">Total Correct:</span> {results.correctAnswers}
              </div>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          {questionData.options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.id)
            let optionClass = "p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 "
            
            if (isSubmitted && results) {
              const result = results.results.find(r => r.id === option.id)
              if (result) {
                switch (result.status) {
                  case 'correct_selected':
                    optionClass += "bg-green-100 border-green-500 text-green-800"
                    break
                  case 'correct_not_selected':
                    optionClass += "bg-orange-100 border-orange-400 text-orange-800"
                    break
                  case 'incorrect_selected':
                    optionClass += "bg-red-100 border-red-500 text-red-800"
                    break
                  default:
                    optionClass += "bg-gray-50 border-gray-300"
                }
              }
            } else {
              optionClass += isSelected 
                ? "bg-teal-100 border-teal-500" 
                : "bg-white border-gray-300 hover:border-teal-300"
            }

            return (
              <div key={option.id}>
                <label className={optionClass}>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleOptionChange(option.id)}
                      disabled={isSubmitted}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-gray-700 mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-gray-800">{option.text}</span>
                      
                      {/* Show status for submitted answers */}
                      {isSubmitted && results && (
                        <div className="mt-1 text-sm">
                          {(() => {
                            const result = results.results.find(r => r.id === option.id)
                            if (!result) return null
                            
                            switch (result.status) {
                              case 'correct_selected':
                                return <span className="text-green-600 font-medium">✓ Correct (Selected)</span>
                              case 'correct_not_selected':
                                return <span className="text-orange-600 font-medium">✓ Correct (Not Selected)</span>
                              case 'incorrect_selected':
                                return <span className="text-red-600 font-medium">✗ Incorrect (Selected)</span>
                              default:
                                return null
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Selected: {selectedOptions.length} option{selectedOptions.length !== 1 ? 's' : ''}
        </div>
        
        <div className="space-x-4">
          {isSubmitted ? (
            <>
              <button
                onClick={handleTryAgain}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/practice')}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Back to Practice
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answer'}
            </button>
          )}
        </div>
      </div>

      {/* Scoring Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Scoring Information</h4>
        <p className="text-sm text-gray-600">
          Each correct selection: +1 point | Each incorrect selection: -1 point | Minimum score: 0 points
        </p>
      </div>
    </div>
  )
}

export default McmPracticePage