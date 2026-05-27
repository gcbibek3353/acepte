import FilterQuestions2 from '@/components/Practice/FilterQuestions2';
import { cookies } from 'next/headers';

const HighlightIncorrectWordPage = async () => {
  const cookieStore = await cookies();

  let initialData;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/highlightIncorrectWords?page=1&limit=10`,
      {
        headers: { Cookie: cookieStore.toString() },
        cache: 'no-store',
      }
    );
    if (res.ok) {
      const json = await res.json();
      initialData = json.data;
    }
  } catch {
    // server fetch failed — FilterQuestions2 will fetch on the client instead
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              Listening
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Highlight Incorrect Words</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Listen and click words in the transcript that differ from what you hear.
          </p>
        </div>
        <FilterQuestions2
          apiPath="/api/v1/practice/listening/highlightIncorrectWords"
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default HighlightIncorrectWordPage;
