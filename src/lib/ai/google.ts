import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { SummarizeSpokenTextAnswerScoreSchema, SummarizeWrittenTextAnswerScoreSchema, writeEssayAnswerScoreSchema } from './schema';

const google = createGoogleGenerativeAI({});

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