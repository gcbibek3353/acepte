import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Mcs_answer from '@/components/Practice/Reading/Answers/Mcs_answer';
import MCS from '@/components/Practice/Reading/MCS';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { McsDetail, ApiResponse } from '@/types/reading';

const ReadingMCSPage = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/reading/mcs/${passageId}`;

  let data: ApiResponse<McsDetail> | null = null;
  let fetchError = false;

  try {
    const res = await fetch(URL, {
      headers: { Cookie: cookieStore.toString() },
      cache: 'no-store',
    });

    if (res.status === 404) notFound();

    if (res.ok) {
      data = await res.json();
    } else {
      fetchError = true;
    }
  } catch {
    fetchError = true;
  }

  if (fetchError) {
    return <QuestionListError error="Error loading question. Please try again." />;
  }

  if (!data?.success || !data?.data) notFound();

  const questionData = data.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            Reading
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Multiple Choice (Single)</span>
        </div>

        <Header
          questionType="Multiple Choice (Single)"
          instruction="Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <MCS passage={questionData.content} passageId={questionData.id} options={questionData.options} />
        </div>

        <Mcs_answer answers={questionData.answers} options={questionData.options} correctOptionIndex={questionData.correctOptionIndex} />
      </div>
    </div>
  );
};

export default ReadingMCSPage;
