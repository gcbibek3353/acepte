import { WriteEssayQuestion } from "@/generated/prisma";
import { evaluateWriteEssay, evalueteSummarizationWrittenText } from "@/lib/ai/google";
import prisma from "@/lib/prisma";

// const getWriteEssayQuestions = async () : Promise<WriteEssayQuestion[] | null> => {
//     // TODO : need to implement pagination here and also use backend logic here for filtering 
//     await new Promise((resolve) => setTimeout(resolve, 1000));
// }

const getWriteEssayQuestionById = async (id: string): Promise<WriteEssayQuestion | null> => {
    try {
        const question: WriteEssayQuestion | null = await prisma.writeEssayQuestion.findUnique({
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

// const addOrRemoveWriteEssayBookMark = async (questionId : string) : Promise<WriteEssayBookMark | null> => { 
//     // get userId attached by middleware or something
// }

const postWriteEssayAnswer = async (questionId: string, essay: string, userId: string) => {
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

const postSummarizeWrittenTextAnswer = async (questionId: string, summarizedText: string, userId: string) => {
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
    // getWriteEssayQuestions,
    getWriteEssayQuestionById,
    // addOrRemoveWriteEssayBookMark,
    postWriteEssayAnswer,
    getSummarizeWrittenTextQuestions,
    getSummarizeWrittenTextQuestionById,
    addOrRemoveSummarizeWrittenTextBookMark,
    postSummarizeWrittenTextAnswer,
}

export default exportFunctions;