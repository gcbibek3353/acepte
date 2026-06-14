import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Mic,
  PenLine,
  BookOpen,
  Headphones,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react"
import MeaningfulParagraph from "@/components/Dictionary/MeaningfulParagraph"

// ── Data ──────────────────────────────────────────────────────────────────────

const sections = [
  {
    icon: Mic,
    label: "Speaking",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-l-blue-500",
    badge: "bg-blue-100 text-blue-700",
    tasks: ["Read Aloud", "Repeat Sentence", "Describe Image", "Retell Lecture", "Answer Short Question"],
  },
  {
    icon: PenLine,
    label: "Writing",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-l-violet-500",
    badge: "bg-violet-100 text-violet-700",
    tasks: ["Summarize Written Text", "Write Essay"],
  },
  {
    icon: BookOpen,
    label: "Reading",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-l-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    tasks: ["Multiple Choice", "Re-order Paragraphs", "Fill in the Blanks", "Reading & Writing FIB"],
  },
  {
    icon: Headphones,
    label: "Listening",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-l-amber-500",
    badge: "bg-amber-100 text-amber-700",
    tasks: ["Summarize Spoken Text", "Multiple Choice", "Highlight Correct Summary", "Select Missing Word"],
  },
]

const features = [
  {
    icon: Zap,
    title: "Instant Feedback",
    desc: "Get scored the moment you submit. Understand exactly where you lost marks and how to improve.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    desc: "Track your improvement over time with section-wise breakdowns and trend charts.",
  },
  {
    icon: CheckCircle,
    title: "Real Exam Format",
    desc: "Practice in the same format as the actual PTE Academic test — no surprises on exam day.",
  },
  {
    icon: Globe,
    title: "All Four Sections",
    desc: "Comprehensive coverage of Speaking, Writing, Reading, and Listening in one platform.",
  },
]

const stats = [
  { value: "10,000+", label: "Students prepared" },
  { value: "4", label: "PTE sections covered" },
  { value: "500+", label: "Practice questions" },
  { value: "90", label: "Max PTE score achievable" },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-blue-50/60 to-background">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sky-100/40 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse block" />
              <span className="text-blue-700 text-xs font-medium tracking-wide">PTE Academic Preparation Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Score higher on{" "}
              <span className="text-primary">PTE Academic</span>
              {" "}with focused practice
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              ACEPTE gives you real exam-style questions, instant AI feedback, and detailed analytics across all four PTE sections — so you can walk into the exam with confidence.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2 px-8">
                <Link href="/login">
                  Get started <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Contact your institution
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            {stats.map(({ value, label }) => (
              <div key={label} className="px-6 py-8 text-center">
                <p className="text-3xl font-bold text-primary">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PTE Sections ── */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Complete PTE coverage
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Practice every task type across all four sections of the PTE Academic exam.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sections.map(({ icon: Icon, label, color, bg, border, badge, tasks }) => (
              <div
                key={label}
                className={`rounded-lg border border-border bg-card shadow-sm border-l-4 ${border} p-6 flex flex-col gap-4`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className={`text-xs font-medium rounded-full px-3 py-1 ${badge}`}>{label}</span>
                </div>
                <ul className="space-y-1.5">
                  {tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${color}`} />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 sm:py-24 bg-muted/40 border-y border-border">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Built for exam success
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Everything you need to prepare efficiently and hit your target score.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 px-8 py-14 sm:px-14 text-center">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-500/20 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-sky-400/15 blur-2xl" />
            </div>

            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-medium text-sky-200 tracking-wide mb-6">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse block" />
                Start your preparation today
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ready to achieve your target score?
              </h2>
              <p className="mt-4 text-blue-100/75 max-w-xl mx-auto">
                Sign in with your institution account and start practising with real PTE question types right away.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 gap-2 px-8"
                >
                  <Link href="/login">
                    Sign in to get started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-blue-200 hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Institution enquiries →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">A</span>
            </div>
            <span className="font-semibold text-sm text-foreground">ACEPTE</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 ACEPTE. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
