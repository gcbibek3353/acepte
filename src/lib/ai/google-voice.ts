import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { SpeakingAnswerScoreSchema } from './schema';


const google = createGoogleGenerativeAI({
    apiKey: 'AIzaSyBymN-tsLWxZBfCSqCfXed-0gqePFNT-ek',
});

const model = google('gemini-2.5-flash');


export const evaluateaudioWithText = async (audioUrl: string, passage: string) => {
    const evaluationPrompt = `You are an expert evaluator of spoken audio. Analyze the following audio file and provide scoring on a scale from 0 to 5 for the following dimensions:

1. Content Score (0-5): How accurately does the speaker read the provided passage: "${passage}"
2. Oral Fluency (0-5): Assess the speaking pace, rhythm, natural flow, hesitations, and overall smoothness.
3. Pronunciation (0-5): Evaluate clarity, accuracy of phonemes, word stress, and articulation.
4. Total Score (0-5): Provide an overall score based on the above three categories.

Format your response strictly as a JSON object:
{
  "contentScore": number,
  "oralFluency": number,
  "pronunciation": number,
  "totalScore": number
}`;

    const { object: evaluation } = await generateObject({
        model,
        schema: SpeakingAnswerScoreSchema,
        prompt: [
            { role: 'system', content: evaluationPrompt },
            { role: 'user', content: `Audio file URL: ${audioUrl}` }
        ],
    });
    return evaluation;
}

export const evaluateAudioWithAudio = async (userAudioFilePath: string, referenceAudioFilePath: string) => {
    const evaluationPrompt = `You are an expert evaluator of spoken audio. Analyze the following user audio file in comparison to the reference audio file and provide scoring on a scale from 0 to 5 for the following dimensions:

1. Content Score (0-5): How accurately does the user audio match the content of the reference audio.
2. Oral Fluency (0-5): Assess the speaking pace, rhythm, natural flow, hesitations, and overall smoothness.
3. Pronunciation (0-5): Evaluate clarity, accuracy of phonemes, word stress, and articulation.
4. Total Score (0-5): Provide an overall score based on the above three categories.

Format your response strictly as a JSON object:
{
  "contentScore": number,
  "oralFluency": number,
  "pronunciation": number,
  "totalScore": number  
}
`;

    const { object: evaluation } = await generateObject({
        model,
        schema: SpeakingAnswerScoreSchema,
        prompt: [
            { role: 'system', content: evaluationPrompt },
            { role: 'user', content: `User Audio file URL: ${userAudioFilePath}\nReference Audio file URL: ${referenceAudioFilePath}` }
        ],
    });
    return evaluation;
}

export const evaluateAudioWithImage = async (audioFilePath: string, referenceImagePath: string) => {
    const evaluationPrompt = `You are an expert evaluator of spoken audio in relation to visual content. Analyze the following audio file in the context of the reference image and provide scoring on a scale from 0 to 5 for the following dimensions:

1. Content Score (0-5): How accurately does the spoken content in the audio file describe or relate to the reference image.
2. Oral Fluency (0-5): Assess the speaking pace, rhythm, natural flow, hesitations, and overall smoothness.
3. Pronunciation (0-5): Evaluate clarity, accuracy of phonemes, word stress, and articulation.
4. Total Score (0-5): Provide an overall score based on the above three categories.

Format your response strictly as a JSON object:
{
  "contentScore": number,
  "oralFluency": number,
    "pronunciation": number,
  "totalScore": number  
}
`;

    const { object: evaluation } = await generateObject({
        model,
        schema: SpeakingAnswerScoreSchema,
        prompt: [
            { role: 'system', content: evaluationPrompt },
            { role: 'user', content: `Audio file URL: ${audioFilePath}\nReference Image file URL: ${referenceImagePath}` }
        ],
    });
    return evaluation;
}

