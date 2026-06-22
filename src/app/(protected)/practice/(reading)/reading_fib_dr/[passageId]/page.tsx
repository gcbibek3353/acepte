import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Fib_dr_answer from '@/components/Practice/Reading/Answers/Fib_dr_answer';
import FibDropDownComponent from '@/components/Practice/Reading/FibDropDown';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { FibDropdownDetail, ApiResponse } from '@/types/reading';

const FIBDropDown = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/reading/fibDropDown/${passageId}`;

  let data: ApiResponse<FibDropdownDetail> | null = null;
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
          <span className="text-xs text-muted-foreground">Fill in the Blanks (Dropdown)</span>
        </div>

        <Header
          questionType="Fill in the Blanks (Dropdown)"
          instruction="There are some words missing in the following text. Please select the correct word in the drop-down box."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
          siblings={questionData.siblings}
          currentId={passageId}
          baseRoute="/practice/reading_fib_dr"
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <FibDropDownComponent passage={questionData.content} passageId={passageId} blanks={questionData.blanks} />
        </div>

        <Fib_dr_answer answers={questionData.answers} blanks={questionData.blanks} />
      </div>
    </div>
  );
};

export default FIBDropDown;
