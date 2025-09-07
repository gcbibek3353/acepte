import { SummarizeWrittenTextAnswer, SummarizeWrittenTextBookMark, SummarizeWrittenTextQuestion, WriteEssayAnswer, WriteEssayBookMark, WriteEssayQuestion } from "@/generated/prisma";
import { evaluateWriteEssay, evalueteSummarizationWrittenText } from "@/lib/ai/google";
import prisma from "@/lib/prisma";

interface QuestionQuery {
    page?: number;       // default 1
    limit?: number;      // default 10
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    answered?: boolean;
    bookmarked?: boolean;
}

// WriteEssay related functions

const getWriteEssayQuestions = async (userId: string, queryParams: QuestionQuery): Promise<WriteEssayQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;

        const skip = (page - 1) * limit;

        // Build where clause
        const whereClause: any = { isActive: true };

        // Filter by difficulty
        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        // Filter by answered status
        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        // Filter by bookmarked status
        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.writeEssayQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });

        return questions;

    } catch (error) {
        console.error("Error in getWriteEssayQuestions:", error);
        return null;
    }
}

const getWriteEssayQuestionById = async (id: string): Promise<WriteEssayQuestion | null> => {
    try {
        const question: WriteEssayQuestion | null = await prisma.writeEssayQuestion.findUnique({
            where: {
                id: id
            },
            include: {
                answers: true, // we are returning all the answers of this question.
                bookmarks: true
            }
        });
        if (!question) {
            return null;
        }
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addOrRemoveWriteEssayBookMark = async (userId: string, questionId: string): Promise<WriteEssayBookMark | null> => {
    try {
        const existingBookmark = await prisma.writeEssayBookMark.findUnique({
            where: {
                userId_questionId: {
                    userId: userId,
                    questionId: questionId
                }
            }
        });

        if (existingBookmark) {
            // Bookmark exists, remove it
            await prisma.writeEssayBookMark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Bookmark does not exist, add it
            const newBookmark = await prisma.writeEssayBookMark.create({
                data: {
                    userId: userId,
                    questionId: questionId
                }
            });
            return newBookmark; // Return the newly created bookmark
        }
    } catch (error) {
        console.error("Error in addOrRemoveWriteEssayBookMark:", error);
        return null;
    }
}

const postWriteEssayAnswer = async (questionId: string, essay: string, userId: string): Promise<WriteEssayAnswer | null> => {
    try {
        // Check if question exists
        const question = await prisma.writeEssayQuestion.findUnique({
            where: { id: questionId }
        });

        if (!question) {
            throw new Error("Question not found");
        }

        // Evaluate essay using AI
        const evaluation = await evaluateWriteEssay(essay, question.essay_description);

        // Calculate word count
        const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;

        const essayAnswer = await prisma.writeEssayAnswer.create({
            data: {
                userId,
                questionId,
                answer: essay,
                wordCount,
                totalScore: evaluation.totalScore,
                contentScore: evaluation.contentScore,
                formScore: evaluation.formScore,
                grammerScore: evaluation.grammarScore,
                spellingScore: evaluation.spellingScore,
                vocabScore: evaluation.vocabScore,
                DSCScore: evaluation.DSCScore,
                GLRScore: evaluation.GLRScore,
            }
        })

        return essayAnswer;

    } catch (error) {
        console.error("Error in postWriteEssayAnswer:", error);
        return null;
    }
}

// SummarizeWrittenText related functions

const getSummarizeWrittenTextQuestions = async (userId: string, queryParams: QuestionQuery): Promise<SummarizeWrittenTextQuestion[] | null> => {
    try {
        const { page = 1, limit = 10, difficulty, answered, bookmarked } = queryParams;

        const skip = (page - 1) * limit;

        // Build where clause
        const whereClause: any = { isActive: true };

        // Filter by difficulty
        if (difficulty) {
            whereClause.difficulty = difficulty;
        }

        // Filter by answered status
        if (answered !== undefined) {
            if (answered) {
                whereClause.answers = { some: { userId } };
            } else {
                whereClause.answers = { none: { userId } };
            }
        }

        // Filter by bookmarked status
        if (bookmarked !== undefined) {
            if (bookmarked) {
                whereClause.bookmarks = { some: { userId } };
            } else {
                whereClause.bookmarks = { none: { userId } };
            }
        }

        const questions = await prisma.summarizeWrittenTextQuestion.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });

        return questions;

    } catch (error) {
        console.error("Error in getSummarizeWrittenTextQuestions:", error);
        return null;
    }
}

const getSummarizeWrittenTextQuestionById = async (id: string): Promise<SummarizeWrittenTextQuestion | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = prisma.summarizeWrittenTextQuestion.findUnique({
            where: {
                id: id
            },
            include: {
                answers: true // we are returning all the answers of this question.
            }
        });
        if (!question) {
            return null;
        }
        return question;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addOrRemoveSummarizeWrittenTextBookMark = async (userId: string, questionId: string): Promise<SummarizeWrittenTextBookMark | null> => {
    try {
        const existingBookmark = await prisma.summarizeWrittenTextBookMark.findUnique({
            where: {
                userId_questionId: {
                    userId: userId,
                    questionId: questionId
                }
            }
        });

        if (existingBookmark) {
            // Bookmark exists, remove it
            await prisma.summarizeWrittenTextBookMark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Bookmark does not exist, add it
            const newBookmark = await prisma.summarizeWrittenTextBookMark.create({
                data: {
                    userId: userId,
                    questionId: questionId
                }
            });
            return newBookmark; // Return the newly created bookmark
        }
    } catch (error) {
        console.error("Error in addOrRemoveSummarizeWrittenTextBookMark:", error);
        return null;
    }
}

const postSummarizeWrittenTextAnswer = async (questionId: string, summarizedText: string, userId: string): Promise<SummarizeWrittenTextAnswer | null> => {
    try {
        // Check if question exists
        const question = await prisma.summarizeWrittenTextQuestion.findUnique({
            where: { id: questionId }
        });

        if (!question) {
            throw new Error("Question not found");
        }

        // Evaluate summarized text using AI
        const evaluation = await evalueteSummarizationWrittenText(summarizedText, question.passage);
        // Calculate word count
        const wordCount = summarizedText.trim().split(/\s+/).filter(word => word.length > 0).length;

        const summarizeWrittenTextAnswer = await prisma.summarizeWrittenTextAnswer.create({
            data: {
                userId,
                questionId,
                answer: summarizedText,
                wordCount,
                totalScore: evaluation.totalScore,
                contentScore: evaluation.contentScore,
                formScore: evaluation.formScore,
                grammerScore: evaluation.grammerScore,
                vocabScore: evaluation.vocabScore,
            }
        })
        return summarizeWrittenTextAnswer;

    } catch (error) {
        console.error("Error in postSummarizeWrittenTextAnswer:", error);
        return null;
    }
}

const exportFunctions = {
    getWriteEssayQuestions,
    getWriteEssayQuestionById,
    addOrRemoveWriteEssayBookMark,
    postWriteEssayAnswer,
    getSummarizeWrittenTextQuestions,
    getSummarizeWrittenTextQuestionById,
    addOrRemoveSummarizeWrittenTextBookMark,
    postSummarizeWrittenTextAnswer,
}

export default exportFunctions;