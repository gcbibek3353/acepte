import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Timer from '@/components/Practice/Timer';
import SummarizeTextArea from '@/components/Practice/Writing/summarizeWrittenText/summarizeTextArea';
import AnswersComponent from '@/components/Practice/Answers';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { SummarizeWrittenTextDetail, ApiResponse } from '@/types/writing';

const SummarizeWrittenTextDetailPage = async ({ params }: { params: Promise<{ text_id: string }> }) => {
  const { text_id } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/writing/summarizeWrittenText/${text_id}`;

  let data: ApiResponse<SummarizeWrittenTextDetail> | null = null;
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
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            Writing
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Summarize Written Text</span>
        </div>

        <Header
          questionType="Summarize Written Text"
          instruction="Read the passage below and summarize it using one sentence. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage."
          bookMarkURL={`${URL}/bookmark`}
          questionUniqueId={questionData.questionId}
          title={questionData.textTitle}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <Timer countDownTime={10 * 60} title="Remaining time" />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <SummarizeTextArea textId={text_id} text={questionData.passage} />
        </div>

        <AnswersComponent answers={questionData.answers} />
      </div>
    </div>
  );
};

export default SummarizeWrittenTextDetailPage;
