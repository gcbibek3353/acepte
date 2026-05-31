'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { LogOut, User, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const DropdownValues = {
  speaking: [
    { title: 'Read Aloud', link: '/practice/readAloud' },
    { title: 'Repeat Sentence', link: '/practice/repeatSentence' },
    { title: 'Describe Image', link: '/practice/describeImage' },
    { title: 'Re-tell Lecture', link: '/practice/retellLecture' },
    { title: 'Answer Short Question', link: '/practice/answerShortQuestions' },
    { title: 'Summarize Group Discussion', link: '/practice/summarizeGroupDiscussions' },
    { title: 'Respond to a Situation', link: '/practice/respondToASituation' },
  ],
  writing: [
    { title: 'Summarize Written Text', link: '/practice/summarize-written-text' },
    { title: 'Write Essay', link: '/practice/write_essay' },
  ],
  reading: [
    { title: 'Fill in the Blanks (Dropdown)', link: '/practice/reading_fib_dr' },
    { title: 'Multiple Choice (Multiple)', link: '/practice/reading_mcm' },
    { title: 'Re-order Paragraphs', link: '/practice/reading_rop' },
    { title: 'Fill in the Blanks (Drag & Drop)', link: '/practice/reading_fib_d&d' },
    { title: 'Multiple Choice (Single)', link: '/practice/reading_mcs' },
  ],
  listening: [
    { title: 'Summarize Spoken Text', link: '/practice/summarize_spoken_text' },
    { title: 'Multiple Choice (Multiple)', link: '/practice/MultipleChoiceMultiple' },
    { title: 'Fill in the Blanks', link: '/practice/fill_in_the_blanks' },
    { title: 'Highlight Correct Summary', link: '/practice/HighlightCorrectSummary' },
    { title: 'Multiple Choice (Single)', link: '/practice/MultipleChoiceSingle' },
    { title: 'Select Missing Word', link: '/practice/SelectMissingWord' },
    { title: 'Highlight Incorrect Words', link: '/practice/HighlightIncorrectWord' },
    { title: 'Write From Dictation', link: '/practice/WriteFromDictation' },
  ],
}

interface SectionDropdownProps {
  title: string
  items: { title: string; link: string }[]
  accent: string
}

const SectionDropdown: React.FC<SectionDropdownProps> = ({ title, items, accent }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
      >
        {title}
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-56 bg-card border border-border rounded-lg shadow-md z-50 py-1">
          <div className={cn('h-0.5 rounded-t-lg mb-1', accent)} />
          {items.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function UserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (isPending) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
  }

  if (!session?.user) {
    return (
      <Button asChild size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    )
  }

  const user = session.user
  const initial = user.name?.charAt(0).toUpperCase() ?? user.email.charAt(0).toUpperCase()

  const handleSignOut = async () => {
    await authClient.signOut()
    setOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="User menu"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? 'User'}
            width={34}
            height={34}
            className="w-[34px] h-[34px] rounded-full object-cover border-2 border-border"
          />
        ) : (
          <div className="w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center border-2 border-primary/20">
            <span className="text-primary-foreground font-semibold text-sm leading-none">{initial}</span>
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-lg shadow-md z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <User className="w-4 h-4 text-muted-foreground" />
              View profile
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm leading-none">A</span>
            </div>
            <span className="font-bold text-base text-foreground tracking-tight">ACEPTE</span>
          </Link>

          {/* Section dropdowns — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            <SectionDropdown title="Speaking" items={DropdownValues.speaking} accent="bg-blue-500" />
            <SectionDropdown title="Writing" items={DropdownValues.writing} accent="bg-violet-500" />
            <SectionDropdown title="Reading" items={DropdownValues.reading} accent="bg-emerald-500" />
            <SectionDropdown title="Listening" items={DropdownValues.listening} accent="bg-amber-500" />
          </div>

          {/* Auth area */}
          <UserMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
