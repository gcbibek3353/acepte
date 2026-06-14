"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Plus, Archive, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/MockTest/Admin/StatusBadge";
import SectionCard from "@/components/MockTest/Admin/SectionCard";

type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";
type PteSection = "SPEAKING" | "WRITING" | "READING" | "LISTENING";

interface MockTestQuestion {
  id: string;
  order: number;
  questionType: string;
  questionId: string;
  questionPreview: { id: string; title: string; questionId: string } | null;
}

interface Section {
  id: string;
  section: PteSection;
  order: number;
  timeLimit: number;
  instructions: string | null;
  questions: MockTestQuestion[];
}

interface MockTest {
  id: string;
  title: string;
  description: string | null;
  totalTime: number;
  status: Status;
  sections: Section[];
  _count: { attempts: number };
}

const SECTION_ORDER: PteSection[] = ["SPEAKING", "WRITING", "READING", "LISTENING"];
const SECTION_DEFAULT_TIMES: Record<PteSection, number> = {
  SPEAKING: 30, WRITING: 37, READING: 30, LISTENING: 43,
};

export default function AdminMockTestEditPage() {
  const { testId } = useParams<{ testId: string }>();
  const router = useRouter();

  const [test, setTest]           = useState<MockTest | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  // Edit test meta state
  const [editingMeta, setEditingMeta] = useState(false);
  const [metaTitle, setMetaTitle]     = useState("");
  const [metaDesc, setMetaDesc]       = useState("");
  const [savingMeta, setSavingMeta]   = useState(false);
  const [metaError, setMetaError]     = useState<string | null>(null);

  // Add section state
  const [addingSection, setAddingSection] = useState<PteSection | null>(null);
  const [sectionTime, setSectionTime]     = useState("");
  const [savingSection, setSavingSection] = useState(false);

  // Publish state
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError]     = useState<string | null>(null);

  const fetchTest = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/admin/mocktest/${testId}`);
      const json = await res.json();
      if (!res.ok) { setError(json.message ?? "Failed to load test"); return; }
      setTest(json.data);
      setMetaTitle(json.data.title);
      setMetaDesc(json.data.description ?? "");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => { fetchTest(); }, [fetchTest]);

  // ── Meta update ──────────────────────────────────────────────────────────────
  async function handleSaveMeta() {
    setSavingMeta(true);
    setMetaError(null);
    try {
      const res = await fetch(`/api/v1/admin/mocktest/${testId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: metaTitle.trim(),
          description: metaDesc.trim() || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) { setMetaError(json.message); return; }
      setTest((prev) => prev ? { ...prev, title: json.data.title, description: json.data.description } : prev);
      setEditingMeta(false);
    } catch {
      setMetaError("Network error");
    } finally {
      setSavingMeta(false);
    }
  }

  // ── Publish / Archive ────────────────────────────────────────────────────────
  async function handleStatusChange(status: Status) {
    setPublishLoading(true);
    setPublishError(null);
    try {
      const res = await fetch(`/api/v1/admin/mocktest/${testId}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok) { setPublishError(json.message); return; }
      setTest((prev) => prev ? { ...prev, status } : prev);
    } catch {
      setPublishError("Network error");
    } finally {
      setPublishLoading(false);
    }
  }

  // ── Delete test ──────────────────────────────────────────────────────────────
  async function handleDeleteTest() {
    if (!confirm("Delete this test? This cannot be undone.")) return;
    const res = await fetch(`/api/v1/admin/mocktest/${testId}`, { method: "DELETE" });
    if (res.ok) { router.push("/admin_dashboard/mocktest"); }
    else {
      const json = await res.json();
      setError(json.message ?? "Failed to delete");
    }
  }

  // ── Add section ──────────────────────────────────────────────────────────────
  async function handleAddSection(section: PteSection) {
    const time = parseInt(sectionTime) || SECTION_DEFAULT_TIMES[section];
    const existingOrders = test?.sections.map((s) => s.order) ?? [];
    const order = Math.max(0, ...existingOrders) + 1;

    setSavingSection(true);
    try {
      const res = await fetch(`/api/v1/admin/mocktest/${testId}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, order, timeLimit: time }),
      });
      const json = await res.json();
      if (!res.ok) { alert(json.message); return; }
      setAddingSection(null);
      setSectionTime("");
      fetchTest();
    } finally {
      setSavingSection(false);
    }
  }

  // ── Section callbacks ────────────────────────────────────────────────────────
  async function handleUpdateSection(sectionId: string, data: { timeLimit?: number; instructions?: string }) {
    const res = await fetch(`/api/v1/admin/mocktest/${testId}/sections/${sectionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) fetchTest();
    else { const json = await res.json(); alert(json.message); }
  }

  async function handleDeleteSection(sectionId: string) {
    const res = await fetch(`/api/v1/admin/mocktest/${testId}/sections/${sectionId}`, { method: "DELETE" });
    if (res.ok) fetchTest();
    else { const json = await res.json(); alert(json.message); }
  }

  async function handleAddQuestion(sectionId: string, questionType: string, questionId: string) {
    const res = await fetch(`/api/v1/admin/mocktest/${testId}/sections/${sectionId}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionType, questionId }),
    });
    if (res.ok) fetchTest();
    else { const json = await res.json(); throw new Error(json.message); }
  }

  async function handleRemoveQuestion(mqId: string) {
    const section = test?.sections.find((s) => s.questions.some((q) => q.id === mqId));
    if (!section) return;
    const res = await fetch(
      `/api/v1/admin/mocktest/${testId}/sections/${section.id}/questions/${mqId}`,
      { method: "DELETE" }
    );
    if (res.ok) fetchTest();
    else { const json = await res.json(); alert(json.message); }
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground gap-3">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading test...</span>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-destructive text-sm">{error ?? "Test not found"}</p>
        <Link href="/admin_dashboard/mocktest">
          <Button variant="secondary">Back to list</Button>
        </Link>
      </div>
    );
  }

  const isPublished = test.status === "PUBLISHED";
  const existingSectionTypes = new Set(test.sections.map((s) => s.section));
  const availableSections = SECTION_ORDER.filter((s) => !existingSectionTypes.has(s));
  const sortedSections = [...test.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">

        {/* Back link */}
        <Link
          href="/admin_dashboard/mocktest"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> All Tests
        </Link>

        {/* Test meta header */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          {editingMeta ? (
            <div className="space-y-4">
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Test title"
              />
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={2}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Description (optional)"
              />
              {metaError && <p className="text-sm text-destructive">{metaError}</p>}
              <div className="flex gap-2">
                <Button onClick={handleSaveMeta} disabled={savingMeta} className="gap-2">
                  {savingMeta ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  Save
                </Button>
                <Button variant="secondary" onClick={() => { setEditingMeta(false); setMetaError(null); }}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-semibold text-foreground">{test.title}</h1>
                  <StatusBadge status={test.status} />
                </div>
                {test.description && (
                  <p className="text-sm text-muted-foreground mb-2">{test.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{test.sections.reduce((s, x) => s + x.timeLimit, 0)} min total</span>
                  <span>{test._count.attempts} attempt{test._count.attempts !== 1 ? "s" : ""}</span>
                  <span>{test.sections.length} section{test.sections.length !== 1 ? "s" : ""}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!isPublished && (
                  <Button variant="secondary" size="sm" onClick={() => setEditingMeta(true)}>
                    Edit Details
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Publish / Archive bar */}
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-3">
            {test.status === "DRAFT" && (
              <Button
                onClick={() => handleStatusChange("PUBLISHED")}
                disabled={publishLoading}
                className="gap-2"
              >
                {publishLoading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
                Publish
              </Button>
            )}
            {test.status === "PUBLISHED" && (
              <Button
                variant="secondary"
                onClick={() => handleStatusChange("ARCHIVED")}
                disabled={publishLoading}
                className="gap-2"
              >
                {publishLoading ? <Loader2 size={14} className="animate-spin" /> : <Archive size={14} />}
                Archive
              </Button>
            )}
            {test.status === "ARCHIVED" && (
              <Button
                variant="secondary"
                onClick={() => handleStatusChange("DRAFT")}
                disabled={publishLoading}
                className="gap-2"
              >
                {publishLoading ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                Restore to Draft
              </Button>
            )}
            {publishError && <p className="text-sm text-destructive">{publishError}</p>}
            {test.status === "DRAFT" && test._count.attempts === 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDeleteTest}
                className="ml-auto text-destructive hover:text-destructive border-destructive/30 hover:border-destructive"
              >
                Delete Test
              </Button>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Sections</h2>
          {!isPublished && availableSections.length > 0 && !addingSection && (
            <div className="flex flex-wrap gap-2">
              {availableSections.map((section) => (
                <Button
                  key={section}
                  variant="secondary"
                  size="sm"
                  onClick={() => { setAddingSection(section); setSectionTime(String(SECTION_DEFAULT_TIMES[section])); }}
                  className="gap-1.5 text-xs"
                >
                  <Plus size={13} /> {section}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Add section form */}
        {addingSection && (
          <div className="mb-4 rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm font-medium text-foreground mb-3">
              Add <span className="text-primary">{addingSection}</span> section
            </p>
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground">Time limit:</label>
              <input
                type="number"
                value={sectionTime}
                onChange={(e) => setSectionTime(e.target.value)}
                min="1"
                className="w-20 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
              <Button onClick={() => handleAddSection(addingSection)} disabled={savingSection} className="gap-1.5">
                {savingSection ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                Add Section
              </Button>
              <Button variant="secondary" onClick={() => setAddingSection(null)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Section cards */}
        {sortedSections.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 py-16 text-center text-muted-foreground text-sm">
            No sections yet. Add a section to start building the test.
          </div>
        ) : (
          <div className="space-y-4">
            {sortedSections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                isPublished={isPublished}
                onUpdateSection={handleUpdateSection}
                onDeleteSection={handleDeleteSection}
                onAddQuestion={handleAddQuestion}
                onRemoveQuestion={handleRemoveQuestion}
              />
            ))}
          </div>
        )}

        {/* Publish hint */}
        {test.status === "DRAFT" && (
          <div className="mt-8 rounded-lg border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
            <strong className="font-medium text-foreground">Ready to publish?</strong> Make sure every section has at
            least one question, then click <strong>Publish</strong> above. Published tests are visible to all students.
          </div>
        )}
      </div>
    </div>
  );
}
