import { ListeningMCMAnswer, ListeningMCMBookmark, ListeningMCMQuestion, MultipleChoiceMultipleAnswer, MultipleChoiceMultipleQuestion, SummarizeSpokenTextAnswer, SummarizeSpokenTextBookmark, SummarizeSpokenTextQuestion } from "@/generated/prisma";
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




const getMCMQuestions = async (userId: string, queryParams: QuestionQuery): Promise<ListeningMCMQuestion[] | null> => { return null }

const getMCMQuestionById = async (questionId: string): Promise<ListeningMCMQuestion | null> => { return null }

const addOrRemoveMCMBookmark = async (userId: string, questionId: string): Promise<ListeningMCMBookmark | null> => { return null }

const postMCMAnswer = async (userId: string, questionId: string, answer: string[]): Promise<ListeningMCMAnswer | null> => { return null }



// other functions will come down here 

const listeningController = {
    getSummarizeSpokenTextQuestions,
    getSummarizeSpokenTextQuestionById,
    addOrRemoveSummarizeSpokenTextBookmark,
    postSummarizeSpokenTextAnswer,

    getMCMQuestions,
    getMCMQuestionById,
    addOrRemoveMCMBookmark,
    postMCMAnswer
}
export default listeningController;