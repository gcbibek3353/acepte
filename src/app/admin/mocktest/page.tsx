"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/MockTest/Admin/StatusBadge";

type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface MockTest {
  id: string;
  title: string;
  description: string | null;
  totalTime: number;
  status: Status;
  isActive: boolean;
  createdAt: string;
  sections: { section: string; _count: { questions: number } }[];
  _count: { attempts: number };
}

interface ApiResponse {
  tests: MockTest[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

const STATUS_FILTERS: (Status | "ALL")[] = ["ALL", "DRAFT", "PUBLISHED", "ARCHIVED"];

export default function AdminMockTestListPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [page, setPage] = useState(1);

  async function fetchTests() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      const res = await fetch(`/api/v1/admin/mocktest?${params}`);
      const json = await res.json();
      if (!res.ok) { setError(json.message ?? "Failed to fetch"); return; }
      setData(json.data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTests(); }, [statusFilter, page]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Mock Tests</h1>
            <p className="mt-1 text-muted-foreground">Create and manage PTE mock tests</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={fetchTests} disabled={loading}>
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </Button>
            <Link href="/admin/mocktest/create">
              <Button className="gap-2">
                <Plus size={16} /> New Test
              </Button>
            </Link>
          </div>
        </div>

        {/* Status filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${statusFilter === s
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading tests...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && data?.tests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <p className="text-sm">No mock tests found.</p>
            <Link href="/admin/mocktest/create">
              <Button variant="secondary" className="gap-2"><Plus size={14} /> Create your first test</Button>
            </Link>
          </div>
        )}

        {/* Table */}
        {!loading && data && data.tests.length > 0 && (
          <>
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Sections</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Attempts</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.tests.map((test) => {
                    const totalQuestions = test.sections.reduce((s, sec) => s + sec._count.questions, 0);
                    return (
                      <tr key={test.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{test.title}</p>
                          {test.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{test.description}</p>
                          )}
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">{test.totalTime} min</td>
                        <td className="px-4 py-4 text-muted-foreground">
                          {test.sections.length} sections · {totalQuestions} questions
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">{test._count.attempts}</td>
                        <td className="px-4 py-4"><StatusBadge status={test.status} /></td>
                        <td className="px-4 py-4">
                          <Link href={`/admin/mocktest/${test.id}`}>
                            <Button variant="secondary" size="sm" className="gap-1.5">
                              <Pencil size={13} /> Manage
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, data.pagination.total)} of {data.pagination.total}
                </span>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                    Previous
                  </Button>
                  <Button variant="secondary" size="sm" disabled={page >= data.pagination.totalPages} onClick={() => setPage((p) => p + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
