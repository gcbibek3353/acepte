import { evaluateEssay } from "@/lib/ai/google";
import prisma from "@/lib/prisma";

// TODO : define all the request and response interfaces before actually writing the functions

const getWriteEssayQuestions = async () => {
    // TODO : need to implement pagination here
}

const getWriteEssayQuestionById = async (id: string) => {
    try {
        // TODO : Also include the answers associated with this question for the current user. current user should be attached by middleware or something.
        const question = prisma.writeEssayQuestion.findUnique({
            where: {
                id: id
            }
        });
        if (!question) {
            return null;
        }
        return question;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const addOrRemoveWriteEssayBookMark = async () => { }

const postWriteEssayAnswer = async (questionId: string, essay: string) => {
    try {
        // Check if question exists
        const question = await prisma.writeEssayQuestion.findUnique({
            where: { id: questionId }
        });

        if (!question) {
            throw new Error("Question not found");
        }

        // Evaluate essay using AI
        const evaluation = await evaluateEssay(essay);
        
        // Extract score from evaluation (assuming AI returns score in format like "Score: 8/10")
        const scoreMatch = evaluation.match(/(\d+(?:\.\d+)?)\s*\/?\s*10/);
        const score = scoreMatch ? parseFloat(scoreMatch[1]) : null;

        // Calculate word count
        const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;

        // Create answer record
        const answer = await prisma.writeEssayAnswer.create({
            data: {
                userId: "6I7UHDZKl7XMaNAbV0g6pOKTdTzGeOj3", // Random ID for now
                questionId: questionId,
                answer: essay,
                wordCount: wordCount,
                timeSpent: Math.floor(Math.random() * 1200) + 300, // Random 5-20 minutes
                score: score
            }
        });

        return {
            id: answer.id,
            evaluation: evaluation,
            score: score,
            wordCount: wordCount,
            timeSpent: answer.timeSpent
        };

    } catch (error) {
        console.error("Error in postWriteEssayAnswer:", error);
        throw error;
    }
}

const getSummarizeWrittenTextQuestions = async () => { }

const getSummarizeWrittenTextQuestionById = async (id: string) => {
    // TODO : Also include the answers associated with this question for the current user. current user should be attached by middleware or something.
    try {
        const question = prisma.summarizeWrittenTextQuestion.findUnique({
            where: {
                id: id
            }
        });
        if (!question) {
            return null;
        }
        return question;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const addOrRemoveSummarizeWrittenTextBookMark = async () => { }

const postSummarizeWrittenTextAnswer = async () => { }

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