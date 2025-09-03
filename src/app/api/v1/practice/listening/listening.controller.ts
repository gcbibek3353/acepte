import { ListeningFillBlankAnswer, ListeningFillBlankBookmark, ListeningFillBlankPassage, ListeningHighlightIncorrectWordsAnswer, ListeningHighlightIncorrectWordsBookmark, ListeningHighlightIncorrectWordsPassage, ListeningHighlightSummaryAnswer, ListeningHighlightSummaryBookmark, ListeningHighlightSummaryPassage, ListeningMCMAnswer, ListeningMCMBookmark, ListeningMCMPassage, ListeningMCSAnswer, ListeningMCSBookmark, ListeningMCSPassage, SummarizeSpokenTextAnswer, SummarizeSpokenTextBookmark, SummarizeSpokenTextQuestion } from "@/generated/prisma";
import { evaluateSummarizeSpokenTextAnswer } from "@/lib/ai/google";
import prisma from "@/lib/prisma";

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
                whereClause.SummarizeSpokenTextAnswers = { some: { userId } };
            } else {
                whereClause.SummarizeSpokenTextAnswers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.SummarizeSpokenTextBookmarks = { some: { userId } };
            } else {
                whereClause.SummarizeSpokenTextBookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.summarizeSpokenTextQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });

        return questions;
    } catch (error) {
        console.error("Error fetching Summarize Spoken Text questions:", error);
        return null;
    }
}

const getSummarizeSpokenTextQuestionById = async (questionId: string): Promise<SummarizeSpokenTextQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.summarizeSpokenTextQuestion.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
            }
        });
        if (!question) return null;
        return question;
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
                whereClause.ListeningMCMAnswers = { some: { userId } };
            } else {
                whereClause.ListeningMCMAnswers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.ListeningMCMBookmarks = { some: { userId } };
            } else {
                whereClause.ListeningMCMBookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.listeningMCMPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });

        return questions;
    } catch (error) {
        console.error("Error fetching MCM questions:", error);
        return null;
    }
}

const getMCMQuestionById = async (questionId: string): Promise<ListeningMCMPassage | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.listeningMCMPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                options: true
            }
        });
        if (!question) return null;
        return question;
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
                whereClause.ListeningFillBlankAnswers = { some: { userId } };
            } else {
                whereClause.ListeningFillBlankAnswers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.ListeningFillBlankBookmarks = { some: { userId } };
            } else {
                whereClause.ListeningFillBlankBookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.listeningFillBlankPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });

        return questions;
    } catch (error) {
        console.error("Error fetching FIB questions:", error);
        return null;
    }
};

const getFIBQuestionById = async (questionId: string): Promise<ListeningFillBlankPassage | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.listeningFillBlankPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
            }
        });
        if (!question) return null;
        return question;
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

        // Create the answer record
        const fibAnswer = await prisma.listeningFillBlankAnswer.create({
            data: {
                userId,
                passageId: questionId,
                answers: answersObject,
                totalScore: score,
            }
        });

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
                whereClause.ListeningHighlightIncorrectWordsAnswers = { some: { userId } };
            } else {
                whereClause.ListeningHighlightIncorrectWordsAnswers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.ListeningHighlightIncorrectWordsBookmarks = { some: { userId } };
            } else {
                whereClause.ListeningHighlightIncorrectWordsBookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.listeningHighlightSummaryPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });

        return questions;
    } catch (error) {
        console.error("Error fetching HCS questions:", error);
        return null;
    }
}

const getHCSQuestionById = async (questionId: string): Promise<ListeningHighlightSummaryPassage | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.listeningHighlightSummaryPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
            }
        });
        if (!question) return null;
        return question;
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
                whereClause.ListeningMCMAnswers = { some: { userId } };
            } else {
                whereClause.ListeningMCMAnswers = { none: { userId } };
            }
        }

        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.ListeningMCMBookmarks = { some: { userId } };
            } else {
                whereClause.ListeningMCMBookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.listeningMCSPassage.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });

        return questions;
    } catch (error) {
        console.error("Error fetching MCS questions:", error);
        return null;
    }
}

const getMCSQuestionById = async (questionId: string): Promise<ListeningMCSPassage | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.listeningMCSPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
            }
        });
        if (!question) return null;
        return question;
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
        return MCSAnswer;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}


// select missing word realted functions
// Highlight incorrect words related functions
// write from dictation related functions


// other functions will come down here 

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
}
export default listeningController;