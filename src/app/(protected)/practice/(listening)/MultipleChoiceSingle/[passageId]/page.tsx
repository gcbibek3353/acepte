import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Listening_mcs_answer from '@/components/Practice/listening/Answers/Listening_mcs_answer';
import ListeningMCS from '@/components/Practice/listening/MultipleChoiceSingle/ListeningMCS';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { ListeningMcsDetail, ApiResponse } from '@/types/listening';

const Page = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/listening/multipleChoiceSingle/${passageId}`;

  let data: ApiResponse<ListeningMcsDetail> | null = null;
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
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            Listening
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Multiple Choice (Single)</span>
        </div>

        <Header
          questionType="Multiple Choice (Single)"
          instruction="Listen to the recording and answer the single-choice question by selecting the correct response. Only one response is correct."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
          siblings={questionData.siblings}
          currentId={passageId}
          baseRoute="/practice/MultipleChoiceSingle"
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <ListeningMCS audioUrl={questionData.audioUrl} questionText={questionData.questionText} options={questionData.options} passageId={passageId} />
        </div>

        <Listening_mcs_answer answers={questionData.answers} options={questionData.options} correctOptionIndex={questionData.correctOptionIndex} />
      </div>
    </div>
  );
};

export default Page;
