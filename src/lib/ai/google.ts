import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { SummarizeSpokenTextAnswerScoreSchema, SummarizeWrittenTextAnswerScoreSchema, writeEssayAnswerScoreSchema } from './schema';


const google = createGoogleGenerativeAI({
    apiKey: 'AIzaSyBymN-tsLWxZBfCSqCfXed-0gqePFNT-ek',
});

const model = google('gemini-2.5-flash');


// TODO : we need similar AI calling functions with good prompt engineering for other tasks as well.

// Writing specific AI calls 
export const evaluateWriteEssay = async (essay: string, essay_description: string) => {
    const evaluationPrompt = `You are an expert essay evaluator. Evaluate the following essay across multiple dimensions and provide only a JSON object as output with floating-point scores between 0.0 and 2.0 for each dimension. Do not include explanations, commentary, or text outside the JSON. 

Scoring dimensions (each scored from 0.0 to 2.0):
- totalScore: Overall quality of the essay (sum of all sub-scores, max 16.0).
- contentScore: Depth, relevance, and originality of ideas (0.0-2.0).
- formScore: Organization, coherence, structure, and logical flow (0.0-2.0).
- grammarScore: Correct use of grammar and syntax (0.0-2.0).
- spellingScore: Correctness of spelling and typographical accuracy (0.0-2.0).
- vocabScore: Range, precision, and appropriateness of vocabulary (0.0-2.0).
- DSCScore: Development, Support, and Coherence (0.0-2.0).
- GLRScore: Grammatical Language Range (0.0-2.0).

Essay Title : 
<<<
${essay_description}
>>>

Essay to evaluate:
<<<
${essay}
>>>`;

    const { object: evaluation } = await generateObject({
        model,
        schema: writeEssayAnswerScoreSchema,
        prompt: evaluationPrompt,
    });
    return evaluation;
}

export const evalueteSummarizationWrittenText = async (summarizedText: string, originalText: string) => {
    const evaluationPrompt = `You are an expert text summarization evaluator. Evaluate the following summarized text against the original text across multiple dimensions and provide only a JSON object as output with floating-point scores. Do not include explanations, commentary, or text outside the JSON.

Scoring dimensions:
- totalScore: Overall quality of the summary (sum of all sub-scores).
- contentScore: Accuracy and completeness of information from the original text.
- coherenceScore: Logical flow and clarity of the summary.
- concisenessScore: Brevity and avoidance of unnecessary details.
- readabilityScore: Ease of reading and understanding.
- relevanceScore: Focus on key points and main ideas from the original text.

Original text:
<<<
${originalText}
>>>

Summarized text to evaluate:
<<<
${summarizedText}
>>>`;

    const { object: evaluation } = await generateObject({
        model,
        schema: SummarizeWrittenTextAnswerScoreSchema,
        prompt: evaluationPrompt,
    });
    return evaluation;
}

// Listening specific AI calls

export const evaluateSummarizeSpokenTextAnswer = async (summarizedText: string, originalText: string) => {
    const evaluationPrompt = `You are an expert text summarization evaluator. Evaluate the following summarized text against the original text across multiple dimensions and provide only a JSON object as output with floating-point scores between 0.0 and 2.0 for each dimension. Do not include explanations, commentary, or text outside the JSON.

Scoring dimensions (each scored from 0.0 to 2.0):
- contentScore: Accuracy and completeness of information from the original text (0.0-2.0).
- formScore: Organization, coherence, structure, and logical flow (0.0-2.0).
- grammarScore: Correct use of grammar and syntax (0.0-2.0).
- vocabularyScore: Range, precision, and appropriateness of vocabulary (0.0-2.0).
- spellingScore: Correctness of spelling and typographical accuracy (0.0-2.0).
- totalScore: Overall quality of the summary (sum of all sub-scores, max 10.0).

Original text:
<<<
${originalText}
>>>

Summarized text to evaluate:
<<<
${summarizedText}
>>>`;

    const { object: evaluation } = await generateObject({
        model,
        schema: SummarizeSpokenTextAnswerScoreSchema,
        prompt: evaluationPrompt,
    });
    return evaluation;
}



/// Testing only 
const result = await generateText({
    model,
    messages: [
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: 'who is speaking in this audio? Is the person speaking male or female?',
                },
                {
                    type: 'file',
                    data: 'https://ace-pte-demo.s3.ap-south-1.amazonaws.com/uploads/audio/listening-questions/6cad3523-0b57-4e73-87ba-a931a26bf348.webm?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIATZ4GBQUJNVMRX2TF%2F20251230%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20251230T045715Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiEA1M7XI%2Bq4aktUu7%2Fz%2FsKxds4SHsxMb7rEkK9U2rDhYjMCIGBbdXLHDht15ULxpYm52eh6Z%2Ften4TL8IxvxWt7PXABKvgCCK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjYxNzM3MjUyMTE0IgyHLYLpVYefDA%2Bb2qcqzAJB7MIA5EII8U32YBhdREQ60szl8EG6dIR%2B7Mub0jaSwlZXE%2FcnstzDPe6zKZ%2BuTxaLPIXGwdcwgswntZ76y1ASouphjGrA831ouELPjqxwXl9pXSE%2BMwoxl%2BaOIxASkAQh9X1N8%2Ff%2F1PWUAoH0ffYihqbuwX9Qt11SQXYSKHAWeiSRULNNW5Zi7DmwU0O%2BcCYvfhZ0aNIN161PjJudEzANn3iWOZj6Ii6ZXId3deG3gX7plxWpzVJ7QYvMQtXoyrtv%2FqvG6e9drSY1eyY6ajA%2F%2FhVqaFAZ2Y%2F33TXTSTCfJFdz2QakURUL3RwkGpjsrAJEDprPBh7liwJBG%2FDwWHzDSkyTlbT36CiR1XRY3BAmBK0xNq%2FQ60Gpk1xYWCCI0KyzjIUp9%2Fu3ChDYd5kAE4m%2B3Nby5JyEUQs5bjsOOPmZWpeZfERSrDHWG%2BYQMTCLt83KBjqtApt1J2QDrR%2F3eMe0BL0T68PZdv0iiENlpL7OzL%2FSBmW%2BI6EMpXSus1sbqx2s9DyVdHdZUU6OggiJxRn16VJzMsh%2FFGK4Dzxd%2FQnnAUBcSdxfIkGxiRdiOAU8GL3MMCs59Y9JerHt4p%2BzlNAe0oJI4SMxBkpnv%2FRiLAxBem9Qpy2ecamT967JAS9hmCUuHdswTXvfSTUff9uJjH1CoINYHJR%2Bz1xDGZ8503%2BgKZFUjowQEySjS%2B9DZKttuuzn1y46pPtImw%2FnD5D7UYn5mPrGy9CQrhtfi%2BIX1ko6lwWo%2BTYyiOxHPiUD%2FJmIlr9smV5ptFSwWQcsBPzjemRaGZRJq2%2F03VjGz0MIguMsqFoNX%2FKQT0xUPSQfcp8ISvcwHtIpdt48iFkBO5w6xtkFbpA%3D&X-Amz-Signature=c05ebb0810ffb2ec88d56eabeefed3ea9fdf5ddac928ff78e05f16ef5873053a&X-Amz-SignedHeaders=host&response-content-disposition=inline',
                    mediaType: 'audio/webm',
                },
            ],
        },
    ],
});

console.log(result.content);
