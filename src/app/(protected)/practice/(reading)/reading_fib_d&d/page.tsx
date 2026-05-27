import FilterQuestions2 from '@/components/Practice/FilterQuestions2';
import { cookies } from 'next/headers';

const ReadingFIBDragAndDrop = async () => {
  const cookieStore = await cookies();

  let initialData;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/reading/fibDragDrop?page=1&limit=10`,
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
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              Reading
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Fill in the Blanks (Drag &amp; Drop)</h1>
          <p className="mt-1 text-muted-foreground">Drag words from the box to the appropriate blanks in the text.</p>
        </div>
        <FilterQuestions2
          apiPath="/api/v1/practice/reading/fibDragDrop"
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default ReadingFIBDragAndDrop;
