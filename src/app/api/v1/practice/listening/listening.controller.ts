import { ListeningFillBlankAnswer, ListeningFillBlankBookmark, ListeningFillBlankPassage, ListeningHighlightIncorrectWordsAnswer, ListeningHighlightIncorrectWordsBookmark, ListeningHighlightIncorrectWordsPassage, ListeningHighlightSummaryAnswer, ListeningHighlightSummaryBookmark, ListeningHighlightSummaryPassage, ListeningMCMAnswer, ListeningMCMBookmark, ListeningMCMPassage, ListeningMCSAnswer, ListeningMCSBookmark, ListeningMCSPassage, ListeningSelectMissingWordAnswer, ListeningSelectMissingWordBookmark, ListeningSelectMissingWordPassage, ListeningWriteFromDictationAnswer, ListeningWriteFromDictationBookmark, ListeningWriteFromDictationPassage, SummarizeSpokenTextAnswer, SummarizeSpokenTextBookmark, SummarizeSpokenTextQuestion } from "@/generated/prisma";
import { evaluateSummarizeSpokenTextAnswer } from "@/lib/ai/google";
import prisma from "@/lib/prisma";
import { ListeningFibDetail, ListeningHcsDetail, ListeningHiwDetail, ListeningMcmDetail, ListeningMcsDetail, ListeningSmwDetail, ListeningWfdDetail, SstDetail } from "@/types/listening";

interface QuestionQuery {
    page?: number;       // default 1
    limit?: number;      // default 10
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    answered?: boolean;
    bookmarked?: boolean;
}

// summarizeSpokenText related functions 

const getSummarizeSpokenTextQuestions = async (userId: string, queryParams: QuestionQuery): Promise<SummarizeSpokenTextQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.summarizeSpokenTextQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching Summarize Spoken Text questions:", error);
        return null;
    }
}

const getSummarizeSpokenTextQuestionById = async (questionId: string): Promise<SstDetail | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.summarizeSpokenTextQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                bookmarks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.summarizeSpokenTextQuestion.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addOrRemoveSummarizeSpokenTextBookmark = async (userId: string, questionId: string): Promise<SummarizeSpokenTextBookmark | null> => {
    try {
        const existingBookmark = await prisma.summarizeSpokenTextBookmark.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.summarizeSpokenTextBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.summarizeSpokenTextBookmark.create({
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

const postSummarizeSpokenTextAnswer = async (userId: string, questionId: string, answer: string): Promise<SummarizeSpokenTextAnswer | null> => {
    try {
        const question = await prisma.summarizeSpokenTextQuestion.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const evaluation = await evaluateSummarizeSpokenTextAnswer(answer, question.audioTranscribedText);

        // Calculate word count
        const wordCount = answer.trim().split(/\s+/).filter(word => word.length > 0).length;

        const newAnswer = await prisma.summarizeSpokenTextAnswer.create({
            data: {
                userId,
                questionId,
                response: answer,
                wordCount,
                contentScore: evaluation.contentScore,
                formScore: evaluation.formScore,
                grammarScore: evaluation.grammarScore,
                vocabularyScore: evaluation.vocabularyScore,
                spellingScore: evaluation.spellingScore,
                totalScore: evaluation.totalScore,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'SUMMARIZE_SPOKEN_TEXT' } }).catch(() => {});
        return newAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}



// multiple choice multiple answer related functions




const getMCMQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningMCMPassage[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.listeningMCMPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching MCM questions:", error);
        return null;
    }
}

const getMCMQuestionById = async (questionId: string): Promise<ListeningMcmDetail | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.listeningMCMPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                options: true,
                bookmarks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.listeningMCMPassage.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addOrRemoveMCMBookmark = async (userId: string, passageId: string): Promise<ListeningMCMBookmark | null> => {
    try {
        const existingBookmark = await prisma.listeningMCMBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });
        if (existingBookmark) {
            // Remove bookmark
            await prisma.listeningMCMBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.listeningMCMBookmark.create({
                data: {
                    userId,
                    passageId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}

const postMCMAnswer = async (userId: string, questionId: string, answer: string[]): Promise<ListeningMCMAnswer | null> => {
    try {
        const question = await prisma.listeningMCMPassage.findUnique({
            where: { id: questionId },
            include: { options: true }
        });
        if (!question) {
            throw new Error("Question not found");
        }

        let score = 0;

        // Check each option against user's answers
        question.options.forEach(option => {
            const isSelected = answer.includes(option.id);

            if (isSelected && option.isCorrect) {
                score += 1; // Correct selection
            } else if (isSelected && !option.isCorrect) {
                score -= 1; // Incorrect selection
            }
            // No score change for unselected options (regardless of correctness)
        });

        // Ensure score doesn't go below zero
        if (score < 0) score = 0;

        // Create the answer record
        const mcmAnswer = await prisma.listeningMCMAnswer.create({
            data: {
                userId,
                passageId: questionId,
                selectedOptions: answer,
                totalScore: score,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'MCM' } }).catch(() => {});
        return mcmAnswer;

    } catch (error) {
        console.log("Errror submitting answer", error);
        return null;
    }
}



// Fill in the blanks related functions




const getFIBQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningFillBlankPassage[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.listeningFillBlankPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching FIB questions:", error);
        return null;
    }
};

const getFIBQuestionById = async (questionId: string): Promise<ListeningFibDetail | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.listeningFillBlankPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                bookmarks: true,
                blanks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.listeningFillBlankPassage.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addOrRemoveFIBBookmark = async (userId: string, passageId: string): Promise<ListeningFillBlankBookmark | null> => {
    try {
        const existingBookmark = await prisma.listeningFillBlankBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.listeningFillBlankBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.listeningFillBlankBookmark.create({
                data: {
                    userId,
                    passageId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
};

const postFIBAnswer = async (userId: string, questionId: string, answer: string[]): Promise<ListeningFillBlankAnswer | null> => {
    try {
        const question = await prisma.listeningFillBlankPassage.findUnique({
            where: { id: questionId },
            include: { blanks: true }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        let score = 0;

        // Create answers object with position as key
        const answersObject: { [key: string]: string } = {};
        answer.forEach((userAnswer, index) => {
            const position = index + 1; // positions start from 1
            answersObject[position.toString()] = userAnswer;
        });

        // Compare user answers with correct answers
        question.blanks.forEach(blank => {
            const userAnswer = answersObject[blank.position.toString()];
            if (userAnswer) {
                const normalizedUserAnswer = userAnswer.trim().toLowerCase();
                const normalizedCorrectAnswer = blank.correctWord.trim().toLowerCase();

                if (normalizedUserAnswer === normalizedCorrectAnswer) {
                    score += 1;
                }
            }
        });

        console.log(userId);

        // Create the answer record
        const fibAnswer = await prisma.listeningFillBlankAnswer.create({
            data: {
                userId,
                passageId: questionId,
                answers: answersObject,
                totalScore: score,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'FIB' } }).catch(() => {});
        return fibAnswer;

    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}




// HighLight correct summary related functions




const getHCSQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningHighlightSummaryPassage[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.listeningHighlightSummaryPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching HCS questions:", error);
        return null;
    }
}

const getHCSQuestionById = async (questionId: string): Promise<ListeningHcsDetail | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.listeningHighlightSummaryPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                bookmarks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.listeningHighlightSummaryPassage.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null
    };
}

const addOrRemoveHCSBookmark = async (userId: string, passageId: string): Promise<ListeningHighlightSummaryBookmark | null> => {
    try {
        const existingBookmark = await prisma.listeningHighlightSummaryBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.listeningHighlightSummaryBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.listeningHighlightSummaryBookmark.create({
                data: {
                    userId,
                    passageId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
};

const postHCSAnswer = async (userId: string, questionId: string, answerIndex: number): Promise<ListeningHighlightSummaryAnswer | null> => {
    try {
        const question = await prisma.listeningHighlightSummaryPassage.findUnique({
            where: { id: questionId },
        });
        if (!question) {
            throw new Error("Question not found");
        }
        let score = 0;
        if (question.correctOptionIndex === answerIndex) score = 1;

        const HCSAnswer = await prisma.listeningHighlightSummaryAnswer.create({
            data: {
                userId,
                passageId: questionId,
                selectedOptionIndex: answerIndex,
                totalScore: score,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'HCS' } }).catch(() => {});
        return HCSAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
};




// multiple choice single answer related functions



const getMCSQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningMCSPassage[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.listeningMCSPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching MCS questions:", error);
        return null;
    }
}

const getMCSQuestionById = async (questionId: string): Promise<ListeningMcsDetail | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.listeningMCSPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                bookmarks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.listeningMCSPassage.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addOrRemoveMCSBookmark = async (userId: string, passageId: string): Promise<ListeningMCSBookmark | null> => {
    try {
        const existingBookmark = await prisma.listeningMCSBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.listeningMCSBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.listeningMCSBookmark.create({
                data: {
                    userId,
                    passageId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}

const postMCSAnswer = async (userId: string, questionId: string, answerIndex: number): Promise<ListeningMCSAnswer | null> => {
    try {
        const question = await prisma.listeningMCSPassage.findUnique({
            where: { id: questionId },
        });
        if (!question) {
            throw new Error("Question not found");
        }
        let score = 0;
        if (question.correctOptionIndex === answerIndex) score = 1;

        const MCSAnswer = await prisma.listeningMCSAnswer.create({
            data: {
                userId,
                passageId: questionId,
                selectedOptionIndex: answerIndex,
                totalScore: score,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'MCS' } }).catch(() => {});
        return MCSAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}




// select missing word realted functions
const getSMWQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningSelectMissingWordPassage[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.listeningSelectMissingWordPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching SMW questions:", error);
        return null;
    }
}

const getSMWQuestionById = async (questionId: string): Promise<ListeningSmwDetail | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.listeningSelectMissingWordPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                bookmarks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.listeningSelectMissingWordPassage.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addOrRemoveSMWBookmark = async (userId: string, passageId: string): Promise<ListeningSelectMissingWordBookmark | null> => {
    try {
        const existingBookmark = await prisma.listeningSelectMissingWordBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.listeningSelectMissingWordBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.listeningSelectMissingWordBookmark.create({
                data: {
                    userId,
                    passageId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}

const postSMWAnswer = async (userId: string, questionId: string, answerIndex: number): Promise<ListeningSelectMissingWordAnswer | null> => {
    try {
        const question = await prisma.listeningSelectMissingWordPassage.findUnique({
            where: { id: questionId },
        });
        if (!question) {
            throw new Error("Question not found");
        }
        let score = 0;
        if (question.correctOptionIndex === answerIndex) score = 1;

        const SMWAnswer = await prisma.listeningSelectMissingWordAnswer.create({
            data: {
                userId,
                passageId: questionId,
                selectedOptionIndex: answerIndex,
                totalScore: score,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'SMW' } }).catch(() => {});
        return SMWAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}



// Highlight incorrect words related functions
const getHIWQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningHighlightIncorrectWordsPassage[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.listeningHighlightIncorrectWordsPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching HIW questions:", error);
        return null;
    }
}

const getHIWQuestionById = async (questionId: string): Promise<ListeningHiwDetail | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.listeningHighlightIncorrectWordsPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                incorrectWords: true,
                bookmarks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.listeningHighlightIncorrectWordsPassage.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addOrRemoveHIWBookmark = async (userId: string, passageId: string): Promise<ListeningHighlightIncorrectWordsBookmark | null> => {
    try {
        const existingBookmark = await prisma.listeningHighlightIncorrectWordsBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.listeningHighlightIncorrectWordsBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.listeningHighlightIncorrectWordsBookmark.create({
                data: {
                    userId,
                    passageId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}

const postHIWAnswer = async (userId: string, questionId: string, answer: {
    word: string;
    position: number;
}[]): Promise<ListeningHighlightIncorrectWordsAnswer | null> => {
    try {
        const question = await prisma.listeningHighlightIncorrectWordsPassage.findUnique({
            where: { id: questionId },
            include: { incorrectWords: true }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        // Get all incorrect words with their positions
        const incorrectWords = question.incorrectWords.map(iw => ({
            word: iw.word,
            position: iw.position
        }));

        let score = 0;

        // Check each user answer
        for (const userAnswer of answer) {
            const isCorrectSelection = incorrectWords.some(
                iw => iw.word === userAnswer.word && iw.position === userAnswer.position
            );

            if (isCorrectSelection) {
                score += 1;
            } else {
                score -= 1;
            }
        }

        // Ensure score doesn't go below 0
        if (score < 0) {
            score = 0;
        }

        // Save the answer
        const savedAnswer = await prisma.listeningHighlightIncorrectWordsAnswer.create({
            data: {
                userId,
                passageId: questionId,
                selectedWords: answer, // Assuming this field stores the user's selections
                totalScore: score,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'HIW' } }).catch(() => {});
        return savedAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}


// write from dictation related functions
const getWFDQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningWriteFromDictationPassage[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;
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

        const questions = await prisma.listeningWriteFromDictationPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                bookmarks: { where: { userId }, select: { id: true } }, // include bookmarks of the user only
                answers: { where: { userId }, select: { id: true } } // include answers of the user only
            }
        });

        return questions;
    } catch (error) {
        console.error("Error fetching WFD questions:", error);
        return null;
    }
}

const getWFDQuestionById = async (questionId: string): Promise<ListeningWfdDetail | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.listeningWriteFromDictationPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                bookmarks: true
            }
        });
        if (!question) return null;

        // Sibling questions of this section for the header navigation dropdown.
        // Ordered by the numeric suffix of questionId, ignoring the prefix.
        const siblings = await prisma.listeningWriteFromDictationPassage.findMany({
            select: { id: true, questionId: true }
        });
        const numericSuffix = (qid: string) => parseInt(qid.replace(/^\D+/, ''), 10) || 0;
        siblings.sort((a, b) => numericSuffix(a.questionId) - numericSuffix(b.questionId));

        return { ...question, siblings };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addOrRemoveWFDBookmark = async (userId: string, passageId: string): Promise<ListeningWriteFromDictationBookmark | null> => {
    try {
        const existingBookmark = await prisma.listeningWriteFromDictationBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });
        if (existingBookmark) {
            // Remove bookmark
            await prisma.listeningWriteFromDictationBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.listeningWriteFromDictationBookmark.create({
                data: {
                    userId,
                    passageId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}

const postWfDAnswer = async (userId: string, questionId: string, answer: string): Promise<ListeningWriteFromDictationAnswer | null> => {
    try {
        const question = await prisma.listeningWriteFromDictationPassage.findUnique({
            where: { id: questionId }
        });
        if (!question) {
            throw new Error("Question not found");
        }
        const transcriptWords = question.transcript.trim().split(/\s+/).filter(word => word.length > 0);
        const answerWords = answer.trim().split(/\s+/).filter(word => word.length > 0);
        let score = 0;
        transcriptWords.forEach((word, index) => {
            if (answerWords[index] && word.toLowerCase() === answerWords[index].toLowerCase()) {
                score += 1;
            }
        });

        const wfdAnswer = await prisma.listeningWriteFromDictationAnswer.create({
            data: {
                userId,
                passageId: questionId,
                response: answer,
                totalScore: score,
            }
        });
        prisma.userActivityLog.create({ data: { userId, section: 'LISTENING', questionType: 'WFD' } }).catch(() => {});
        return wfdAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}


const listeningController = {
    getSummarizeSpokenTextQuestions,
    getSummarizeSpokenTextQuestionById,
    addOrRemoveSummarizeSpokenTextBookmark,
    postSummarizeSpokenTextAnswer,

    getMCMQuestions,
    getMCMQuestionById,
    addOrRemoveMCMBookmark,
    postMCMAnswer,

    getFIBQuestions,
    getFIBQuestionById,
    addOrRemoveFIBBookmark,
    postFIBAnswer,

    getHCSQuestions,
    getHCSQuestionById,
    addOrRemoveHCSBookmark,
    postHCSAnswer,

    getMCSQuestions,
    getMCSQuestionById,
    addOrRemoveMCSBookmark,
    postMCSAnswer,

    getSMWQuestions,
    getSMWQuestionById,
    addOrRemoveSMWBookmark,
    postSMWAnswer,

    getHIWQuestions,
    getHIWQuestionById,
    addOrRemoveHIWBookmark,
    postHIWAnswer,

    getWFDQuestions,
    getWFDQuestionById,
    addOrRemoveWFDBookmark,
    postWfDAnswer,
}
export default listeningController;