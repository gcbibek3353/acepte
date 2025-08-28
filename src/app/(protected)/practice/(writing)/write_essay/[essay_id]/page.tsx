"use client"
import React, { useState, useEffect } from 'react'

const dummyTopicData = {
  id: '483',
  topic: 'Some people believe that university students should be required to attend classes. Others believe that going to classes should be optional for students. Which point of view do you agree with? Use specific reasons and examples to support your answer.',
  description: "Discuss both views and give your opinion.",
  difficulty: 'medium',
  bookmarks: ['user1', 'user2'],
}

const page = () => {
  const [essay, setEssay] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(20 * 60) // 20 minutes in seconds

  // Update word count when essay changes
  useEffect(() => {
    const words = essay.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
  }, [essay])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    // Handle essay submission
    console.log('Essay submitted:', essay)
    alert('Essay submitted successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-gray-600">#{dummyTopicData.id}</span>
          <span className="text-lg font-medium text-gray-800">{dummyTopicData.description}</span>
          <span className="px-2 py-1 bg-orange-100 text-orange-600 text-sm rounded capitalize">
            {dummyTopicData.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
            </svg>
          </button>
          <span className="px-3 py-1 bg-teal-500 text-white text-sm rounded">
            Tested (410)
          </span>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-4">
        <span className="text-red-500 font-medium">
          Remain: {formatTime(timeRemaining)}
        </span>
      </div>

      {/* Topic */}
      <div className="mb-6">
        <p className="text-gray-800 text-base leading-relaxed">
          {dummyTopicData.topic}
        </p>
      </div>

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
    </div>
  )
}

export default page