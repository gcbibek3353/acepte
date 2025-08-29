"use client"
import Header from '@/components/Practice/Header'
import Timer from '@/components/Practice/Timer'
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
  const timeLimit = 3 * 60 // 3 minutes in seconds

  const handleTimeExceedHandler = () => {
    alert('Time is up! Please submit your essay.')
    // Additional logic to disable textarea or auto-submit can be added here
  }

  const handleSubmit = () => {
    // Handle essay submission
    console.log('Essay submitted:', essay)
    alert('Essay submitted successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <Header
        questionType='Write Essay'
        instruction='You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200-300 words.'
        questionId={dummyTopicData.id}
        title={dummyTopicData.topic}
        description={dummyTopicData.description}
        bookmarks={dummyTopicData.bookmarks}
        difficulty={dummyTopicData.difficulty as 'easy' | 'medium' | 'hard'}
      />

      {/* Timer */}
      <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} />

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