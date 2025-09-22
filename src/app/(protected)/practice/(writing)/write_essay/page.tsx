'use client'
import useFetch from '@/hooks/useFetch';
import { NextApiResponse } from 'next';
import Link from 'next/link';
import React from 'react'

interface EssayQuestion {
  id: string;
  essayTitle: string;
  essay_description: string;
  difficulty: string;
  questionId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/writeEssay`;
  const { data, loading, error } = useFetch<{ data: EssayQuestion[] }>(URL)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading questions</div>
      </div>
    )
  }

  // TODO : It should have a filter option , on every filter we should fetch data again with extra query params
  // since we need to do this for all pages , we can create a custom hook or centralize this logic somewhere

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Write Essay Practice</h1>

      <div className="space-y-4">
        {data?.data && data.data.map((item: EssayQuestion) => (
          <Link
            key={item.id}
            href={`/practice/write_essay/${item.id}`}
            className="block"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800 flex-1">
                  {item.essayTitle}
                </h2>
                <div className="flex items-center space-x-3 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                    item.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {item.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 font-mono">
                    {item.questionId}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page