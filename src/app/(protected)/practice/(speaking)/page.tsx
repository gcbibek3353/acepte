import Link from 'next/link'

const sections = [
  {
    href: '/practice/readAloud',
    title: 'Read Aloud',
    description: 'Read a text passage aloud naturally and clearly within 40 seconds.',
  },
  {
    href: '/practice/repeatSentence',
    title: 'Repeat Sentence',
    description: 'Listen to a sentence and repeat it exactly as you heard it.',
  },
  {
    href: '/practice/describeImage',
    title: 'Describe Image',
    description: 'Look at an image and describe what it shows in detail.',
  },
  {
    href: '/practice/retellLecture',
    title: 'Re-tell Lecture',
    description: 'Listen to a lecture and retell it in your own words.',
  },
  {
    href: '/practice/answerShortQuestions',
    title: 'Answer Short Questions',
    description: 'Give a simple, short answer to a spoken question.',
  },
  {
    href: '/practice/respondToASituation',
    title: 'Respond to a Situation',
    description: 'Listen to and read a situation description, then respond completely.',
  },
  {
    href: '/practice/summarizeGroupDiscussions',
    title: 'Summarize Group Discussion',
    description: 'Listen to a group discussion and summarize the key points.',
  },
]

const SpeakingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              Speaking
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Speaking Practice</h1>
          <p className="mt-1 text-muted-foreground">
            Choose a question type to start practising your spoken English skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-12 rounded-full bg-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpeakingPage
