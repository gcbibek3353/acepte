import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Timer from '@/components/Practice/Timer';
import EssayTextArea from '@/components/Practice/Writing/writeEssay/EssayTextArea';
import WriteEssayAnswer from '@/components/Practice/Writing/writeEssay/WriteEssayAnswer';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { WriteEssayDetail, ApiResponse } from '@/types/writing';

const WriteEssayDetailPage = async ({ params }: { params: Promise<{ essay_id: string }> }) => {
  const { essay_id } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/writing/writeEssay/${essay_id}`;

  let data: ApiResponse<WriteEssayDetail> | null = null;
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
          <span className="text-xs text-muted-foreground">Write Essay</span>
        </div>

        <Header
          questionType="Write Essay"
          instruction="You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200–300 words."
          questionUniqueId={questionData.questionId}
          title={questionData.essayTitle}
          bookMarkURL={`${URL}/bookmark`}
          description={questionData.essay_description}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
          siblings={questionData.siblings}
          currentId={essay_id}
          baseRoute="/practice/write_essay"
        />

        <Timer countDownTime={20 * 60} title="Remaining time" />

        <EssayTextArea essayId={essay_id} />

        <WriteEssayAnswer
          answers={questionData.answers}
          questionId={questionData.id}
          questionTitle={questionData.essayTitle}
        />
      </div>
    </div>
  );
};

export default WriteEssayDetailPage;
