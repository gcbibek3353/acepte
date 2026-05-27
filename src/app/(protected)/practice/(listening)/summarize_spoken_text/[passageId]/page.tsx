import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Sst_answer from '@/components/Practice/listening/Answers/Sst_answer';
import SummarizeSpokenTextComponent from '@/components/Practice/listening/SummarizeSpokenText/SummarizeSpokenTextComponent';
import Timer from '@/components/Practice/Timer';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { SstDetail, ApiResponse } from '@/types/listening';

const Page = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/listening/summarizeSpokenText/${passageId}`;

  let data: ApiResponse<SstDetail> | null = null;
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
          <span className="text-xs text-muted-foreground">Summarize Spoken Text</span>
        </div>

        <Header
          questionType="Summarize Spoken Text"
          instruction="You will hear a short report. Write a summary for a fellow student who was not present. You should write 50–70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the lecture."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <Timer countDownTime={10 * 60} title="Remaining" />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <SummarizeSpokenTextComponent passageId={passageId} audioUrl={questionData.audioUrl} />
        </div>

        <Sst_answer answers={questionData.answers} />
      </div>
    </div>
  );
};

export default Page;
