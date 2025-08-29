import prisma from "@/lib/prisma";

// TODO : define all the request and response interfaces before actually writing the functions

const getWriteEssayQuestions = async () => {
    // TODO : need to implement pagination here
 }

const getWriteEssayQuestionById = async (id: string) => {
    try {
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

const postWriteEssayAnswer = async () => { }

const getSummarizeWrittenTextQuestions = async () => { }

const getSummarizeWrittenTextQuestionById = async (id : string) => { 
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
    getSummarizeWrittenTextQuestionById
}

export default exportFunctions;