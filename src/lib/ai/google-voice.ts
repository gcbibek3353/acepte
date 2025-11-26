import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "node:path";

// Initialize with API key from environment variables
const ai = new GoogleGenAI({
    apiKey: "AIzaSyA-HRKzTl9nCFtzQ31icfx92HgBDzjqgFg"
});

export async function evaluateUsingAI(audioUrl: string, passage: string) {
    try {

        // Check if file exists
        if (!fs.existsSync(audioUrl)) {
            return {
                error: "Audio file not found",
                status: 404
            };
        }

        console.log('File found, processing...');

        const base64AudioFile = fs.readFileSync(audioUrl, {
            encoding: "base64",
        });

        console.log('File read successfully, size:', base64AudioFile.length);

        const contents = [
            {
                text: `Please analyze this audio file and provide scoring on a 0-5 scale for:

1. Content score (0-5): How accurately the speaker read the following passage: "${passage}"
2. Oral Fluency (0-5): Speaking pace, rhythm, natural flow, hesitations, and overall smoothness
3. Pronunciation (0-5): Clarity, accuracy of phonemes, word stress, and articulation
4. totalScore (0-5): Overall score based on the above 3 categories

Format your response as JSON with the following structure:
{
    "contentScore": number,
    "oralFluency": number,
    "pronunciation": number,
    "totalScore": number
}`
            },
            {
                inlineData: {
                    mimeType: "audio/mp3", // ✅ Fixed MIME type
                    data: base64AudioFile,
                },
            },
        ];

        console.log('Sending request to AI...');

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp", // ✅ Updated to latest model
            contents: contents,
        });

        console.log('AI Response received:', response.text);

        // Parse the response
        let parsedResult;
        try {
            parsedResult = JSON.parse(response.text ?? "{}");
            console.log('Parsed result:', parsedResult);
        } catch (parseError) {
            console.log('Failed to parse as JSON, raw response:', response.text);
            parsedResult = {
                raw_response: response.text,
                note: "Response could not be parsed as JSON"
            };
        }

        return {
            success: true,
            data: parsedResult
        };

    } catch (error) {
        console.error('Error processing audio:', error);
        return {
            success: false,
            error: 'Failed to process audio file',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

// async function GenerateImagesResponse() {
//     console.log('Starting audio evaluation test...');

//     // Check if file exists first
//     // const filePath = path.join(__dirname, 'read-aloud.mp3');
//     //   const filePath = './read-aloud.mp3';
//     const filePath = '/home/bivek-gharti/Desktop/production_projects/acepte/src/lib/ai/read-aloud.mp3';
//     console.log('File exists:', fs.existsSync(filePath));

//     if (fs.existsSync(filePath)) {
//         const stats = fs.statSync(filePath);
//         console.log('File size:', stats.size, 'bytes');
//     }

//     const res = await evaluateUsingAI(
//         filePath,
//         'Variations kept the genre alive. From the mid 19th century onwards, when mass literacy grew, adventure became a popular subgenre of fiction. Although not exploited to its fullest, adventure has seen many changes over the years — from being constrained to stories of knights in armor to stories of high-tech espionage.'
//     );

//     console.log('Final result:', JSON.stringify(res, null, 2));
// }

// GenerateImagesResponse();

export const evaluateAudioWithText = async (audioFilePath: string, referenceText: string) => { 

}
export const evaluateAudioWithAudio = async (userAudioFilePath: string, referenceAudioFilePath: string) => { }
export const evaluateAudioWithImage = async (audioFilePath: string, referenceImagePath: string) => { };