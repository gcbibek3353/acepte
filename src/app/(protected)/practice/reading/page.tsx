import Link from 'next/link'

const sections = [
  {
    href: '/practice/reading_rop',
    title: 'Re-order Paragraphs',
    description: 'Restore the original order of a text by rearranging its paragraphs.',
  },
  {
    href: '/practice/reading_fib_d&d',
    title: 'Fill in the Blanks (Drag & Drop)',
    description: 'Complete a passage by dragging words into the correct blanks.',
  },
  {
    href: '/practice/reading_fib_dr',
    title: 'Fill in the Blanks (Dropdown)',
    description: 'Complete a passage by selecting the correct word from each dropdown.',
  },
  {
    href: '/practice/reading_mcm',
    title: 'Multiple Choice (Multiple)',
    description: 'Read a passage and select all correct answers from the options given.',
  },
  {
    href: '/practice/reading_mcs',
    title: 'Multiple Choice (Single)',
    description: 'Read a passage and select the single best answer from the options given.',
  },
]

const ReadingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              Reading
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reading Practice</h1>
          <p className="mt-1 text-muted-foreground">
            Choose a question type to start practising your reading comprehension skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-12 rounded-full bg-emerald-500 shrink-0 mt-0.5" />
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

export default ReadingPage
