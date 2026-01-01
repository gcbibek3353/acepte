
import { ListeningFillBlankAnswer, ListeningFillBlankBookmark, ListeningFillBlankPassage, ListeningHighlightIncorrectWordsAnswer, ListeningHighlightIncorrectWordsBookmark, ListeningHighlightIncorrectWordsPassage, ListeningHighlightSummaryAnswer, ListeningHighlightSummaryBookmark, ListeningHighlightSummaryPassage, ListeningMCMAnswer, ListeningMCMBookmark, ListeningMCMPassage, ListeningMCSAnswer, ListeningMCSBookmark, ListeningMCSPassage, ListeningSelectMissingWordAnswer, ListeningSelectMissingWordBookmark, ListeningSelectMissingWordPassage, ListeningWriteFromDictationAnswer, ListeningWriteFromDictationBookmark, ListeningWriteFromDictationPassage, SpeakingAnswerShortAnswer, SpeakingAnswerShortBookmark, SpeakingAnswerShortQuestion, SpeakingDescribeImageAnswer, SpeakingDescribeImageBookmark, SpeakingDescribeImageQuestion, SpeakingGroupDiscussionAnswer, SpeakingGroupDiscussionBookmark, SpeakingGroupDiscussionQuestion, SpeakingReadAloudAnswer, SpeakingReadAloudBookmark, SpeakingReadAloudQuestion, SpeakingRepeatSentenceAnswer, SpeakingRepeatSentenceBookmark, SpeakingRepeatSentenceQuestion, SpeakingRespondSituationAnswer, SpeakingRespondSituationBookmark, SpeakingRespondSituationQuestion, SpeakingRetellLectureAnswer, SpeakingRetellLectureBookmark, SpeakingRetellLectureQuestion, SummarizeSpokenTextAnswer, SummarizeSpokenTextBookmark, SummarizeSpokenTextQuestion } from "@/generated/prisma";
import { evaluateAudioWithAudio, evaluateAudioWithImage, evaluateaudioWithText } from "@/lib/ai/google-voice";
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
const getReadAloudQuestionById = async (questionId: string): Promise<SpeakingReadAloudQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.speakingReadAloudQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                bookmarks: true
            }
        });
        if (!question) return null;
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveReadAloudBookmark = async (userId: string, questionId: string): Promise<SpeakingReadAloudBookmark | null> => {
    try {
        const existingBookmark = await prisma.speakingReadAloudBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.speakingReadAloudBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.speakingReadAloudBookmark.create({
                data: {
                    userId,
                    questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}
const postReadAloudAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingReadAloudAnswer | null> => {
    try {

        const question = await prisma.speakingReadAloudQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const { contentScore, fluencyScore, pronunciationScore } = await evaluateaudioWithText(audioUrl, question.passage);
        const totalScore = (contentScore + fluencyScore + pronunciationScore) / 3;
        const newAnswer = await prisma.speakingReadAloudAnswer.create({
            data: {
                userId,
                questionId,
                audioUrl,
                duration: 0, // TODO: extract duration from audio file
                contentScore: contentScore ? contentScore : null,
                oralFluencyScore: fluencyScore ? fluencyScore : null,
                pronunciationScore: pronunciationScore ? pronunciationScore : null,
                totalScore: totalScore ? totalScore : null
            }
        });
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}

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
const getRepeatSentenceQuestionById = async (questionId: string): Promise<SpeakingRepeatSentenceQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.speakingRepeatSentenceQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                bookmarks: true
            }
        });
        if (!question) return null;
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveRepeatSentenceBookmark = async (userId: string, questionId: string): Promise<SpeakingRepeatSentenceBookmark | null> => {
    try {
        const existingBookmark = await prisma.speakingRepeatSentenceBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.speakingRepeatSentenceBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.speakingRepeatSentenceBookmark.create({
                data: {
                    userId,
                    questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}
const postRepeatSentenceAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingRepeatSentenceAnswer | null> => {
    try {
        const question = await prisma.speakingRepeatSentenceQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const { contentScore, fluencyScore, pronunciationScore } = await evaluateAudioWithAudio(audioUrl, question.audioUrl);
        const totalScore = (contentScore + fluencyScore + pronunciationScore) / 3;
        const newAnswer = await prisma.speakingRepeatSentenceAnswer.create({
            data: {
                userId,
                questionId,
                audioUrl,
                duration: 0, // TODO: extract duration from audio file
                contentScore: contentScore ? contentScore : null,
                oralFluencyScore: fluencyScore ? fluencyScore : null,
                pronunciationScore: pronunciationScore ? pronunciationScore : null,
                totalScore: totalScore ? totalScore : null
            }
        });
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}

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
const getDescribeImageQuestionById = async (questionId: string): Promise<SpeakingDescribeImageQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.speakingDescribeImageQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                bookmarks: true
            }
        });
        if (!question) return null;
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveDescribeImageBookmark = async (userId: string, questionId: string): Promise<SpeakingDescribeImageBookmark | null> => {
    try {
        const existingBookmark = await prisma.speakingDescribeImageBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.speakingDescribeImageBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.speakingDescribeImageBookmark.create({
                data: {
                    userId,
                    questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}
const postDescribeImageAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingDescribeImageAnswer | null> => {
    try {

        const question = await prisma.speakingDescribeImageQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const { contentScore, fluencyScore, pronunciationScore } = await evaluateAudioWithImage(audioUrl, question.imageUrl);
        const totalScore = (contentScore + fluencyScore + pronunciationScore) / 3;
        const newAnswer = await prisma.speakingDescribeImageAnswer.create({
            data: {
                userId,
                questionId,
                audioUrl,
                duration: 0, // TODO: extract duration from audio file
                contentScore: contentScore ? contentScore : null,
                oralFluencyScore: fluencyScore ? fluencyScore : null,
                pronunciationScore: pronunciationScore ? pronunciationScore : null,
                totalScore: totalScore ? totalScore : null
            }
        });
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}

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
const getRetellLectureQuestionById = async (questionId: string): Promise<SpeakingRetellLectureQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.speakingRetellLectureQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                bookmarks: true
            }
        });
        if (!question) return null;
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveRetellLectureBookmark = async (userId: string, questionId: string): Promise<SpeakingRetellLectureBookmark | null> => {
    try {
        const existingBookmark = await prisma.speakingRetellLectureBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.speakingRetellLectureBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.speakingRetellLectureBookmark.create({
                data: {
                    userId,
                    questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}
const postRetellLectureAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingRetellLectureAnswer | null> => {
    try {

        const question = await prisma.speakingRetellLectureQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const { contentScore, fluencyScore, pronunciationScore } = await evaluateAudioWithAudio(audioUrl, question.audioUrl);
        const totalScore = (contentScore + fluencyScore + pronunciationScore) / 3;
        const newAnswer = await prisma.speakingRetellLectureAnswer.create({
            data: {
                userId,
                questionId,
                audioUrl,
                duration: 0, // TODO: extract duration from audio file
                contentScore: contentScore ? contentScore : null,
                oralFluencyScore: fluencyScore ? fluencyScore : null,
                pronunciationScore: pronunciationScore ? pronunciationScore : null,
                totalScore: totalScore ? totalScore : null
            }
        });
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}

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
const getAnswerShortQuestionById = async (questionId: string): Promise<SpeakingAnswerShortQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.speakingAnswerShortQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                bookmarks: true
            }
        });
        if (!question) return null;
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveAnswerShortBookmark = async (userId: string, questionId: string): Promise<SpeakingAnswerShortBookmark | null> => {
    try {
        const existingBookmark = await prisma.speakingAnswerShortBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.speakingAnswerShortBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.speakingAnswerShortBookmark.create({
                data: {
                    userId,
                    questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}
const postAnswerShortAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingAnswerShortAnswer | null> => {
    try {
        const question = await prisma.speakingAnswerShortQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        // TODO: change evaluate function to match short answer criteria . We have fixed answer for such questions
        const { contentScore, fluencyScore, pronunciationScore } = await evaluateAudioWithAudio(audioUrl, question.audioUrl);
        const totalScore = (contentScore + fluencyScore + pronunciationScore) / 3;
        const newAnswer = await prisma.speakingAnswerShortAnswer.create({
            data: {
                userId,
                questionId,
                audioUrl,
                duration: 0, // TODO: extract duration from audio file
                vocabularyScore: totalScore ? totalScore : null,
                // oralFluencyScore: fluencyScore ? fluencyScore : null,
                // pronunciationScore: pronunciationScore ? pronunciationScore : null,
                // totalScore: totalScore ? totalScore : null
            }
        });
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}

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
const getSummarizeGroupDiscussionQuestionById = async (questionId: string): Promise<SpeakingGroupDiscussionQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.speakingGroupDiscussionQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                bookmarks: true
            }
        });
        if (!question) return null;
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveSummarizeGroupDiscussionBookmark = async (userId: string, questionId: string): Promise<SpeakingGroupDiscussionBookmark | null> => {
    try {
        const existingBookmark = await prisma.speakingGroupDiscussionBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.speakingGroupDiscussionBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.speakingGroupDiscussionBookmark.create({
                data: {
                    userId,
                    questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}
const postSummarizeGroupDiscussionAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingGroupDiscussionAnswer | null> => {
    try {
        const question = await prisma.speakingGroupDiscussionQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const { contentScore, fluencyScore, pronunciationScore } = await evaluateAudioWithAudio(audioUrl, question.audioUrl);
        const totalScore = (contentScore + fluencyScore + pronunciationScore) / 3;
        const newAnswer = await prisma.speakingGroupDiscussionAnswer.create({
            data: {
                userId,
                questionId,
                audioUrl,
                duration: 0, // TODO: extract duration from audio file
                contentScore: contentScore ? contentScore : null,
                oralFluencyScore: fluencyScore ? fluencyScore : null,
                pronunciationScore: pronunciationScore ? pronunciationScore : null,
                totalScore: totalScore ? totalScore : null
            }
        });
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}

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
const getRespondToASituationQuestionById = async (questionId: string): Promise<SpeakingRespondSituationQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.speakingRespondSituationQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                bookmarks: true
            }
        });
        if (!question) return null;
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveRespondToASituationBookmark = async (userId: string, questionId: string): Promise<SpeakingRespondSituationBookmark | null> => {
    try {
        const existingBookmark = await prisma.speakingRespondSituationBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.speakingRespondSituationBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.speakingRespondSituationBookmark.create({
                data: {
                    userId,
                    questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}
const postRespondToASituationAnswer = async (userId: string, questionId: string, audioUrl: string): Promise<SpeakingRespondSituationAnswer | null> => {
    try {
        const question = await prisma.speakingRespondSituationQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const { contentScore, fluencyScore, pronunciationScore } = await evaluateAudioWithAudio(audioUrl, question.audioUrl);
        const totalScore = (contentScore + fluencyScore + pronunciationScore) / 3;
        const newAnswer = await prisma.speakingRespondSituationAnswer.create({
            data: {
                userId,
                questionId,
                audioUrl,
                duration: 0, // TODO: extract duration from audio file
                contentScore: contentScore ? contentScore : null,
                oralFluencyScore: fluencyScore ? fluencyScore : null,
                pronunciationScore: pronunciationScore ? pronunciationScore : null,
                totalScore: totalScore ? totalScore : null
            }
        });
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}

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