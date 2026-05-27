import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Listening_mcm_answer from '@/components/Practice/listening/Answers/Listening_mcm_answer';
import ListeningMCM from '@/components/Practice/listening/MultipleChoiceMultiple/listeningMCM';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { ListeningMcmDetail, ApiResponse } from '@/types/listening';

const Page = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/listening/multipleChoiceMultiple/${passageId}`;

  let data: ApiResponse<ListeningMcmDetail> | null = null;
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
          <span className="text-xs text-muted-foreground">Multiple Choice (Multiple)</span>
        </div>

        <Header
          questionType="Multiple Choice (Multiple)"
          instruction="Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <ListeningMCM audioUrl={questionData.audioUrl} questionText={questionData.questionText} passageId={passageId} options={questionData.options} />
        </div>

        <Listening_mcm_answer answers={questionData.answers} options={questionData.options} />
      </div>
    </div>
  );
};

export default Page;
