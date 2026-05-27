import Link from 'next/link'

const sections = [
  {
    href: '/practice/speaking',
    title: 'Speaking',
    description: 'Read aloud, repeat sentences, describe images, and more.',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    accent: 'bg-blue-500',
    hover: 'hover:border-blue-300 dark:hover:border-blue-700',
    count: 7,
  },
  {
    href: '/practice/writing',
    title: 'Writing',
    description: 'Summarize written text and write essays under timed conditions.',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    accent: 'bg-violet-500',
    hover: 'hover:border-violet-300 dark:hover:border-violet-700',
    count: 2,
  },
  {
    href: '/practice/reading',
    title: 'Reading',
    description: 'Re-order paragraphs, fill blanks, and answer comprehension questions.',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    accent: 'bg-emerald-500',
    hover: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    count: 5,
  },
  {
    href: '/practice/listening',
    title: 'Listening',
    description: 'Summarize lectures, fill blanks, and identify correct information.',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    accent: 'bg-amber-500',
    hover: 'hover:border-amber-300 dark:hover:border-amber-700',
    count: 8,
  },
]

const PracticePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Practice</h1>
          <p className="mt-1 text-muted-foreground">
            Select a section to practise your PTE Academic skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`group rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all ${section.hover}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-1 h-12 rounded-full ${section.accent} shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${section.badge}`}>
                      {section.count} types
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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

export default PracticePage
