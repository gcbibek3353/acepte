import FilterQuestions2 from '@/components/Practice/FilterQuestions2';
import { cookies } from 'next/headers';

const RespondToASituation = async () => {
  const cookieStore = await cookies();

  let initialData;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/speaking/respond-to-a-situation?page=1&limit=10`,
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
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              Speaking
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Respond to a Situation</h1>
          <p className="mt-1 text-muted-foreground">
            Listen to and read a situation description, then respond as completely as you can.
          </p>
        </div>
        <FilterQuestions2
          apiPath="/api/v1/practice/speaking/respond-to-a-situation"
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default RespondToASituation;
