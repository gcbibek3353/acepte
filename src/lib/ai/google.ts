import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { SummarizeWrittenTextAnswerScoreSchema, writeEssayAnswerScoreSchema } from './schema';

const google = createGoogleGenerativeAI({
    // custom settings if needed
});

const model = google('gemini-2.5-flash');

export const evaluateWriteEssay = async (essay: string , essay_description : string) => {
    const evaluationPrompt = `You are an expert essay evaluator. Evaluate the following essay across multiple dimensions and provide only a JSON object as output with floating-point scores. Do not include explanations, commentary, or text outside the JSON. 

Scoring dimensions:
- totalScore: Overall quality of the essay (sum of all sub-scores).
- contentScore: Depth, relevance, and originality of ideas.
- formScore: Organization, coherence, structure, and logical flow.
- grammarScore: Correct use of grammar and syntax.
- spellingScore: Correctness of spelling and typographical accuracy.
- vocabScore: Range, precision, and appropriateness of vocabulary.
- DSCScore: Development, Support, and Coherence (how well arguments are developed and supported).
- GLRScore: Grammatical Language Range (variety and complexity of grammatical structures used correctly).

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
// we need similar AI calling functions with good prompt engineering for other tasks as well.