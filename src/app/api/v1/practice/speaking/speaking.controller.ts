
import { ListeningFillBlankAnswer, ListeningFillBlankBookmark, ListeningFillBlankPassage, ListeningHighlightIncorrectWordsAnswer, ListeningHighlightIncorrectWordsBookmark, ListeningHighlightIncorrectWordsPassage, ListeningHighlightSummaryAnswer, ListeningHighlightSummaryBookmark, ListeningHighlightSummaryPassage, ListeningMCMAnswer, ListeningMCMBookmark, ListeningMCMPassage, ListeningMCSAnswer, ListeningMCSBookmark, ListeningMCSPassage, ListeningSelectMissingWordAnswer, ListeningSelectMissingWordBookmark, ListeningSelectMissingWordPassage, ListeningWriteFromDictationAnswer, ListeningWriteFromDictationBookmark, ListeningWriteFromDictationPassage, SpeakingAnswerShortAnswer, SpeakingAnswerShortBookmark, SpeakingAnswerShortQuestion, SpeakingDescribeImageAnswer, SpeakingDescribeImageBookmark, SpeakingDescribeImageQuestion, SpeakingGroupDiscussionAnswer, SpeakingGroupDiscussionBookmark, SpeakingGroupDiscussionQuestion, SpeakingReadAloudAnswer, SpeakingReadAloudBookmark, SpeakingReadAloudQuestion, SpeakingRepeatSentenceAnswer, SpeakingRepeatSentenceBookmark, SpeakingRepeatSentenceQuestion, SpeakingRespondSituationAnswer, SpeakingRespondSituationBookmark, SpeakingRespondSituationQuestion, SpeakingRetellLectureAnswer, SpeakingRetellLectureBookmark, SpeakingRetellLectureQuestion, SummarizeSpokenTextAnswer, SummarizeSpokenTextBookmark, SummarizeSpokenTextQuestion } from "@/generated/prisma";
import { evaluateSummarizeSpokenTextAnswer } from "@/lib/ai/google";
import prisma from "@/lib/prisma";

interface QuestionQuery {
    page?: number;       // default 1
    limit?: number;      // default 10
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    answered?: boolean;
    bookmarked?: boolean;
}

// ReadAloud related functions 

const getReadAloudQuestions = async (userId: string, query: QuestionQuery): Promise<SpeakingReadAloudQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = query;
        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.speakingReadAloudQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId } }, // include bookmarks of the user only
                answers: { where: { userId } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching Read Aloud questions:", error);
        return null;
    }
}
const getReadAloudQuestionById = async (questionId: string): Promise<SpeakingReadAloudQuestion | null> => { return null }
const addOrRemoveReadAloudBookmark = async (userId: string, questionId: string): Promise<SpeakingReadAloudBookmark | null> => { return null }
const postReadAloudAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingReadAloudAnswer | null> => { return null }

// RepeatSentence related functions

const getRepeatSentenceQuestions = async (userId: string, query: QuestionQuery): Promise<SpeakingRepeatSentenceQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = query;
        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.speakingRepeatSentenceQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId } }, // include bookmarks of the user only
                answers: { where: { userId } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching Repeat Sentence questions:", error);
        return null;
    }
}
const getRepeatSentenceQuestionById = async (questionId: string): Promise<SpeakingRepeatSentenceQuestion | null> => { return null }
const addOrRemoveRepeatSentenceBookmark = async (userId: string, questionId: string): Promise<SpeakingRepeatSentenceBookmark | null> => { return null }
const postRepeatSentenceAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingRepeatSentenceAnswer | null> => { return null }

// DescribeImage related functions

const getDescribeImageQuestions = async (userId: string, query: QuestionQuery): Promise<SpeakingDescribeImageQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = query;
        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.speakingDescribeImageQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId } }, // include bookmarks of the user only
                answers: { where: { userId } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching describe image questions:", error);
        return null;
    }
}
const getDescribeImageQuestionById = async (questionId: string): Promise<SpeakingDescribeImageQuestion | null> => { return null }
const addOrRemoveDescribeImageBookmark = async (userId: string, questionId: string): Promise<SpeakingDescribeImageBookmark | null> => { return null }
const postDescribeImageAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingDescribeImageAnswer | null> => { return null }

// RetellLecture related functions

const getRetellLectureQuestions = async (userId: string, query: QuestionQuery): Promise<SpeakingRetellLectureQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = query;
        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.speakingRetellLectureQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId } }, // include bookmarks of the user only
                answers: { where: { userId } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching Retell Lecture questions:", error);
        return null;
    }
}
const getRetellLectureQuestionById = async (questionId: string): Promise<SpeakingRetellLectureQuestion | null> => { return null }
const addOrRemoveRetellLectureBookmark = async (userId: string, questionId: string): Promise<SpeakingRetellLectureBookmark | null> => { return null }
const postRetellLectureAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingRetellLectureAnswer | null> => { return null }

// AnswerShort related functions

const getAnswerShortQuestions = async (userId: string, query: QuestionQuery): Promise<SpeakingAnswerShortQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = query;
        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.speakingAnswerShortQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId } }, // include bookmarks of the user only
                answers: { where: { userId } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching answer short questions:", error);
        return null;
    }
}
const getAnswerShortQuestionById = async (questionId: string): Promise<SpeakingAnswerShortQuestion | null> => { return null }
const addOrRemoveAnswerShortBookmark = async (userId: string, questionId: string): Promise<SpeakingAnswerShortBookmark | null> => { return null }
const postAnswerShortAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingAnswerShortAnswer | null> => { return null }

// SummarizeGroupDiscussion related functions

const getSummarizeGroupDiscussionQuestions = async (userId: string, query: QuestionQuery): Promise<SpeakingGroupDiscussionQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = query;
        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.speakingGroupDiscussionQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId } }, // include bookmarks of the user only
                answers: { where: { userId } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching group discussion questions:", error);
        return null;
    }
}
const getSummarizeGroupDiscussionQuestionById = async (questionId: string): Promise<SpeakingGroupDiscussionQuestion | null> => { return null }
const addOrRemoveSummarizeGroupDiscussionBookmark = async (userId: string, questionId: string): Promise<SpeakingGroupDiscussionBookmark | null> => { return null }
const postSummarizeGroupDiscussionAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingGroupDiscussionAnswer | null> => { return null }

// RespondToASituation related functions

const getRespondToASituationQuestions = async (userId: string, query: QuestionQuery): Promise<SpeakingRespondSituationQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = query;
        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.speakingRespondSituationQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId } }, // include bookmarks of the user only
                answers: { where: { userId } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching respond to situation questions:", error);
        return null;
    }
}
const getRespondToASituationQuestionById = async (questionId: string): Promise<SpeakingRespondSituationQuestion | null> => { return null }
const addOrRemoveRespondToASituationBookmark = async (userId: string, questionId: string): Promise<SpeakingRespondSituationBookmark | null> => { return null }
const postRespondToASituationAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingRespondSituationAnswer | null> => { return null }

const speakingController = {
    getReadAloudQuestions,
    getReadAloudQuestionById,
    addOrRemoveReadAloudBookmark,
    postReadAloudAnswer,

    getRepeatSentenceQuestions,
    getRepeatSentenceQuestionById,
    addOrRemoveRepeatSentenceBookmark,
    postRepeatSentenceAnswer,

    getDescribeImageQuestions,
    getDescribeImageQuestionById,
    addOrRemoveDescribeImageBookmark,
    postDescribeImageAnswer,

    getRetellLectureQuestions,
    getRetellLectureQuestionById,
    addOrRemoveRetellLectureBookmark,
    postRetellLectureAnswer,

    getAnswerShortQuestions,
    getAnswerShortQuestionById,
    addOrRemoveAnswerShortBookmark,
    postAnswerShortAnswer,

    getSummarizeGroupDiscussionQuestions,
    getSummarizeGroupDiscussionQuestionById,
    addOrRemoveSummarizeGroupDiscussionBookmark,
    postSummarizeGroupDiscussionAnswer,

    getRespondToASituationQuestions,
    getRespondToASituationQuestionById,
    addOrRemoveRespondToASituationBookmark,
    postRespondToASituationAnswer
}

export default speakingController;