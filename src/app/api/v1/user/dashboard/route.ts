import { auth_middleware } from "@/lib/auth-middleware";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function toDateStr(d: Date): string {
    return d.toISOString().split('T')[0];
}

function calcStreak(sortedDescDates: string[]): number {
    if (sortedDescDates.length === 0) return 0;

    const today = toDateStr(new Date());
    const yesterday = toDateStr(new Date(Date.now() - 86_400_000));

    if (sortedDescDates[0] !== today && sortedDescDates[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 1; i < sortedDescDates.length; i++) {
        const prev = new Date(sortedDescDates[i - 1]);
        const curr = new Date(sortedDescDates[i]);
        const diffDays = Math.round((prev.getTime() - curr.getTime()) / 86_400_000);
        if (diffDays === 1) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

export async function GET(req: NextRequest) {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
        return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }
    const userId = authCheck.user.id;

    const ninetyDaysAgo = new Date(Date.now() - 90 * 86_400_000);

    const [
        user,
        activityLogs,
        // Speaking totals
        raTotal, raAnswered,
        rsTotal, rsAnswered,
        diTotal, diAnswered,
        rlTotal, rlAnswered,
        asTotal, asAnswered,
        gdTotal, gdAnswered,
        rtsTotal, rtsAnswered,
        // Writing totals
        weTotal, weAnswered,
        swtTotal, swtAnswered,
        // Reading totals
        fibdTotal, fibdAnswered,
        fibddTotal, fibddAnswered,
        mcmTotal, mcmAnswered,
        mcsTotal, mcsAnswered,
        rpTotal, rpAnswered,
        // Listening totals
        sstTotal, sstAnswered,
        lmcmTotal, lmcmAnswered,
        fibTotal, fibAnswered,
        hcsTotal, hcsAnswered,
        lmcsTotal, lmcsAnswered,
        smwTotal, smwAnswered,
        hiwTotal, hiwAnswered,
        wfdTotal, wfdAnswered,
    ] = await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: { name: true, targetScore: true, examDate: true },
        }),
        prisma.userActivityLog.findMany({
            where: { userId, submittedAt: { gte: ninetyDaysAgo } },
            select: { submittedAt: true },
            orderBy: { submittedAt: "desc" },
        }),
        // Speaking
        prisma.speakingReadAloudQuestion.count(),
        prisma.speakingReadAloudAnswer.count({ where: { userId } }),
        prisma.speakingRepeatSentenceQuestion.count(),
        prisma.speakingRepeatSentenceAnswer.count({ where: { userId } }),
        prisma.speakingDescribeImageQuestion.count(),
        prisma.speakingDescribeImageAnswer.count({ where: { userId } }),
        prisma.speakingRetellLectureQuestion.count(),
        prisma.speakingRetellLectureAnswer.count({ where: { userId } }),
        prisma.speakingAnswerShortQuestion.count(),
        prisma.speakingAnswerShortAnswer.count({ where: { userId } }),
        prisma.speakingGroupDiscussionQuestion.count(),
        prisma.speakingGroupDiscussionAnswer.count({ where: { userId } }),
        prisma.speakingRespondSituationQuestion.count(),
        prisma.speakingRespondSituationAnswer.count({ where: { userId } }),
        // Writing
        prisma.writeEssayQuestion.count(),
        prisma.writeEssayAnswer.count({ where: { userId } }),
        prisma.summarizeWrittenTextQuestion.count(),
        prisma.summarizeWrittenTextAnswer.count({ where: { userId } }),
        // Reading
        prisma.fillBlanksDropdownPassage.count(),
        prisma.fillBlanksDropdownAnswer.count({ where: { userId } }),
        prisma.fillBlanksDragDropPassage.count(),
        prisma.fillBlanksDragDropAnswer.count({ where: { userId } }),
        prisma.multipleChoiceMultiplePassage.count(),
        prisma.multipleChoiceMultipleAnswer.count({ where: { userId } }),
        prisma.multipleChoiceSinglePassage.count(),
        prisma.multipleChoiceSingleAnswer.count({ where: { userId } }),
        prisma.reorderParagraphPassage.count(),
        prisma.reorderParagraphAnswer.count({ where: { userId } }),
        // Listening
        prisma.summarizeSpokenTextQuestion.count(),
        prisma.summarizeSpokenTextAnswer.count({ where: { userId } }),
        prisma.listeningMCMPassage.count(),
        prisma.listeningMCMAnswer.count({ where: { userId } }),
        prisma.listeningFillBlankPassage.count(),
        prisma.listeningFillBlankAnswer.count({ where: { userId } }),
        prisma.listeningHighlightSummaryPassage.count(),
        prisma.listeningHighlightSummaryAnswer.count({ where: { userId } }),
        prisma.listeningMCSPassage.count(),
        prisma.listeningMCSAnswer.count({ where: { userId } }),
        prisma.listeningSelectMissingWordPassage.count(),
        prisma.listeningSelectMissingWordAnswer.count({ where: { userId } }),
        prisma.listeningHighlightIncorrectWordsPassage.count(),
        prisma.listeningHighlightIncorrectWordsAnswer.count({ where: { userId } }),
        prisma.listeningWriteFromDictationPassage.count(),
        prisma.listeningWriteFromDictationAnswer.count({ where: { userId } }),
    ]);

    // Unique active dates (last 90 days)
    const activeDatesSet = new Set(activityLogs.map(l => toDateStr(l.submittedAt)));
    const activeDates = [...activeDatesSet].sort().reverse();
    const streak = calcStreak(activeDates);

    // Weekly activity — last 7 days
    const weeklyActivity = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(Date.now() - (6 - i) * 86_400_000);
        const dateStr = toDateStr(d);
        return { date: dateStr, count: activityLogs.filter(l => toDateStr(l.submittedAt) === dateStr).length };
    });

    // Exam countdown
    let daysUntilExam: number | null = null;
    if (user?.examDate) {
        const todayMs = new Date().setHours(0, 0, 0, 0);
        const examMs = new Date(user.examDate).setHours(0, 0, 0, 0);
        daysUntilExam = Math.ceil((examMs - todayMs) / 86_400_000);
    }

    return NextResponse.json({
        success: true,
        message: "Dashboard data fetched successfully",
        data: {
            streak,
            activeDates,
            weeklyActivity,
            progress: {
                speaking: {
                    total: raTotal + rsTotal + diTotal + rlTotal + asTotal + gdTotal + rtsTotal,
                    solved: raAnswered + rsAnswered + diAnswered + rlAnswered + asAnswered + gdAnswered + rtsAnswered,
                },
                writing: {
                    total: weTotal + swtTotal,
                    solved: weAnswered + swtAnswered,
                },
                reading: {
                    total: fibdTotal + fibddTotal + mcmTotal + mcsTotal + rpTotal,
                    solved: fibdAnswered + fibddAnswered + mcmAnswered + mcsAnswered + rpAnswered,
                },
                listening: {
                    total: sstTotal + lmcmTotal + fibTotal + hcsTotal + lmcsTotal + smwTotal + hiwTotal + wfdTotal,
                    solved: sstAnswered + lmcmAnswered + fibAnswered + hcsAnswered + lmcsAnswered + smwAnswered + hiwAnswered + wfdAnswered,
                },
            },
            profile: {
                name: user?.name ?? null,
                targetScore: user?.targetScore ?? null,
                examDate: user?.examDate ?? null,
                daysUntilExam,
            },
        },
    });
}
