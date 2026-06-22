import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Rop_answer from '@/components/Practice/Reading/Answers/Rop_answer';
import Reorder from '@/components/Practice/Reading/Reorder';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { ReorderDetail, ApiResponse } from '@/types/reading';

const ReadingROPPage = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/reading/reorder/${passageId}`;

  let data: ApiResponse<ReorderDetail> | null = null;
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
          <span className="text-xs text-muted-foreground">Re-order Paragraphs</span>
        </div>

        <Header
          questionType="Re-order Paragraphs"
          instruction="The text boxes in the left panel have been placed in a random order. Restore the original order by dragging the text boxes from the left panel to the right panel."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
          siblings={questionData.siblings}
          currentId={passageId}
          baseRoute="/practice/reading_rop"
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <Reorder passageId={questionData.id} paragraphs={questionData.paragraphs} />
        </div>

        <Rop_answer answers={questionData.answers} paragraphs={questionData.paragraphs} />
      </div>
    </div>
  );
};

export default ReadingROPPage;
