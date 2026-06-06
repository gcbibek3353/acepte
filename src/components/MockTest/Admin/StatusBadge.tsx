"use client";
import { cn } from "@/lib/utils";

type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";

const styles: Record<Status, string> = {
  DRAFT:     "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  PUBLISHED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  ARCHIVED:  "bg-secondary text-secondary-foreground",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", styles[status])}>
      {status}
    </span>
  );
}
