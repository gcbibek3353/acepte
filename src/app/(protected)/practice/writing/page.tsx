import Link from 'next/link'

const sections = [
  {
    href: '/practice/summarize-written-text',
    title: 'Summarize Written Text',
    description: 'Read a passage and write a one-sentence summary in 5–10 minutes.',
  },
  {
    href: '/practice/write_essay',
    title: 'Write Essay',
    description: 'Write a 200–300 word essay in response to a prompt in 20 minutes.',
  },
]

const WritingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              Writing
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Writing Practice</h1>
          <p className="mt-1 text-muted-foreground">
            Choose a question type to start practising your written English skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-12 rounded-full bg-violet-500 shrink-0 mt-0.5" />
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

export default WritingPage
