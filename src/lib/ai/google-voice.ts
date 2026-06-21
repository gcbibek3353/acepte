import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { SpeakingAnswerScoreSchema } from "./schema";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const model = google("gemini-2.5-flash");

const pronunciationEvaluation = {
  5: "All vowels and consonants are produced in a manner that is easily understood by regular speakers of the language. The speaker uses assimilation and deletions appropriate to continuous speech. Stress is placed correctly in all words and sentence-level stress is fully appropriate",
  4: "Vowels and consonants are pronounced clearly and unambiguously. A few minor consonant, vowel or stress distortions do not affect intelligibility. All words are easily understandable. A few consonants or consonant sequences may be distorted. Stress is placed correctly on all common words, and sentence level stress is reasonable.",
  3: "Most vowels and consonants are pronounced correctly. Some consistent errors might make a few words unclear. A few consonants in certain contexts may be regularly distorted, omitted or mispronounced. Stress- dependent vowel reduction may occur on a few words.",
  2: "Some consonants and vowels are consistently mispronounced. At least 2/3 of speech is intelligible, but listeners might need to adjust to the accent. Some consonants are regularly omitted, and consonant sequences may be simplified. Stress may be placed incorrectly on some words or be unclear.",
  1: "Many consonants and vowels are mispronounced, resulting in a strong intrusive foreign accent. Listeners may have difficulty understanding about 1/3 of the words. Many consonants may be distorted or omitted. Consonant sequences may be non-English. Stress is placed in a non-English manner; unstressed words may be reduced or omitted, and a few syllables added or missed.",
  0: "Pronunciation seems completely characteristic of another language. Many consonants and vowels are mispronounced, mis-ordered or omitted. Listeners may find more than 1/2 of the speech unintelligible. Stressed and unstressed syllables are realized in a non-English manner. Several words may have the wrong number of syllables.",
};

const fluencyEvaluation = {
  5: "Speech shows smooth rhythm and phrasing. There are no hesitations, repetitions, false starts or phonological simplifications.",
  4: "Speech has an acceptable rhythm with appropriate phrasing and word emphasis. There is no more than one hesitation, one repetition or a false start. There are no significant phonological simplifications.",
  3: "Speech is at an acceptable speed but may be uneven. There may be more than one hesitation, but most words are spoken in continuous phrases. There are few repetitions or false starts. There are no long pauses and speech does not sound staccato.",
  2: "Speech may be uneven or staccato. Speech (if >= 6 words) has at least one smooth three-word run, and no more than two or three hesitations, repetitions or false starts. There may be one long pause, but not two or more.",
  1: "Speech has irregular phrasing or sentence rhythm. Poor phrasing, staccato or syllabic timing, and/or multiple hesitations, repetitions, and/or false starts make spoken performance notably uneven or discontinuous. Long utterances may have one or two long pauses and inappropriate sentence-level word emphasis",
  0: "Speech is slow and labored with little discernable phrase grouping, multiple hesitations, pauses, false starts, and/or major phonological simplifications. Most words are isolated, and there may be more than one long pause.",
};

export const evaluateReadALoud = async (audioUrl: string, passage: string) => {
  const evaluationPrompt = `You are an expert evaluator of spoken audio. Analyze the following audio file and provide scoring on a scale from 0 to 5 for the following dimensions:

1. Content Score (0-5): How completely and accurately does the speaker read the provided passage.

Scoring rules:
- 5: Reads the entire passage with no omissions or additions.
- 4: Minor omissions or skipped small phrases, but ≥90% of content is covered.
- 3: Noticeable missing parts or skipped sentences, ~70–89% coverage.
- 2: Major omissions, ~40–69% coverage.
- 1: Reads only fragments of the passage, <40% coverage.
- 0: Does not match the passage or reads unrelated content.

IMPORTANT:
- If the speaker reads only one line or a small portion of the passage, the score MUST be 2 or lower.
- If coverage cannot be confidently verified, assume partial reading and reduce score.

2. Oral Fluency (0-5): Evaluate fluency using the following rubric:
    5 : 'Speech shows smooth rhythm and phrasing. There are no hesitations, repetitions, false starts or phonological simplifications.',
    4 : 'Speech has an acceptable rhythm with appropriate phrasing and word emphasis. There is no more than one hesitation, one repetition or a false start. There are no significant phonological simplifications.',
    3 : 'Speech is at an acceptable speed but may be uneven. There may be more than one hesitation, but most words are spoken in continuous phrases. There are few repetitions or false starts. There are no long pauses and speech does not sound staccato.',
    2 : 'Speech may be uneven or staccato. Speech (if >= 6 words) has at least one smooth three-word run, and no more than two or three hesitations, repetitions or false starts. There may be one long pause, but not two or more.',
    1 : 'Speech has irregular phrasing or sentence rhythm. Poor phrasing, staccato or syllabic timing, and/or multiple hesitations, repetitions, and/or false starts make spoken performance notably uneven or discontinuous. Long utterances may have one or two long pauses and inappropriate sentence-level word emphasis',
    0: 'Speech is slow and labored with little discernable phrase grouping, multiple hesitations, pauses, false starts, and/or major phonological simplifications. Most words are isolated, and there may be more than one long pause.'

3. Pronunciation (0-5): Evaluate pronunciation using the following rubric:
  5: "All vowels and consonants are produced in a manner that is easily understood by regular speakers of the language. The speaker uses assimilation and deletions appropriate to continuous speech. Stress is placed correctly in all words and sentence-level stress is fully appropriate",
  4: "Vowels and consonants are pronounced clearly and unambiguously. A few minor consonant, vowel or stress distortions do not affect intelligibility. All words are easily understandable. A few consonants or consonant sequences may be distorted. Stress is placed correctly on all common words, and sentence level stress is reasonable.",
  3: "Most vowels and consonants are pronounced correctly. Some consistent errors might make a few words unclear. A few consonants in certain contexts may be regularly distorted, omitted or mispronounced. Stress- dependent vowel reduction may occur on a few words.",
  2: "Some consonants and vowels are consistently mispronounced. At least 2/3 of speech is intelligible, but listeners might need to adjust to the accent. Some consonants are regularly omitted, and consonant sequences may be simplified. Stress may be placed incorrectly on some words or be unclear.",
  1: "Many consonants and vowels are mispronounced, resulting in a strong intrusive foreign accent. Listeners may have difficulty understanding about 1/3 of the words. Many consonants may be distorted or omitted. Consonant sequences may be non-English. Stress is placed in a non-English manner; unstressed words may be reduced or omitted, and a few syllables added or missed.",
  0: "Pronunciation seems completely characteristic of another language. Many consonants and vowels are mispronounced, mis-ordered or omitted. Listeners may find more than 1/2 of the speech unintelligible. Stressed and unstressed syllables are realized in a non-English manner. Several words may have the wrong number of syllables.",

4. Total Score (0-5): Overall performance based mainly on fluency and pronunciation.

Return ONLY a valid JSON object in this format:
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
      { role: "system", content: evaluationPrompt },
      { role: "user", content: `Audio file URL: ${audioUrl}` },
    ],
  });
  return evaluation;
};

export const evaluateaudioWithText = async (
  audioUrl: string,
  passage: string,
) => {
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
      { role: "system", content: evaluationPrompt },
      { role: "user", content: `Audio file URL: ${audioUrl}` },
    ],
  });
  return evaluation;
};

export const evaluateAudioWithAudio = async (
  userAudioFilePath: string,
  referenceAudioFilePath: string,
) => {
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
      { role: "system", content: evaluationPrompt },
      {
        role: "user",
        content: `User Audio file URL: ${userAudioFilePath}\nReference Audio file URL: ${referenceAudioFilePath}`,
      },
    ],
  });
  return evaluation;
};

export const evaluateAudioWithImage = async (
  audioFilePath: string,
  referenceImagePath: string,
) => {
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
      { role: "system", content: evaluationPrompt },
      {
        role: "user",
        content: `Audio file URL: ${audioFilePath}\nReference Image file URL: ${referenceImagePath}`,
      },
    ],
  });
  return evaluation;
};
