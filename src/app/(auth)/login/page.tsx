"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, Award, CheckCircle2, Eye, EyeOff } from "lucide-react"

const features = [
  { icon: BookOpen, text: "Comprehensive PTE practice materials" },
  { icon: Target, text: "Targeted section-wise mock tests" },
  { icon: Award, text: "AI-powered performance analytics" },
  { icon: CheckCircle2, text: "Trusted by thousands of students" },
]

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const loginHandler = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    setError("")
    setIsLoading(true)
    try {
      await authClient.signIn.email(
        { email, password, callbackURL: "/dashboard", rememberMe: false },
        {
          onSuccess: () => router.push("/dashboard"),
          onError: () => setError("Invalid email or password. Please try again."),
        }
      )
    } catch (_e) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") loginHandler()
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel: Branding ── */}
      <div className="hidden lg:flex lg:w-[58%] relative flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sky-400/15 blur-3xl translate-x-1/3 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-blue-300/10 blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 flex flex-col h-full px-14 py-10 justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-xl leading-none">A</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ACEPTE</span>
          </div>

          {/* Hero copy */}
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse block" />
                <span className="text-sky-200 text-xs font-medium tracking-wide uppercase">
                  PTE Academic Preparation
                </span>
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight">
                Achieve your target<br />
                <span className="text-sky-300">PTE score</span> with<br />
                confidence.
              </h1>

              <p className="text-blue-100/75 text-base leading-relaxed max-w-md">
                Practice with real exam-style questions, get instant AI feedback, and track your progress across Speaking, Writing, Reading, and Listening.
              </p>
            </div>

            {/* Feature list */}
            <div className="grid gap-3">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-sky-300" />
                  </div>
                  <span className="text-blue-100/85 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Section color dots */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { label: "Speaking", color: "bg-blue-400" },
                { label: "Writing", color: "bg-violet-400" },
                { label: "Reading", color: "bg-emerald-400" },
                { label: "Listening", color: "bg-amber-400" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-blue-200/60 text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-blue-200/40 text-xs">© 2025 ACEPTE. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-6 py-12 sm:px-12">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-lg text-foreground">ACEPTE</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="mt-1 text-muted-foreground text-sm">Sign in to continue your preparation</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground block">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            {/* Submit */}
            <Button
              onClick={loginHandler}
              disabled={isLoading}
              size="lg"
              className="w-full"
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </div>

          {/* Footer links */}
          <div className="mt-8 pt-6 border-t border-border space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <span className="text-foreground font-medium">
                Contact your institution administrator.
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Institution interested in ACEPTE?{" "}
              <Link href="/contact" className="text-primary font-medium hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
