'use client'
import FilterQuestions from '@/components/Practice/FilterQuestions';
import useFilteredAPI from '@/hooks/useFilteredAPI';

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
interface EssayQuestion {
  id: string;
  essayTitle: string;
  essay_description: string;
  difficulty: string;
  questionId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  bookmarks: BookMarkData[];
  answers: AnswerData[];
}

const Page = () => {
  const { data, loading, error, queryParams, setQueryParams } = useFilteredAPI<EssayQuestion[]>('/api/v1/practice/writing/writeEssay');

  const filterQuestions = data?.map((q) => ({
    id: q.id,
    questionId: q.questionId,
    title: q.essayTitle,
    difficulty: q.difficulty,
    bookmarked: q.bookmarks.length > 0 ? true : false,
    answered: q.answers.length > 0 ? true : false
  }))

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Write Essay Practice</h1>
      <FilterQuestions questions={filterQuestions} queryParams={queryParams} setQueryParams={setQueryParams} />
    </div>
  )
}

export default Page