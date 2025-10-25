import { FillBlanksDragDropAnswer, FillBlanksDragDropBookmark, FillBlanksDragDropPassage, FillBlanksDropdownAnswer, FillBlanksDropdownBookmark, FillBlanksDropdownPassage, MultipleChoiceMultipleAnswer, MultipleChoiceMultipleBookmark, MultipleChoiceMultiplePassage, MultipleChoiceSingleAnswer, MultipleChoiceSingleBookmark, MultipleChoiceSinglePassage, ReorderParagraphAnswer, ReorderParagraphBookmark, ReorderParagraphPassage } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface QuestionQuery {
    page?: number;       // default 1
    limit?: number;      // default 10
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    answered?: boolean;
    bookmarked?: boolean;
}

// Fill In the blanks Dropdown related functions

const getFibDropdownQuestions = async (userId: string, queryParams: QuestionQuery): Promise<FillBlanksDropdownPassage[] | null> => {
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

        const questions = await prisma.fillBlanksDropdownPassage.findMany({
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
        console.error("Error fetching fill in blanks dropdown questions:", error);
        return null;
    }
}

const getFibDropdownQuestionById = async (questionId: string): Promise<FillBlanksDropdownPassage | null> => {
    // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
    try {
        const question = await prisma.fillBlanksDropdownPassage.findUnique({
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

const addOrRemoveFibDropdownBookmark = async (userId: string, questionId: string): Promise<FillBlanksDropdownBookmark | null> => {
    try {
        const existingBookmark = await prisma.fillBlanksDropdownBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId: questionId
                }
            }
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.fillBlanksDropdownBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.fillBlanksDropdownBookmark.create({
                data: {
                    userId,
                    passageId: questionId
                }
            });
            return newBookmark;
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
}

const postFibDropdownPassageAnswer = async (userId: string, questionId: string, answer: {
    "1": number,
    "2": number,
    "3": number,
    "4": number,
    // TODO : But this object may contain 'n' number of keys based on number of blanks in the question
}
): Promise<FillBlanksDropdownAnswer | null> => {

    return null
}

// Multiple Choice Multiple Answers related functions

const getMcmqQuestions = async (userId: string, queryParams: QuestionQuery): Promise<MultipleChoiceMultiplePassage[] | null> => {
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

        const questions = await prisma.multipleChoiceMultiplePassage.findMany({
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
        console.error("Error fetching MCM questions:", error);
        return null;
    }
}

const getMcmqQuestionById = async (questionId: string): Promise<MultipleChoiceMultiplePassage | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.multipleChoiceMultiplePassage.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                options: true,
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

const addOrRemoveMcmqBookmark = async (userId: string, passageId: string): Promise<MultipleChoiceMultipleBookmark | null> => {
    try {
        const existingBookmark = await prisma.multipleChoiceMultipleBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });
        if (existingBookmark) {
            // Remove bookmark
            await prisma.multipleChoiceMultipleBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.multipleChoiceMultipleBookmark.create({
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

const postMcmqPassageAnswer = async (userId: string, questionId: string, answer: string[]): Promise<MultipleChoiceMultipleAnswer | null> => {
    try {
        const question = await prisma.multipleChoiceMultiplePassage.findUnique({
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
        const mcmAnswer = await prisma.multipleChoiceMultipleAnswer.create({
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

// ReOrder Paragraph related functions 

const getReorderParagraphQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ReorderParagraphPassage[] | null> => {
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

        const questions = await prisma.reorderParagraphPassage.findMany({
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
        console.error("Error fetching MCM questions:", error);
        return null;
    }
}

const getReorderParagraphQuestionById = async (questionId: string): Promise<ReorderParagraphPassage | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.reorderParagraphPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                paragraphs: true,
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

const addOrRemoveReorderParagraphBookmark = async (userId: string, passageId: string): Promise<ReorderParagraphBookmark | null> => {
    try {
        const existingBookmark = await prisma.reorderParagraphBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });
        if (existingBookmark) {
            // Remove bookmark
            await prisma.reorderParagraphBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.reorderParagraphBookmark.create({
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

const postReorderParagraphAnswer = async (userId: string, questionId: string, answer: string[]): Promise<ReorderParagraphAnswer | null> => {
    try {
        const question = await prisma.reorderParagraphPassage.findUnique({
            where: { id: questionId },
            include: { paragraphs: true }
        });
        if (!question) {
            throw new Error("Question not found");
        }

        // Calculate score based on the order of paragraphs
        let score = 0;
        const correctParagraphIds = question.paragraphs.map(p => ({
            id: p.id,
            correctOrder: p.correctOrder
        })
        )
        correctParagraphIds.forEach((para) => {
            for (let i = 0; i < answer.length; i++) {
                if (para.id === answer[i]) {
                    if (para.correctOrder === i + 1) score += 1;
                    else score -= 1;
                }
            }
        })
        score = Math.max(score, 0);
        const savedAnswer = await prisma.reorderParagraphAnswer.create({
            data: {
                userId,
                passageId: questionId,
                userOrder: answer,
                totalScore: score
            }
        });

        return savedAnswer;
    } catch (error) {
        console.log("Errror submitting answer", error);
        return null;
    }
}

// Fill in the blanks drag and drop related functions

const getFibDragDropQuestions = async (userId: string, queryParams: QuestionQuery): Promise<FillBlanksDragDropPassage[] | null> => {
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

        const questions = await prisma.fillBlanksDragDropPassage.findMany({
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
        console.error("Error fetching MCM questions:", error);
        return null;
    }
}

const getFibDragDropQuestionById = async (questionId: string): Promise<FillBlanksDragDropPassage | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.fillBlanksDragDropPassage.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                options: true,
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

const addOrRemoveFibDragDropBookmark = async (userId: string, passageId: string): Promise<FillBlanksDragDropBookmark | null> => {
    try {
        const existingBookmark = await prisma.fillBlanksDragDropBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });
        if (existingBookmark) {
            // Remove bookmark
            await prisma.fillBlanksDragDropBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.fillBlanksDragDropBookmark.create({
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

const postFibDragDropPassageAnswer = async (userId: string, questionId: string, answer: string[]): Promise<FillBlanksDragDropAnswer | null> => { return null }

// Multiple Choice Single Answer related functions

const getMcsqQuestions = async (userId: string, queryParams: QuestionQuery): Promise<MultipleChoiceSinglePassage[] | null> => {
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

        const questions = await prisma.multipleChoiceSinglePassage.findMany({
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
        console.error("Error fetching MCM questions:", error);
        return null;
    }
}

const getMcsqQuestionById = async (questionId: string): Promise<MultipleChoiceSinglePassage | null> => {
    try {
        // TODO : Either include answers of user requesting the question only or return all answers with pagination. get user from middleware from parent function
        const question = await prisma.multipleChoiceSinglePassage.findUnique({
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

const addOrRemoveMcsqBookmark = async (userId: string, passageId: string): Promise<MultipleChoiceSingleBookmark | null> => {
    try {
        const existingBookmark = await prisma.multipleChoiceSingleBookmark.findUnique({
            where: {
                userId_passageId: {
                    userId,
                    passageId
                }
            }
        });
        if (existingBookmark) {
            // Remove bookmark
            await prisma.multipleChoiceSingleBookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
            return null; // Indicate that the bookmark was removed
        } else {
            // Add bookmark
            const newBookmark = await prisma.multipleChoiceSingleBookmark.create({
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

const postMcsqPassageAnswer = async (userId: string, questionId: string, answerIndex: number): Promise<MultipleChoiceSingleAnswer | null> => {
    try {
        const question = await prisma.multipleChoiceSinglePassage.findUnique({
            where: { id: questionId },
        });
        if (!question) {
            throw new Error("Question not found");
        }
        let score = 0;
        if (question.correctOptionIndex === answerIndex) score = 1;

        const MCSAnswer = await prisma.multipleChoiceSingleAnswer.create({
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

const readingController = {
    getFibDropdownQuestions,
    getFibDropdownQuestionById,
    addOrRemoveFibDropdownBookmark,
    postFibDropdownPassageAnswer,

    getMcmqQuestions,
    getMcmqQuestionById,
    addOrRemoveMcmqBookmark,
    postMcmqPassageAnswer,

    getReorderParagraphQuestions,
    getReorderParagraphQuestionById,
    addOrRemoveReorderParagraphBookmark,
    postReorderParagraphAnswer,

    getFibDragDropQuestions,
    getFibDragDropQuestionById,
    addOrRemoveFibDragDropBookmark,
    postFibDragDropPassageAnswer,

    getMcsqQuestions,
    getMcsqQuestionById,
    addOrRemoveMcsqBookmark,
    postMcsqPassageAnswer
}

export default readingController;