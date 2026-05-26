"use client"
import Header from '@/components/Practice/Header'
import Timer from '@/components/Practice/Timer'
import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import AnswersComponent from '@/components/Practice/Answers'
import EssayTextArea from '@/components/Practice/Writing/writeEssay/EssayTextArea'
import WriteEssayAnswer from '@/components/Practice/Writing/writeEssay/WriteEssayAnswer'

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
  user: {
    id: string
    name: string
    email: string
  }
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

  const timeLimit = 20 * 60 // 20 minutes in seconds

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/writing/writeEssay/${essayId}`
  const { data, loading, error, refetch } = useFetch<ApiResponse>(URL)

  const handleTimeExceedHandler = () => {
    alert('Time is up! Please submit your essay.')
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
        questionUniqueId={questionData.questionId}
        title={questionData.essayTitle}
        bookMarkURL={`${URL}/bookmark`}
        description={questionData.essay_description}
        bookmarks={questionData.bookmarks}
        difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
      />

      {/* Timer */}
      <Timer countDownTime={timeLimit} callbackFn={handleTimeExceedHandler} title="Remaining time" />

      <EssayTextArea essayId={essayId} onSubmitted={async () => { await refetch() }} />

      {/* Answers Section */}
      <WriteEssayAnswer
        answers={questionData.answers}
        questionId={questionData.id}
        questionTitle={questionData.essayTitle}
      />

    </div>
  )
}

export default Page