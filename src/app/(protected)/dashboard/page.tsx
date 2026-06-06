"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Flame, Target, CalendarDays, TrendingUp, Mic, PenLine, BookOpen, Headphones } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface SectionProgress {
    total: number
    solved: number
}

interface DashboardData {
    streak: number
    activeDates: string[]
    weeklyActivity: { date: string; count: number }[]
    progress: {
        speaking: SectionProgress
        writing: SectionProgress
        reading: SectionProgress
        listening: SectionProgress
    }
    profile: {
        name: string | null
        targetScore: number | null
        examDate: string | null
        daysUntilExam: number | null
    }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDateStr(d: Date): string {
    return d.toISOString().split('T')[0]
}

function getDayLabel(dateStr: string): string {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })
}

function formatExamDate(dateStr: string): string {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ─── Calendar Component ───────────────────────────────────────────────────────

function ActivityCalendar({ activeDates, streak }: { activeDates: string[]; streak: number }) {
    const activeSet = new Set(activeDates)
    const today = toDateStr(new Date())

    // Build last 12 weeks of days (Sun → Sat)
    const weeks: string[][] = []
    const endDate = new Date()
    // Align to Saturday
    const dayOfWeek = endDate.getDay()
    endDate.setDate(endDate.getDate() + (6 - dayOfWeek))

    for (let w = 11; w >= 0; w--) {
        const week: string[] = []
        for (let d = 6; d >= 0; d--) {
            const date = new Date(endDate)
            date.setDate(endDate.getDate() - w * 7 - d)
            week.push(toDateStr(date))
        }
        weeks.push(week)
    }

    const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Activity</span>
                <div className="flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-foreground">{streak} day streak</span>
                </div>
            </div>

            {/* Day labels */}
            <div className="flex gap-1 mb-1 pl-0">
                <div className="grid grid-cols-7 gap-1 w-full">
                    {DAY_LABELS.map(l => (
                        <span key={l} className="text-[10px] text-muted-foreground text-center">{l}</span>
                    ))}
                </div>
            </div>

            {/* Grid: each row = 1 week */}
            <div className="flex flex-col gap-1">
                {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 gap-1">
                        {week.map(dateStr => {
                            const isActive = activeSet.has(dateStr)
                            const isToday = dateStr === today
                            const isFuture = dateStr > today
                            return (
                                <div
                                    key={dateStr}
                                    title={dateStr}
                                    className={cn(
                                        'aspect-square rounded-sm transition-colors',
                                        isFuture && 'bg-muted/30',
                                        !isFuture && !isActive && 'bg-muted hover:bg-muted-foreground/20',
                                        isActive && 'bg-primary',
                                        isToday && !isActive && 'ring-1 ring-primary ring-offset-1 ring-offset-card'
                                    )}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 mt-2 justify-end">
                <span className="text-[10px] text-muted-foreground">Less</span>
                <div className="flex gap-1">
                    {[0.15, 0.35, 0.6, 1].map((o, i) => (
                        <div key={i} className="h-2.5 w-2.5 rounded-sm bg-primary" style={{ opacity: o }} />
                    ))}
                </div>
                <span className="text-[10px] text-muted-foreground">More</span>
            </div>
        </div>
    )
}

// ─── Weekly Bar Chart ─────────────────────────────────────────────────────────

function WeeklyChart({ data }: { data: { date: string; count: number }[] }) {
    const max = Math.max(...data.map(d => d.count), 1)

    return (
        <div>
            <div className="flex items-end gap-2 h-24">
                {data.map(({ date, count }) => (
                    <div key={date} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground tabular-nums">{count > 0 ? count : ''}</span>
                        <div className="w-full rounded-t-sm bg-muted relative overflow-hidden" style={{ height: '64px' }}>
                            <div
                                className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500"
                                style={{ height: `${(count / max) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-1">
                {data.map(({ date }) => (
                    <div key={date} className="flex-1 text-center text-[10px] text-muted-foreground">
                        {getDayLabel(date)}
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Section Progress Card ────────────────────────────────────────────────────

const SECTION_CONFIG = {
    speaking: {
        label: 'Speaking',
        icon: Mic,
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        bar: 'bg-blue-500',
        border: 'border-l-blue-500',
    },
    writing: {
        label: 'Writing',
        icon: PenLine,
        badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
        bar: 'bg-violet-500',
        border: 'border-l-violet-500',
    },
    reading: {
        label: 'Reading',
        icon: BookOpen,
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
        bar: 'bg-emerald-500',
        border: 'border-l-emerald-500',
    },
    listening: {
        label: 'Listening',
        icon: Headphones,
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        bar: 'bg-amber-500',
        border: 'border-l-amber-500',
    },
} as const

function SectionCard({ section, progress }: { section: keyof typeof SECTION_CONFIG; progress: SectionProgress }) {
    const { label, icon: Icon, badge, bar, border } = SECTION_CONFIG[section]
    const pct = progress.total > 0 ? Math.round((progress.solved / progress.total) * 100) : 0

    return (
        <div className={cn('rounded-lg border border-border bg-card shadow-sm border-l-4', border)}>
            <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium flex items-center gap-1', badge)}>
                            <Icon className="h-3 w-3" />
                            {label}
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">
                        {progress.solved} / {progress.total}
                    </span>
                </div>
                <div className="flex items-end justify-between mb-1.5">
                    <span className="text-2xl font-bold text-foreground tabular-nums">{pct}%</span>
                    <span className="text-xs text-muted-foreground">complete</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                        className={cn('h-full rounded-full transition-all duration-700', bar)}
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>
        </div>
    )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ data }: { data: DashboardData }) {
    const { profile, streak, activeDates } = data

    return (
        <div className="flex flex-col gap-4">
            {/* Exam countdown */}
            {profile.examDate && (
                <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Exam Date</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{formatExamDate(profile.examDate)}</p>
                    {profile.daysUntilExam !== null && (
                        <div className={cn(
                            'rounded-md px-3 py-2 text-center',
                            profile.daysUntilExam <= 7
                                ? 'bg-destructive/10 text-destructive'
                                : profile.daysUntilExam <= 30
                                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                    : 'bg-primary/10 text-primary'
                        )}>
                            {profile.daysUntilExam > 0 ? (
                                <>
                                    <span className="text-2xl font-bold tabular-nums">{profile.daysUntilExam}</span>
                                    <span className="text-xs block">days remaining</span>
                                </>
                            ) : profile.daysUntilExam === 0 ? (
                                <span className="text-sm font-semibold">Exam is today!</span>
                            ) : (
                                <span className="text-sm font-semibold">Exam passed</span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Target score */}
            {profile.targetScore !== null && (
                <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Target Score</span>
                    </div>
                    <div className="rounded-md bg-primary/10 px-3 py-2 text-center">
                        <span className="text-3xl font-bold text-primary tabular-nums">{profile.targetScore}</span>
                        <span className="text-xs text-muted-foreground block">out of 90</span>
                    </div>
                </div>
            )}

            {/* Prompt if exam or target not set */}
            {(!profile.examDate || profile.targetScore === null) && (
                <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">
                        Set your{!profile.examDate && profile.targetScore === null ? ' exam date and target score' : !profile.examDate ? ' exam date' : ' target score'} in your profile to unlock personalized tracking.
                    </p>
                </div>
            )}

            {/* Calendar */}
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <ActivityCalendar activeDates={activeDates} streak={streak} />
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/v1/user/dashboard')
            .then(r => r.json())
            .then(json => {
                if (json.success) setData(json.data)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Failed to load dashboard.</p>
            </div>
        )
    }

    const totalSolved = Object.values(data.progress).reduce((s, p) => s + p.solved, 0)
    const totalQuestions = Object.values(data.progress).reduce((s, p) => s + p.total, 0)

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6">

                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {data.profile.name ? `Welcome back, ${data.profile.name.split(' ')[0]}` : 'Dashboard'}
                    </h1>
                    <p className="mt-1 text-muted-foreground">Track your PTE preparation progress</p>
                </div>

                <div className="flex gap-6 items-start">

                    {/* ── Main content ── */}
                    <div className="flex-1 min-w-0 flex flex-col gap-6">

                        {/* Summary stat row */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-center">
                                <p className="text-2xl font-bold text-foreground tabular-nums">{totalSolved}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Questions solved</p>
                            </div>
                            <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-center">
                                <p className="text-2xl font-bold text-foreground tabular-nums">{totalQuestions}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Total questions</p>
                            </div>
                            <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Flame className="h-5 w-5 text-orange-500" />
                                    <p className="text-2xl font-bold text-foreground tabular-nums">{data.streak}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Day streak</p>
                            </div>
                        </div>

                        {/* Weekly activity */}
                        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <h2 className="text-base font-semibold text-foreground">Weekly Activity</h2>
                            </div>
                            <WeeklyChart data={data.weeklyActivity} />
                        </div>

                        {/* Section progress */}
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Progress by Section</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {(['speaking', 'writing', 'reading', 'listening'] as const).map(section => (
                                    <SectionCard
                                        key={section}
                                        section={section}
                                        progress={data.progress[section]}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Fixed right sidebar ── */}
                    <div className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-6">
                            <Sidebar data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
