'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { User, Mail, Phone, Globe, Calendar, Target, Clock, Lock, Eye, EyeOff, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'

interface UserProfile {
  id: string
  name: string
  email: string
  image: string | null
  phone: string | null
  gender: Gender | null
  dateOfBirth: string | null
  country: string | null
  targetScore: number | null
  examDate: string | null
  createdAt: string
}

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
  { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
]

function toDateInputValue(iso: string | null) {
  if (!iso) return ''
  return iso.split('T')[0]
}

// ── Password strength rules ────────────────────────────────────────────────

const PASSWORD_RULES = [
  { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'upper', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lower', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /\d/.test(p) },
  { id: 'special', label: 'One special character (!@#$…)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function isStrongPassword(p: string) {
  return PASSWORD_RULES.every((r) => r.test(p))
}

// ── Sub-components ────────────────────────────────────────────────────────

function FieldLabel({ icon: Icon, children }: { icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
      {children}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled,
  min,
  max,
}: {
  value: string
  onChange?: (v: string) => void
  placeholder?: string
  type?: string
  disabled?: boolean
  min?: string | number
  max?: string | number
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      max={max}
      className={cn(
        'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow',
        disabled && 'bg-muted text-muted-foreground cursor-not-allowed'
      )}
    />
  )
}

// ── Password section ───────────────────────────────────────────────────────

function PasswordSection() {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const rules = PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(newPw) }))
  const allPassed = isStrongPassword(newPw)
  const passwordsMatch = newPw === confirmPw

  const handleSave = async () => {
    setTouched(true)
    setError('')
    setSuccess(false)

    if (!currentPw) return setError('Enter your current password.')
    if (!allPassed) return setError('New password does not meet strength requirements.')
    if (!passwordsMatch) return setError('Passwords do not match.')

    setSaving(true)
    try {
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to change password.')
      setSuccess(true)
      setCurrentPw('')
      setNewPw('')
      setConfirmPw('')
      setTouched(false)
      setTimeout(() => setSuccess(false), 4000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to change password.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm p-6 space-y-5">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Lock className="w-5 h-5 text-muted-foreground" />
        Change password
      </h2>

      {/* Current password */}
      <div className="space-y-2">
        <FieldLabel>Current password</FieldLabel>
        <div className="relative">
          <input
            type={showCurrent ? 'text' : 'password'}
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            placeholder="Enter current password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* New password */}
      <div className="space-y-2">
        <FieldLabel>New password</FieldLabel>
        <div className="relative">
          <input
            type={showNew ? 'text' : 'password'}
            value={newPw}
            onChange={(e) => { setNewPw(e.target.value); setTouched(true) }}
            placeholder="Enter new password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Strength checklist — shows as soon as user starts typing */}
        {touched && newPw.length > 0 && (
          <ul className="mt-2 space-y-1">
            {rules.map((r) => (
              <li key={r.id} className={cn('flex items-center gap-2 text-xs', r.passed ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground')}>
                {r.passed
                  ? <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  : <X className="w-3.5 h-3.5 flex-shrink-0" />}
                {r.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-2">
        <FieldLabel>Confirm new password</FieldLabel>
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="Re-enter new password"
            className={cn(
              'w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow',
              touched && confirmPw && !passwordsMatch ? 'border-destructive focus:ring-destructive' : 'border-input'
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {touched && confirmPw && !passwordsMatch && (
          <p className="text-xs text-destructive">Passwords do not match.</p>
        )}
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      {success && <p className="text-sm font-medium text-green-600 dark:text-green-400">Password changed successfully.</p>}

      <div className="flex justify-end pt-1">
        <Button onClick={handleSave} disabled={saving} variant="default" className="px-8">
          {saving ? 'Saving…' : 'Update password'}
        </Button>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { data: session } = authClient.useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [country, setCountry] = useState('')
  const [targetScore, setTargetScore] = useState('')
  const [examDate, setExamDate] = useState('')

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/user/profile', { credentials: 'include' })
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData?.error ?? `HTTP ${res.status}`)
        }
        const data = await res.json()
        const u: UserProfile = data.user;
        console.log(u);

        setProfile(u)
        setName(u.name ?? '')
        setPhone(u.phone ?? '')
        setGender((u.gender as Gender) ?? '')
        setDateOfBirth(toDateInputValue(u.dateOfBirth))
        setCountry(u.country ?? '')
        setTargetScore(u.targetScore?.toString() ?? '')
        setExamDate(toDateInputValue(u.examDate))
      } catch (e: unknown) {
        console.error('[ProfilePage] fetchProfile error:', e)
        setError(e instanceof Error ? e.message : 'Could not load profile.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    if (!name.trim()) return setError('Name is required.')
    setError('')
    setSaving(true)
    setSuccess(false)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone || null,
          gender: gender || null,
          dateOfBirth: dateOfBirth || null,
          country: country || null,
          targetScore: targetScore ? parseInt(targetScore, 10) : null,
          examDate: examDate || null,
        }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData?.error ?? 'Save failed')
      }
      const data = await res.json()
      setProfile((p) => (p ? { ...p, ...data.user } : data.user))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  const initial = (profile?.name ?? session?.user?.name ?? session?.user?.email ?? 'U')
    .charAt(0)
    .toUpperCase()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-destructive">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 space-y-6">

        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile</h1>
          <p className="mt-1 text-muted-foreground">Manage your account information and exam details.</p>
        </div>

        {/* Avatar + identity card */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm flex items-center gap-5">
          {profile?.image ? (
            <Image
              src={profile.image}
              alt={profile.name}
              width={72}
              height={72}
              className="rounded-full object-cover border-2 border-border w-[72px] h-[72px] flex-shrink-0"
            />
          ) : (
            <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-2xl">{initial}</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xl font-semibold text-foreground truncate">{profile?.name}</p>
            <p className="text-sm text-muted-foreground truncate">{profile?.email}</p>
            {profile?.createdAt && (
              <p className="text-xs text-muted-foreground mt-1">
                Member since {new Date(profile.createdAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'long' })}
              </p>
            )}
          </div>
        </div>

        {/* Profile form */}
        <div className="rounded-lg border border-border bg-card shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Personal information</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <FieldLabel icon={User}>Full name</FieldLabel>
              <TextInput value={name} onChange={setName} placeholder="Your full name" />
            </div>

            {/* Email — disabled */}
            <div className="space-y-2">
              <FieldLabel icon={Mail}>Email address</FieldLabel>
              <TextInput value={profile?.email ?? ''} disabled />
              <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <FieldLabel icon={Phone}>Phone number</FieldLabel>
              <TextInput value={phone} onChange={setPhone} placeholder="+61 400 000 000" type="tel" />
            </div>

            {/* Country — text input */}
            <div className="space-y-2">
              <FieldLabel icon={Globe}>Country</FieldLabel>
              <TextInput value={country} onChange={setCountry} placeholder="e.g. Nepal, Australia" />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <FieldLabel>Gender</FieldLabel>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender | '')}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>

            {/* Date of birth */}
            <div className="space-y-2">
              <FieldLabel icon={Calendar}>Date of birth</FieldLabel>
              <TextInput
                type="date"
                value={dateOfBirth}
                onChange={setDateOfBirth}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* PTE exam details */}
          <div className="pt-2 border-t border-border space-y-4">
            <h3 className="text-base font-semibold text-foreground">PTE exam details</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <FieldLabel icon={Target}>Target score</FieldLabel>
                <TextInput
                  type="number"
                  value={targetScore}
                  onChange={setTargetScore}
                  placeholder="e.g. 79"
                  min={10}
                  max={90}
                />
                <p className="text-xs text-muted-foreground">PTE score range: 10–90</p>
              </div>
              <div className="space-y-2">
                <FieldLabel icon={Clock}>Planned exam date</FieldLabel>
                <TextInput
                  type="date"
                  value={examDate}
                  onChange={setExamDate}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          {error && profile && <p className="text-sm font-medium text-destructive">{error}</p>}
          {success && <p className="text-sm font-medium text-green-600 dark:text-green-400">Profile updated successfully.</p>}

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} disabled={saving} className="px-8">
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </div>

        {/* Change password */}
        <PasswordSection />

      </div>
    </div>
  )
}
