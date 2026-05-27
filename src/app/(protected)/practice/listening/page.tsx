import Link from 'next/link'

const sections = [
  {
    href: '/practice/summarize_spoken_text',
    title: 'Summarize Spoken Text',
    description: 'Listen to a lecture and write a 50–70 word summary in 10 minutes.',
  },
  {
    href: '/practice/MultipleChoiceMultiple',
    title: 'Multiple Choice (Multiple)',
    description: 'Listen to a recording and select all correct answers from the options given.',
  },
  {
    href: '/practice/fill_in_the_blanks',
    title: 'Fill in the Blanks',
    description: 'Listen to a recording and type the missing words into the transcript.',
  },
  {
    href: '/practice/HighlightCorrectSummary',
    title: 'Highlight Correct Summary',
    description: 'Select the paragraph that best summarizes the recording.',
  },
  {
    href: '/practice/MultipleChoiceSingle',
    title: 'Multiple Choice (Single)',
    description: 'Listen to a recording and select the single best answer from the options given.',
  },
  {
    href: '/practice/SelectMissingWord',
    title: 'Select Missing Word',
    description: 'Predict the missing word that completes the end of a recording.',
  },
  {
    href: '/practice/HighlightIncorrectWord',
    title: 'Highlight Incorrect Word',
    description: 'Follow the transcript and click on words that differ from the audio.',
  },
  {
    href: '/practice/WriteFromDictation',
    title: 'Write From Dictation',
    description: 'Listen to a sentence and type it exactly as you heard it.',
  },
]

const ListeningPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              Listening
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Listening Practice</h1>
          <p className="mt-1 text-muted-foreground">
            Choose a question type to start practising your listening comprehension skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-12 rounded-full bg-amber-500 shrink-0 mt-0.5" />
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

export default ListeningPage
