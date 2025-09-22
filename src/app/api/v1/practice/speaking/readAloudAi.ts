import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

// Initialize with API key from environment variables
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!
});

export async function evaluateUsingAI(audioUrl: string, passage: string) {
  try {
    
    // Check if file exists
    if (!fs.existsSync(audioUrl)) {
      return new Response(JSON.stringify({ error: "Audio file not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const base64AudioFile = fs.readFileSync(audioUrl, {
      encoding: "base64",
    });

    const contents = [
      { 
        text: `Please analyze this audio file and provide scoring on a 0-5 scale for:
        
1. Content score (0-5): Based on the actual ${passage} and user response ${audioUrl}
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
          mimeType: "audio/mp3",
          data: base64AudioFile,
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    console.log(response.text);

    // Parse the response
    let parsedResult;
    try {
      parsedResult = JSON.parse(response.text ?? "{}");
    } catch {
      parsedResult = {
        raw_response: response.text,
        note: "Response could not be parsed as JSON"
      };
    }

    return parsedResult;

  } catch (error) {
    console.error('Error processing audio:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process audio file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}