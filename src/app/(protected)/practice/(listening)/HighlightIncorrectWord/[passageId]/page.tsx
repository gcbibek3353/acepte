import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Header from '@/components/Practice/Header';
import Listening_hiw_answer from '@/components/Practice/listening/Answers/Listening_hiw_answer';
import ListeningHIW from '@/components/Practice/listening/HighlightIncorrectWords/ListeningHIW';
import { QuestionListError } from '@/components/Practice/QuestionListState';
import { ListeningHiwDetail, ApiResponse } from '@/types/listening';

const Page = async ({ params }: { params: Promise<{ passageId: string }> }) => {
  const { passageId } = await params;
  const cookieStore = await cookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const URL = `${apiUrl}/api/v1/practice/listening/highlightIncorrectWords/${passageId}`;

  let data: ApiResponse<ListeningHiwDetail> | null = null;
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
          <span className="text-xs text-muted-foreground">Highlight Incorrect Words</span>
        </div>

        <Header
          questionType="Highlight Incorrect Words"
          instruction="You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different."
          questionUniqueId={questionData.questionId}
          title={questionData.title}
          bookMarkURL={`${URL}/bookmark`}
          bookmarks={questionData.bookmarks}
          difficulty={questionData.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
        />

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
          <ListeningHIW audioUrl={questionData.audioUrl} passage={questionData.passage} passageId={passageId} />
        </div>

        <Listening_hiw_answer answers={questionData.answers} incorrectWords={questionData.incorrectWords} />
      </div>
    </div>
  );
};

export default Page;
