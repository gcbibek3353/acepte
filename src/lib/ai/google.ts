import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

const google = createGoogleGenerativeAI({
    // custom settings
});

const model = google('gemini-2.5-flash');

const { text } = await generateText({
    model,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});

// Google Generative AI language models can also be used in the streamText, generateObject, and streamObject functions (see AI SDK Core documentation for details).


export const evaluateEssay = async (essay: string) => {
    const evaluationPrompt = `Evaluate the following essay for grammar, coherence, and relevance to the topic. Provide constructive feedback and a score out of 10.
Essay:
${essay}
`;

    const { text: evaluation } = await generateText({
        model,
        prompt: evaluationPrompt,
    });

    return evaluation;
}