import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import SpeakingAnswer from '@/components/Practice/Speaking/Answer/SpeakingAnswer';
import Describe_image from '@/components/Practice/Speaking/DescribeImage';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { DescribeImageDetail, ApiResponse } from '@/types/speaking';

const Page = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/speaking/describe-image/${passageId}`;

  let data: ApiResponse<DescribeImageDetail> | null = null;
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
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            Speaking
          </span>
          <span className="text-muted-foreground text-xs">›</span>
          <span className="text-xs text-muted-foreground">Describe Image</span>
        </div>

        <Header
          questionType="Describe Image"
          instruction="Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing. You will have 40 seconds to give your response."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <Describe_image imageUrl={questionData.imageUrl as string} questionId={passageId} />
        </div>

        <SpeakingAnswer
          answers={questionData.answers}
          questionId={questionData.questionId}
          questionTitle={questionData.title}
        />
      </div>
    </div>
  );
};

export default Page;
