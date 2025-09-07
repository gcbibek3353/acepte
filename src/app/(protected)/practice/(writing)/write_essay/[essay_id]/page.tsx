"use client"
import Header from '@/components/Practice/Header'
import Timer from '@/components/Practice/Timer'
import useFetch from '@/hooks/useFetch'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'next/navigation'
import AnswersComponent from '@/components/Practice/Answers'
import { authClient } from '@/lib/auth-client'
import { userContext } from '@/app/(protected)/layout'

interface AnswerData {
  id: string
  userId: string
  questionId: string
  answer: string
  wordCount: number
  totalScore: number | null
  contentScore: number | null
  formScore: number | null
  grammerScore: number | null
  spellingScore: number | null
  vocabScore: number | null
  DSCScore: number | null
  GLRScore: number | null
  createdAt: string
  updatedAt: string
}
interface BookMarkData {
  id: string
  userId: string
  questionId: string
  createdAt: string
}

interface QuestionData {
  id: string
  questionId: string
  essayTitle: string
  essay_description: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  min_word_limit: number
  max_word_limit: number
  createdAt: string
  updatedAt: string
  isActive: boolean
  answers: AnswerData[]
  bookmarks: BookMarkData[]
}

interface ApiResponse {
  success: boolean
  message: string
  data: QuestionData
}

const Page = () => {
  const params = useParams()
  const essayId = params.essay_id as string

  const user = useContext(userContext);
  console.log(user);
  

  const [essay, setEssay] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const timeLimit = 20 * 60 // 20 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/writeEssay/${essayId}`
  const { data, loading, error } = useFetch<ApiResponse>(URL)

  // Update word count when essay changes
  useEffect(() => {
    const words = essay.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
  }, [essay])

  const handleTimeExceedHandler = () => {
    alert('Time is up! Please submit your essay.')
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          essay: essay,
        })
      })

      const result = await response.json()

      if (result.success) {
        alert('Essay submitted and evaluated successfully!')
        console.log('Evaluation result:', result.data)
        setEssay('')
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      console.error('Error submitting essay:', error)
      alert('Failed to submit essay. Please try again.')
    }
  }

  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  if (error) return <div className="max-w-4xl mx-auto p-6">Error: {error}</div>
  if (!data?.success || !data?.data) return <div className="max-w-4xl mx-auto p-6">No data found</div>

  const questionData = data.data

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <Header
        questionType='Write Essay'
        instruction={`You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write ${questionData.min_word_limit}-${questionData.max_word_limit} words.`}
        questionId={questionData.id}
        questionUniqueId={questionData.questionId}
        title={questionData.essayTitle}
        description={questionData.essay_description}
        bookmarks={questionData.bookmarks}
        difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
      />

      {/* Timer */}
      <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" />

      {/* Essay Textarea */}
      <div className="mb-4">
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          className="w-full h-96 p-4 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
          placeholder="Start writing your essay here..."
        />
      </div>

      {/* Word Count and Submit */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600">
          Word Count: {wordCount}
        </span>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Submit Essay
        </button>
      </div>
      <AnswersComponent answers={questionData.answers} />

    </div>
  )
}

export default Page