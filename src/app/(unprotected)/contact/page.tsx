"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ── Types & constants ─────────────────────────────────────────────────────────

type FormData = {
  institutionName: string
  contactPerson: string
  email: string
  phone: string
  studentCount: string
  message: string
}

const INITIAL_FORM: FormData = {
  institutionName: "",
  contactPerson: "",
  email: "",
  phone: "",
  studentCount: "",
  message: "",
}

const contactDetails = [
  {
    icon: Mail,
    label: "Email us",
    value: "contact@acepte.com",
    href: "mailto:contact@acepte.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+977 1 4567 890",
    href: "tel:+97714567890",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Durbarmarg, Kathmandu 44600\nBagmati Province, Nepal",
    href: null,
  },
  {
    icon: Clock,
    label: "Business hours",
    value: "Sun–Fri, 9am–6pm NST",
    href: null,
  },
]

const whyUs = [
  "Purpose-built for PTE Academic",
  "Bulk student enrolment & management",
  "Institution-level analytics dashboard",
  "Dedicated partnership support team",
]

const INPUT_CLASS =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"

const LABEL_CLASS = "text-sm font-medium text-foreground block"

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── Page header ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-blue-50/60 to-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sky-100/30 blur-2xl" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 py-14 sm:px-6 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 mb-5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-blue-700 text-xs font-medium tracking-wide">
                Institution Partnership
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Partner with ACEPTE
            </h1>
            <p className="mt-3 text-muted-foreground text-base max-w-xl leading-relaxed">
              Give your students the most effective PTE Academic preparation platform.
              Fill out the form and our team will be in touch within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[360px_1fr] gap-10 lg:gap-14 items-start">

            {/* ── Left: Contact info ── */}
            <div className="space-y-5">

              {/* Pitch card */}
              <div className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1 h-5 rounded-full bg-primary block" />
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Get in touch
                  </p>
                </div>
                <blockquote className="border-l-4 border-l-primary pl-4 mb-4">
                  <p className="text-base font-medium text-foreground leading-relaxed italic">
                    &ldquo;Partner with us to give your students the best PTE preparation
                    experience.&rdquo;
                  </p>
                </blockquote>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We work with universities, colleges, and language schools across
                  Nepal and beyond. Our team will create a tailored plan that fits
                  your institution&apos;s needs.
                </p>
              </div>

              {/* Contact detail cards */}
              <div className="space-y-3">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-border bg-card p-4 flex items-start gap-4 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground whitespace-pre-line">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Why partner */}
              <div className="rounded-lg border border-border bg-muted/40 p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Why institutions choose us
                </p>
                <ul className="space-y-2.5">
                  {whyUs.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-8">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">Enquiry sent!</h2>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Thanks for reaching out. Our partnerships team will get back
                      to you within one business day.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setForm(INITIAL_FORM)
                    }}
                    className="mt-1"
                  >
                    Send another enquiry
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 className="text-xl font-semibold text-foreground">
                      Institution enquiry
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fields marked{" "}
                      <span className="text-destructive font-medium">*</span> are
                      required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Institution name */}
                      <div className="space-y-2">
                        <label htmlFor="institutionName" className={LABEL_CLASS}>
                          Institution name{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="institutionName"
                          name="institutionName"
                          type="text"
                          required
                          placeholder="e.g. Kathmandu Language Academy"
                          value={form.institutionName}
                          onChange={handleChange}
                          className={INPUT_CLASS}
                        />
                      </div>

                      {/* Contact person */}
                      <div className="space-y-2">
                        <label htmlFor="contactPerson" className={LABEL_CLASS}>
                          Contact person{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="contactPerson"
                          name="contactPerson"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={form.contactPerson}
                          onChange={handleChange}
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className={LABEL_CLASS}>
                          Email address{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@institution.edu.np"
                          value={form.email}
                          onChange={handleChange}
                          className={INPUT_CLASS}
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className={LABEL_CLASS}>
                          Phone number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+977 98XXXXXXXX"
                          value={form.phone}
                          onChange={handleChange}
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    {/* Student count */}
                    <div className="space-y-2">
                      <label htmlFor="studentCount" className={LABEL_CLASS}>
                        Estimated number of students{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="studentCount"
                        name="studentCount"
                        required
                        value={form.studentCount}
                        onChange={handleChange}
                        className={cn(INPUT_CLASS, "cursor-pointer")}
                      >
                        <option value="" disabled>
                          Select a range…
                        </option>
                        <option value="<50">Fewer than 50 students</option>
                        <option value="50-200">50–200 students</option>
                        <option value="200-500">200–500 students</option>
                        <option value="500+">500+ students</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className={LABEL_CLASS}>
                        Message / Enquiry{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your institution and what you're looking for…"
                        value={form.message}
                        onChange={handleChange}
                        className={cn(INPUT_CLASS, "resize-none")}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="w-full gap-2"
                    >
                      {isLoading ? (
                        "Sending…"
                      ) : (
                        <>
                          Send Enquiry <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form you agree to be contacted by the ACEPTE
                      partnerships team.
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
