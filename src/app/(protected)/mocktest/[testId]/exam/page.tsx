"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ExamShell from "@/components/MockTest/Exam/ExamShell";

export default function ExamPage() {
  const { testId } = useParams<{ testId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const attemptId = searchParams.get("attemptId");

  // Redirect back to overview if there's no attemptId in the URL
  useEffect(() => {
    if (!attemptId) router.replace(`/mocktest/${testId}`);
  }, [attemptId, testId, router]);

  if (!attemptId) return null;

  return <ExamShell testId={testId} attemptId={attemptId} />;
}
